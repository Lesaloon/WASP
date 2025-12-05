using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Wasp.Backend.Data;
using Wasp.Backend.DTOs;
using Wasp.Backend.Enums;
using Wasp.Backend.Models;

namespace Wasp.Backend.Services
{
    public class MaintenanceService : IMaintenanceService
    {
        private readonly WaspDbContext _context;

        public MaintenanceService(WaspDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<MaintenanceLogDto>> GetMaintenanceLogsAsync(int page, int pageSize, string? status, string? priority, Guid? itemId)
        {
            var query = _context.MaintenanceLogs
                .Include(m => m.Item)
                .AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                if (Enum.TryParse<MaintenanceStatus>(status, true, out var statusEnum))
                    query = query.Where(m => m.Status == statusEnum);
            }

            if (!string.IsNullOrEmpty(priority))
            {
                if (Enum.TryParse<MaintenancePriority>(priority, true, out var priorityEnum))
                    query = query.Where(m => m.Priority == priorityEnum);
            }

            if (itemId.HasValue)
                query = query.Where(m => m.ItemId == itemId.Value);

            var totalCount = await query.CountAsync();

            var maintenanceLogs = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .OrderByDescending(m => m.CreatedAtUtc)
                .ToListAsync();

            var result = new PagedResult<MaintenanceLogDto>
            {
                Items = maintenanceLogs.Select(m => new MaintenanceLogDto
                {
                    Id = m.Id,
                    ItemId = m.ItemId,
                    ItemName = m.Item.Name,
                    Priority = m.Priority,
                    IssueDescription = m.IssueDescription,
                    Status = m.Status,
                    AssignedToUserId = m.AssignedToUserId,
                    ResolutionSteps = m.ResolutionSteps,
                    DateLoggedUtc = m.DateLoggedUtc ?? DateTime.UtcNow,
                    DateResolvedUtc = m.DateResolvedUtc,
                    CreatedAtUtc = m.CreatedAtUtc ?? DateTime.UtcNow,
                    UpdatedAtUtc = m.UpdatedAtUtc ?? DateTime.UtcNow
                }).ToList(),
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };

            return result;
        }

        public async Task<MaintenanceLogDto> GetMaintenanceLogByIdAsync(Guid id)
        {
            var maintenanceLog = await _context.MaintenanceLogs
                .Include(m => m.Item)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (maintenanceLog == null)
                throw new KeyNotFoundException("Maintenance log not found");

            return new MaintenanceLogDto
            {
                Id = maintenanceLog.Id,
                ItemId = maintenanceLog.ItemId,
                ItemName = maintenanceLog.Item.Name,
                Priority = maintenanceLog.Priority,
                IssueDescription = maintenanceLog.IssueDescription,
                Status = maintenanceLog.Status,
                AssignedToUserId = maintenanceLog.AssignedToUserId,
                ResolutionSteps = maintenanceLog.ResolutionSteps,
                DateLoggedUtc = maintenanceLog.DateLoggedUtc ?? DateTime.UtcNow,
                DateResolvedUtc = maintenanceLog.DateResolvedUtc,
                CreatedAtUtc = maintenanceLog.CreatedAtUtc ?? DateTime.UtcNow,
                UpdatedAtUtc = maintenanceLog.UpdatedAtUtc ?? DateTime.UtcNow
            };
        }

        public async Task<MaintenanceLogDto> CreateMaintenanceLogAsync(CreateMaintenanceLogDto maintenanceDto)
        {
            var item = await _context.Items.FindAsync(maintenanceDto.ItemId);
            if (item == null)
                throw new KeyNotFoundException("Item not found");

            var maintenanceLog = new MaintenanceLog
            {
                ItemId = maintenanceDto.ItemId,
                Priority = maintenanceDto.Priority,
                IssueDescription = maintenanceDto.IssueDescription,
                Status = MaintenanceStatus.Pending,
                AssignedToUserId = maintenanceDto.AssignedToUserId,
                DateLoggedUtc = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedAtUtc = DateTime.UtcNow
            };

            _context.MaintenanceLogs.Add(maintenanceLog);
            await _context.SaveChangesAsync();

            // Create activity log
            await CreateActivityLogAsync(maintenanceLog.ItemId, "MaintenanceLogged", maintenanceDto.IssueDescription);

            return await GetMaintenanceLogByIdAsync(maintenanceLog.Id);
        }

        public async Task<MaintenanceLogDto> UpdateMaintenanceLogAsync(Guid id, UpdateMaintenanceLogDto maintenanceDto)
        {
            var maintenanceLog = await _context.MaintenanceLogs.FindAsync(id);
            if (maintenanceLog == null)
                throw new KeyNotFoundException("Maintenance log not found");

            maintenanceLog.Status = maintenanceDto.Status;
            maintenanceLog.ResolutionSteps = maintenanceDto.ResolutionSteps;
            maintenanceLog.AssignedToUserId = maintenanceDto.AssignedToUserId;
            maintenanceLog.UpdatedAtUtc = DateTime.UtcNow;

            if (maintenanceLog.Status == MaintenanceStatus.Resolved && maintenanceLog.DateResolvedUtc == null)
                maintenanceLog.DateResolvedUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Create activity log
            var details = $"Status changed to {maintenanceDto.Status}";
            if (!string.IsNullOrEmpty(maintenanceDto.ResolutionSteps))
                details += $", Resolution: {maintenanceDto.ResolutionSteps}";

            await CreateActivityLogAsync(maintenanceLog.ItemId, "MaintenanceUpdated", details);

            return await GetMaintenanceLogByIdAsync(id);
        }

        public async Task<bool> DeleteMaintenanceLogAsync(Guid id)
        {
            var maintenanceLog = await _context.MaintenanceLogs.FindAsync(id);
            if (maintenanceLog == null)
                return false;

            _context.MaintenanceLogs.Remove(maintenanceLog);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task CreateActivityLogAsync(Guid itemId, string action, string? details)
        {
            var activityLog = new ActivityLog
            {
                ItemId = itemId,
                UserId = "system", // TODO: Get from current user context
                Action = action,
                DetailsJson = details,
                CreatedAtUtc = DateTime.UtcNow
            };

            _context.ActivityLogs.Add(activityLog);
            await _context.SaveChangesAsync();
        }
    }
}
