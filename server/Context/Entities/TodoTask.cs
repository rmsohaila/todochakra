using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EdwardTodoAPI.Context.Entities
{
    [Table("Tasks")]
    public class TodoTask
    {
        [Key]
        [Column("TaskId")]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        
        public Guid StatusId { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public TodoStatus Status { get; set; }
    }
}
