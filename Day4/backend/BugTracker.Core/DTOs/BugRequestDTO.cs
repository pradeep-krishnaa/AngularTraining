using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.DTOs
{
    public class BugRequestDTO
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string Status { get; set; } = "Open"; // Default status is "Open"
        public int ProjectId { get; set; } // Required to associate the bug with a project
        //public Project Project { get; set; }
    }
}
