using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Entities
{
    public class Bug
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Default to empty string if not set
        public string Description { get; set; } = string.Empty; // Default to empty string if not set
        public string Status { get; set; } = "Open";
        public DateTime CreatedAt { get; set; }
        public int ProjectId { get; set; }
        public Project? Project { get; set; }   //nullable navigation property

    }

}
