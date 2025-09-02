using BugTracker.Application.Services;
using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Test.Services
{
    public class BugServiceTests
    {
        private readonly IBugService _bugService;
        private readonly Mock<IBugRepository> _mockRepo;
        public BugServiceTests()
        {
            _mockRepo = new Mock<IBugRepository>();
            _bugService = new BugService(_mockRepo.Object);
        }
        [Fact] //represents one test
        public void GetAllBugs_ShouldReturnAllBugs()
        {
            // Arrange
            var bugs = new List<Bug>
            {
                new Bug { Id = 1, Title = "Bug 1", Description = "Description 1", Status = "Open", ProjectId = 1},
                new Bug { Id = 2, Title = "Bug 2", Description = "Description 2", Status = "Closed", ProjectId = 1 }
            };
            _mockRepo.Setup(repo => repo.GetAll()).Returns(bugs);
            // Act
            var result = _bugService.GetAllBugs();
            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("Bug 1", result[0].Title);
            Assert.Equal("Bug 2", result[1].Title);
        }

    
        [Fact]
        public void CreatBug_ShouldAddBug()
        {
            // Arrange
            var bug = new Bug
            {
                Id = 1,
                Title = "New Bug",
                Description = "New Bug Description",
                Status = "Open",
                ProjectId = 1
            };
            _mockRepo.Setup(repo => repo.Add(It.IsAny<Bug>())).Callback<Bug>(b => b.Id = bug.Id);
            // Act
            _bugService.CreateBug(new BugRequestDTO
            {
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                ProjectId = bug.ProjectId
            });
            _mockRepo.Verify(repo => repo.Add(It.IsAny<Bug>()), Times.Once);
            _mockRepo.Verify(repo => repo.Save(), Times.Once);



        }
        [Fact]
        public void GetBugById_ShouldReturnBug()
        {
            // Arrange
            var bug = new Bug { Id = 1, Title = "Bug 1", Description = "Description 1", Status = "Open", ProjectId = 1 };
            _mockRepo.Setup(repo => repo.GetById(1)).Returns(bug);
            // Act
            var result = _bugService.GetBugById(2);
            // Assert
            Assert.NotNull(result);
        }
        [Fact]
        public void UpdateBug_ShouldUpdateBug()
        {
            // Arrange
            var existingBug = new Bug { Id = 1, Title = "Old Bug", Description = "Old Description", Status = "Open", ProjectId = 1 };
            var updatedBug = new BugRequestDTO
            {
                Title = "Updated Bug",
                Description = "Updated Description",
                Status = "Closed",
                ProjectId = 1
            };
            _mockRepo.Setup(repo => repo.GetById(1)).Returns(existingBug);
            //Act
            _bugService.UpdateBug(1, updatedBug);
            // Assert
            _mockRepo.Verify(repo => repo.Update(It.Is<Bug>(b => b.Id == 1 && b.Title == "Updated Bug" && b.Description == "Updated Description" && b.Status == "Closed" && b.ProjectId == 1)), Times.Once);


        }

    }
}
