namespace BugTracker.MVC.Models
{
    public class BugViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Default to empty string if not set
        public string Description { get; set; } = string.Empty; // Default to empty string if not set
        public string Status { get; set; } = "Open"; // Default status is "Open"
        public DateTime CreatedAt { get; set; }  // Default to current time
        public int ProjectId { get; set; } // ID of the project associated with the bug
    }
}
