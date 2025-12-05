using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wasp.Backend.DTOs;
using Wasp.Backend.Services;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/maintenance")]
    public class MaintenanceController : ControllerBase
    {
        private readonly IMaintenanceService _maintenanceService;

        public MaintenanceController(IMaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<MaintenanceLogDto>>> GetMaintenanceLogs(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? status = null,
            [FromQuery] string? priority = null,
            [FromQuery] Guid? itemId = null)
        {
            var result = await _maintenanceService.GetMaintenanceLogsAsync(page, pageSize, status, priority, itemId);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<MaintenanceLogDto>> GetMaintenanceLog(Guid id)
        {
            try
            {
                var maintenanceLog = await _maintenanceService.GetMaintenanceLogByIdAsync(id);
                return Ok(maintenanceLog);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Maintenance log not found" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<MaintenanceLogDto>> CreateMaintenanceLog([FromBody] CreateMaintenanceLogDto maintenanceDto)
        {
            try
            {
                var createdMaintenance = await _maintenanceService.CreateMaintenanceLogAsync(maintenanceDto);
                return CreatedAtAction(nameof(GetMaintenanceLog), new { id = createdMaintenance.Id }, createdMaintenance);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Item not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateMaintenanceLog(Guid id, [FromBody] UpdateMaintenanceLogDto maintenanceDto)
        {
            try
            {
                await _maintenanceService.UpdateMaintenanceLogAsync(id, maintenanceDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Maintenance log not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteMaintenanceLog(Guid id)
        {
            try
            {
                var result = await _maintenanceService.DeleteMaintenanceLogAsync(id);
                if (!result)
                    return NotFound(new { message = "Maintenance log not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
