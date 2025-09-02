using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Entities
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty; // Default to empty string if not set
        public string ProjectDescription { get; set; } = string.Empty ;
        public ICollection<Bug> Bugs { get; set; } = new List<Bug>(); 
    }
}
