using BugTracker.Core.DTOs;
using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Interfaces
{
    public interface IBugService
    {
        void CreateBug(BugRequestDTO bug);
        void UpdateBug(int id , BugRequestDTO bug);
        void DeleteBug(int id);
        BugResponseDTO? GetBugById(int id);
        List<BugResponseDTO> GetAllBugs();

    }
}
