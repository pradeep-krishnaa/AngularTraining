using AutoMapper;
using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        public int _nextId = 1; // Placeholder for ID generation

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public Project CreateProject(ProjectRequestDTO project)
        {
            var newProject = new Project
            {
                ProjectId = _nextId++, // Simulating ID generation
                ProjectName = project.ProjectName,
                ProjectDescription = project.ProjectDescription
            };
            _projectRepository.Add(newProject);
            _projectRepository.Save();
            return newProject;
        }

        public List<ProjectResponseDTO> GetAllProjects()
        {
            var projects = _projectRepository.GetAll();
            return projects.Select(p => new ProjectResponseDTO
            {
                ProjectId = p.ProjectId,
                ProjectName = p.ProjectName,
                ProjectDescription = p.ProjectDescription
            }).ToList();
        }

        public ProjectResponseDTO GetProjectById(int id)
        {
            var project = _projectRepository.GetById(id);
            if (project == null) return null;

            return new ProjectResponseDTO
            {
                ProjectId = project.ProjectId,
                ProjectName = project.ProjectName,
                ProjectDescription = project.ProjectDescription
            };
        }

        public void UpdateProject(int id, ProjectRequestDTO project)
        {
            var existingProject = _projectRepository.GetById(id);
            if (existingProject != null)
            {
                existingProject.ProjectName = project.ProjectName;
                existingProject.ProjectDescription = project.ProjectDescription;
                _projectRepository.Update(existingProject);
                _projectRepository.Save();
            }
        }

        public void DeleteProject(int id)
        {
            var project = _projectRepository.GetById(id);
            if (project != null)
            {
                _projectRepository.Delete(id);
                _projectRepository.Save();
            }
        }
    }
}
