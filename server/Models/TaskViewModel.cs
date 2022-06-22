namespace EdwardTodoAPI.Models
{
    public class TaskViewModel
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public StatusViewModel Status { get; set; }

        public DateTime LastModifiedAt { get; set; }
    }
}
