using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using BugTracker.Core.Interfaces;
using BugTracker.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public  class BugRepository : IBugRepository  //dont use DTOs in Repository, use Entities instead
    {
        private readonly List<Bug> _bugs = new List<Bug>();
        //private readonly BugTrackerContext _context;
        //public BugRepository(BugTrackerContext context)
        //{
        //    _context = context;
        //}
        public List<Bug> GetAll()
        {
            return _bugs;
        }
        public Bug? GetById(int id)
        {
            return _bugs.FirstOrDefault(b => b.Id == id);
        }
        public void Add(Bug entity)
        {
            
            _bugs.Add(entity);
        }
        public void Update(Bug entity)
        {
            var existingBug = GetById(entity.Id);
            if (existingBug != null)
            {
                existingBug.Title = entity.Title;
                existingBug.Description = entity.Description;
                existingBug.Status = entity.Status;
                existingBug.ProjectId = entity.ProjectId;
            }
        }
        public void Delete(int id)
        {
            var bug = GetById(id);
            if (bug != null)
            {
                _bugs.Remove(bug);
            }
        }
        public void Save()
        {
            // In a real application, this would save changes to the database.
            // Here, we are just simulating the save operation.
        }

        //public async Task<List<Bug>> GetAllAsync()
        //{
        //    return await _context.Bugs.ToListAsync();
        //}

    }
}
