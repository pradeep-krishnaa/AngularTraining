using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Interfaces
{
    public interface IBugRepository : IRepository<Bug>
    {
    }
}
