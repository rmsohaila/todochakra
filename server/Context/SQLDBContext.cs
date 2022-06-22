
using EdwardTodoAPI.Context.Entities;
using EdwardTodoAPI.Extensions;
using Microsoft.EntityFrameworkCore;

namespace EdwardTodoAPI.Context
{
    public class SQLDBContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public SQLDBContext(DbContextOptions options, IConfiguration configuration)
            : base(options)
        {
            this._configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this._configuration.GetConnectionString("SQLSERVER_CON"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();
        }

        public DbSet<TodoStatus> TodoStatuses { get; set; }

        public DbSet<TodoTask> TodoTasks { get; set; }

    }
}
