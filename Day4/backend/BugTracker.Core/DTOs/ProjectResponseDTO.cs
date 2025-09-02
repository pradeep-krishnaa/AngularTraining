using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.DTOs
{
    public class ProjectResponseDTO
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
    }
}
