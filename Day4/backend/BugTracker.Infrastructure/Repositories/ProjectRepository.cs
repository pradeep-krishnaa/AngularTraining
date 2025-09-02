using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly List<Project> _projects = new List<Project>();
        public int _id = 1;

        public List<Project> GetAll()
        {
            return _projects;
        }

        public Project? GetById(int id)
        {
            return _projects.FirstOrDefault(p => p.ProjectId == id);
        }

        public void Add(Project entity)
        {
            entity.ProjectId = _id++;
            _projects.Add(entity);
        }

        public void Update(Project entity)
        {
            var existingProject = GetById(entity.ProjectId);
            if (existingProject != null)
            {
                existingProject.ProjectName = entity.ProjectName;
                existingProject.ProjectDescription = entity.ProjectDescription;
            }
        }

        public void Delete(int id)
        {
            var project = GetById(id);
            if (project != null)
            {
                _projects.Remove(project);
            }
        }
        public void Save()
        {

        }


    }
}
