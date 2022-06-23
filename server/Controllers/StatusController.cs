using EdwardTodoAPI.Context;
using EdwardTodoAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EdwardTodoAPI.Controllers
{
    [EnableCors("AllowAll")]
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly SQLDBContext _context;

        public StatusController(SQLDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IList<StatusViewModel>>> GetStatuses()
        {
            var statuses = await _context.TodoStatuses.ToListAsync();
            var result = new List<StatusViewModel>();
            foreach (var status in statuses)
                result.Add(new StatusViewModel { 
                    Id = status.Id, 
                    Title = status.Title.Trim() 
                });
            
            return Ok(result);
        }
    }
}
