using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.DTOs
{
    public class BugResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Default to empty string if not set
        public string Description { get; set; } = string.Empty; // Default to empty string if not set
        public string Status { get; set; } = "Open"; // Default status is "Open"
        public DateTime CreatedAt { get; set; }  // Default to current time
        public int ProjectId { get; set; } // ID of the project associated with the bug

        //public string ProjectName { get; set; } = string.Empty; // Name of the project associated with the bug

    }
}
