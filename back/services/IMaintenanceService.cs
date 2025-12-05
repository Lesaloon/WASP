using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wasp.Backend.DTOs;

namespace Wasp.Backend.Services
{
    public interface IMaintenanceService
    {
        Task<PagedResult<MaintenanceLogDto>> GetMaintenanceLogsAsync(int page, int pageSize, string? status, string? priority, Guid? itemId);
        Task<MaintenanceLogDto> GetMaintenanceLogByIdAsync(Guid id);
        Task<MaintenanceLogDto> CreateMaintenanceLogAsync(CreateMaintenanceLogDto maintenanceDto);
        Task<MaintenanceLogDto> UpdateMaintenanceLogAsync(Guid id, UpdateMaintenanceLogDto maintenanceDto);
        Task<bool> DeleteMaintenanceLogAsync(Guid id);
    }
}
