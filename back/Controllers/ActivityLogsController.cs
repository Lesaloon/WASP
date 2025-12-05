using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wasp.Backend.Data;
using Wasp.Backend.DTOs;
using Wasp.Backend.Models;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/items/{itemId:guid}/activity")]
    public class ActivityLogsController : ControllerBase
    {
        private readonly WaspDbContext _context;

        public ActivityLogsController(WaspDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityLogDto>>> GetActivityLogs(
            Guid itemId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var item = await _context.Items.FindAsync(itemId);
            if (item == null)
                return NotFound(new { message = "Item not found" });

            var activityLogs = await _context.ActivityLogs
                .Where(a => a.ItemId == itemId)
                .OrderByDescending(a => a.CreatedAtUtc)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var activityLogDtos = activityLogs.Select(a => new ActivityLogDto
            {
                Id = a.Id,
                ItemId = a.ItemId,
                ItemName = item.Name,
                UserId = a.UserId,
                Action = Enum.Parse<ActivityAction>(a.Action ?? "Other"),
                DetailsJson = a.DetailsJson,
                CreatedAtUtc = a.CreatedAtUtc ?? DateTime.UtcNow
            }).ToList();

            return Ok(activityLogDtos);
        }
    }
}
