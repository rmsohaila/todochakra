using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EdwardTodoAPI.Context.Entities
{
    [Table("Statuses")]
    public class TodoStatus
    {
        [Key]
        [Column("StatusId")]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public virtual ICollection<TodoTask> Tasks { get; set; }
    }

}
