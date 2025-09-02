using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using BugTracker.Core.Exceptions;
using BugTracker.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Services
{
    public class BugService : IBugService
    {
        private readonly IBugRepository _bugRepository;
        public int _nextId = 1; // This is just a placeholder for ID generation, not used in this implementation.
        public BugService(IBugRepository bugRepository)
        {
            _bugRepository = bugRepository;
        }

        public void CreateBug(BugRequestDTO bug)
        {
            var newBug = new Bug
            {
                Id = _nextId++, // Simulating ID generation
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                ProjectId = bug.ProjectId
            };
            _bugRepository.Add(newBug);
            _bugRepository.Save();
        }
        public List<BugResponseDTO> GetAllBugs()
        {
            var bugs = _bugRepository.GetAll();
            return bugs.Select(b => new BugResponseDTO
            {
                Id = b.Id,
                Title = b.Title,
                Description = b.Description,
                Status = b.Status,
                ProjectId = b.ProjectId
            }).ToList();
        }

        public BugResponseDTO GetBugById(int id)
        {
            var bug = _bugRepository.GetById(id);

            if (bug == null)
                throw new NotFoundException($"Bug with id {id} not found"); // ✅ exception handled by middleware

            // ✅ AutoMapper could simplify this, but manual mapping is fine
            return new BugResponseDTO
            {
                Id = bug.Id,
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                ProjectId = bug.ProjectId
            };
        }

        public void UpdateBug(int id , BugRequestDTO bug)
        {
            var existingBug = _bugRepository.GetById(id);
            if (existingBug != null)
            {
                existingBug.Title = bug.Title;
                existingBug.Description = bug.Description;
                existingBug.Status = bug.Status;
                existingBug.ProjectId = bug.ProjectId;
                _bugRepository.Update(existingBug);
                _bugRepository.Save();
            }
            else
            {
                throw new NotFoundException($"Bug with id {id} not found");
            }

        }
        

        public void DeleteBug(int id)
        {
            var bug = _bugRepository.GetById(id);
            if (bug != null)
            {
                _bugRepository.Delete(id);
                _bugRepository.Save();
            }
            else
            {
                throw new NotFoundException($"Bug with id {id} not found");
            }
        }
    }

}
