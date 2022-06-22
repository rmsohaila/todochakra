using EdwardTodoAPI.Context.Entities;
using Microsoft.EntityFrameworkCore;

namespace EdwardTodoAPI.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoStatus>(s =>
                {
                    s.HasKey(k => k.Id);
                    s.HasData(
                        new TodoStatus { Id = Guid.NewGuid(), Title = "New" },
                        new TodoStatus { Id = Guid.NewGuid(), Title = "In Progress" },
                        new TodoStatus { Id = Guid.NewGuid(), Title = "Completed" }
                    );
                }
            );
        }
    }
}
