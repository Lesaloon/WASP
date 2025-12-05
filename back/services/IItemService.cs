using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wasp.Backend.DTOs;
using Wasp.Backend.Enums;
using Wasp.Backend.Models;

namespace Wasp.Backend.Services
{
    public interface IItemService
    {
        Task<PagedResult<ItemBaseDto>> GetItemsAsync(ItemFilterDto filter);
        Task<ItemBaseDto> GetItemByIdAsync(Guid id);
        Task<WeaponDto> CreateWeaponAsync(WeaponDto weaponDto);
        Task<PartDto> CreatePartAsync(PartDto partDto);
        Task<AccessoryDto> CreateAccessoryAsync(AccessoryDto accessoryDto);
        Task<WeaponDto> UpdateWeaponAsync(Guid id, WeaponDto weaponDto);
        Task<PartDto> UpdatePartAsync(Guid id, PartDto partDto);
        Task<AccessoryDto> UpdateAccessoryAsync(Guid id, AccessoryDto accessoryDto);
        Task<bool> DeleteItemAsync(Guid id);
        Task<bool> LinkPartToWeaponAsync(Guid weaponId, Guid partId, bool isInstalled, string? notes);
        Task<bool> UnlinkPartFromWeaponAsync(Guid weaponId, Guid partId);
        Task<bool> LinkAccessoryToWeaponAsync(Guid weaponId, Guid accessoryId, bool isMounted, string? notes);
        Task<bool> UnlinkAccessoryFromWeaponAsync(Guid weaponId, Guid accessoryId);
    }
}
