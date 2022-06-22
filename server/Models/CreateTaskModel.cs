namespace EdwardTodoAPI.Models
{
    public class CreateTaskModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid StatusId { get; set; }
    }
}
