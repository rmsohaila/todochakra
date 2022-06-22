namespace EdwardTodoAPI.Models
{
    public class UpdateTaskModel
    {
        public Guid TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid StatusId { get; set; }
    }
}
