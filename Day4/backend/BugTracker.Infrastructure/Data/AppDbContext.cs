using BugTracker.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
