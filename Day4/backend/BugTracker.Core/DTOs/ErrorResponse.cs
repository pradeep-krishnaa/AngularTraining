using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.DTOs
{
    public class ErrorResponse
    {
        //CorrelationId , msg , 
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
        public string CorrelationId { get; set; }



    }
}
