using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EdwardTodoAPI.Context;
using EdwardTodoAPI.Context.Entities;
using EdwardTodoAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace EdwardTodoAPI.Controllers
{
    [EnableCors("AllowAll")]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly SQLDBContext _context;

        public TasksController(SQLDBContext context)
        {
            _context = context;
        }

        // GET: api/TodoTasks
        [HttpGet]
        public async Task<ActionResult<IList<TaskViewModel>>> GetTodoTasks()
        {
            if (_context.TodoTasks == null)
            {
                return NotFound();
            }
            var tasks = await _context.TodoTasks.Include(t => t.Status).ToListAsync();
            var result = new List<TaskViewModel>();
            foreach (var task in tasks)
            {
                result.Add(new TaskViewModel
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    Status = new StatusViewModel { Id = task.StatusId, Title = task.Status.Title },
                    Completed = task.Status.Title.Contains("Complete"),
                    LastModifiedAt = task.UpdatedDate > task.CreatedDate ? task.UpdatedDate : task.CreatedDate,
                });
            }
            return Ok(result);
        }

        // GET: api/TodoTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskViewModel>> GetTodoTask(Guid id)
        {
            var task = await _context.TodoTasks
                .Include(t => t.Status)
                .Where(t => t.Id == id).FirstOrDefaultAsync();

            if (task == null) return NotFound();

            return new TaskViewModel
            {
                Id = task.Id,
                Title = task.Title.Trim(),
                Description = task.Description.Trim(),
                Status = new StatusViewModel { Id = task.Status.Id, Title = task.Status.Title },
                LastModifiedAt = task.UpdatedDate > task.CreatedDate ? task.UpdatedDate : task.CreatedDate
            };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoTask(Guid id, UpdateTaskModel task)
        {
            if (id != task.TaskId) return BadRequest();

            var _task = await _context.TodoTasks.FindAsync(id);

            if (_task == null) return NotFound();

            try
            {
                _task.Title = task.Title;
                _task.Description = task.Description;
                _task.UpdatedDate = DateTime.Now;
                _task.StatusId = task.StatusId;

                _context.Entry(_task).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpPut("{TaskId}/{StatusId}")]
        public async Task<IActionResult> PutTodoTaskStatus(Guid TaskId, Guid StatusId)
        {
            var status = await _context.TodoStatuses.FirstOrDefaultAsync(x => x.Id == StatusId);
            if (status == null) return Problem("Invalid Status Id");

            var task = await _context.TodoTasks.FirstOrDefaultAsync(t => t.Id == TaskId);
            if (task == null) return Problem("Invalid Task Id");

            try
            {
                _context.Entry(task).State = EntityState.Modified;
                task.StatusId = StatusId;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        // POST: api/TodoTasks
        [HttpPost]
        public async Task<ActionResult<TodoTask>> PostTodoTask(CreateTaskModel task)
        {
            if (_context.TodoTasks == null) return Problem("Entity set 'SQLDBContext.TodoTasks'  is null.");

            var status = await _context.TodoStatuses.Where(s => s.Id == task.StatusId).FirstOrDefaultAsync();

            if (status == null) return Problem("Invalid status posted");

            var newTask = _context.TodoTasks.Add(new TodoTask
            {
                Title = task.Title.Trim(),
                Description = task.Description.Trim(),
                StatusId = status.Id,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            });

            await _context.SaveChangesAsync();
            var returnTask = new TaskViewModel
            {
                Id = newTask.Entity.Id,
                Title = newTask.Entity.Title,
                Description = newTask.Entity.Description,
                LastModifiedAt = DateTime.Now,
                Status = new StatusViewModel { Id = status.Id, Title = status.Title }
            };

            return CreatedAtAction("GetTodoTask", new { id = newTask.Entity.Id }, returnTask);
        }

        // DELETE: api/TodoTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoTask(Guid id)
        {
            if (_context.TodoTasks == null)
            {
                return NotFound();
            }
            var todoTask = await _context.TodoTasks.FindAsync(id);
            if (todoTask == null)
            {
                return NotFound();
            }

            _context.TodoTasks.Remove(todoTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoTaskExists(Guid id)
        {
            return (_context.TodoTasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
