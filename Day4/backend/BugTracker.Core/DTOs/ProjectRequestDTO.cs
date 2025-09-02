using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.DTOs
{
    public class ProjectRequestDTO
    {
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectDescription { get; set; } = string.Empty;
    }
}
