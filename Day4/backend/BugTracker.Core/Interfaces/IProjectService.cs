using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Interfaces
{
    public interface IProjectService
    {
        Project CreateProject(ProjectRequestDTO project);
        void UpdateProject(int id, ProjectRequestDTO project);
        void DeleteProject(int id);
        ProjectResponseDTO? GetProjectById(int id);
        List<ProjectResponseDTO> GetAllProjects();
    }
}
