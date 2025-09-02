using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Exceptions
{
    internal class ValidationException : Exception   //correct username , wrong password
    {
        

        public IDictionary<string, string> Errors { get; set; }
        public ValidationException(IDictionary<string , string> errors) : base("Validatoin Failed") 
        { 
            Errors = errors;
        }
    }


}
