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
    public class ItemService : IItemService
    {
        private readonly WaspDbContext _context;

        public ItemService(WaspDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<ItemBaseDto>> GetItemsAsync(ItemFilterDto filter)
        {
            var query = _context.Items.AsQueryable();

            // Apply filters
            if (filter.Type.HasValue)
                query = query.Where(i => i.Type == filter.Type.Value);

            if (filter.Platform.HasValue)
            {
                var weapons = query.OfType<Weapon>().Where(i => i.Platform == filter.Platform.Value.ToString());
                var parts = query.OfType<Part>().Where(i => i.Platform == filter.Platform.Value.ToString());
                var accessories = query.OfType<Accessory>().Where(i => i.Platform == filter.Platform.Value.ToString());
                query = weapons.Cast<Item>().Union(parts.Cast<Item>()).Union(accessories.Cast<Item>());
            }

            if (filter.Status.HasValue)
                query = query.Where(i => i.Status == filter.Status.Value);

            if (!string.IsNullOrEmpty(filter.Category))
                query = query.OfType<Weapon>().Where(i => i.Category == filter.Category);

            if (filter.Tags.Any())
                query = query.Where(i => i.ItemTags.Any(t => filter.Tags.Contains(t.Tag.Name)));

            if (!string.IsNullOrEmpty(filter.Search))
            {
                var search = filter.Search.ToLower();
                query = query.Where(i => i.Name.ToLower().Contains(search) ||
                                       i.Manufacturer.ToLower().Contains(search) ||
                                       i.TrackingCode.ToLower().Contains(search));
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var result = new PagedResult<ItemBaseDto>
            {
                Items = items.Select(MapToDto).ToList(),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / filter.PageSize)
            };

            return result;
        }

        public async Task<ItemBaseDto> GetItemByIdAsync(Guid id)
        {
            var item = await _context.Items
                .Include(i => i.ItemTags).ThenInclude(it => it.Tag)
                .Include(i => i.MaintenanceLogs)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
                throw new KeyNotFoundException("Item not found");

            return MapToDto(item);
        }

        public async Task<WeaponDto> CreateWeaponAsync(WeaponDto weaponDto)
        {
            var weapon = new Weapon
            {
                Name = weaponDto.Name,
                Manufacturer = weaponDto.Manufacturer,
                DateAcquired = weaponDto.DateAcquired,
                Price = weaponDto.Price,
                Condition = weaponDto.Condition,
                Status = weaponDto.Status,
                Notes = weaponDto.Notes,
                WarrantyInfo = weaponDto.WarrantyInfo,
                TrackingCode = await GenerateTrackingCode(ItemType.Weapon),
                
                Platform = weaponDto.Platform.ToString(),
                Category = weaponDto.Category,
                Subcategory = weaponDto.Subcategory,
                Model = weaponDto.Model,
                SerialNumber = weaponDto.SerialNumber,
                CaliberOrBbSize = weaponDto.CaliberOrBbSize,
                ActionType = weaponDto.ActionType,
                CountryOfOrigin = weaponDto.CountryOfOrigin,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedAtUtc = DateTime.UtcNow
            };

            _context.Items.Add(weapon);
            await _context.SaveChangesAsync();

            return await GetWeaponDto(weapon.Id);
        }

        public async Task<PartDto> CreatePartAsync(PartDto partDto)
        {
            var part = new Part
            {
                Name = partDto.Name,
                Manufacturer = partDto.Manufacturer,
                DateAcquired = partDto.DateAcquired,
                Price = partDto.Price,
                Condition = partDto.Condition,
                Status = partDto.Status,
                Notes = partDto.Notes,
                WarrantyInfo = partDto.WarrantyInfo,
                TrackingCode = await GenerateTrackingCode(ItemType.Part),
                
                Platform = partDto.Platform.ToString(),
                PartType = Enum.Parse<PartType>(partDto.PartType),
                CompatibleModelsRaw = partDto.CompatibleModelsRaw,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedAtUtc = DateTime.UtcNow
            };

            _context.Items.Add(part);
            await _context.SaveChangesAsync();

            return await GetPartDto(part.Id);
        }

        public async Task<AccessoryDto> CreateAccessoryAsync(AccessoryDto accessoryDto)
        {
            var accessory = new Accessory
            {
                Name = accessoryDto.Name,
                Manufacturer = accessoryDto.Manufacturer,
                DateAcquired = accessoryDto.DateAcquired,
                Price = accessoryDto.Price,
                Condition = accessoryDto.Condition,
                Status = accessoryDto.Status,
                Notes = accessoryDto.Notes,
                WarrantyInfo = accessoryDto.WarrantyInfo,
                TrackingCode = await GenerateTrackingCode(ItemType.Accessory),
                
                Platform = accessoryDto.Platform.ToString(),
                AccessoryType = accessoryDto.AccessoryType,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedAtUtc = DateTime.UtcNow
            };

            _context.Items.Add(accessory);
            await _context.SaveChangesAsync();

            return await GetAccessoryDto(accessory.Id);
        }

        public async Task<WeaponDto> UpdateWeaponAsync(Guid id, WeaponDto weaponDto)
        {
            var weapon = await _context.Weapons.FindAsync(id);
            if (weapon == null)
                throw new KeyNotFoundException("Weapon not found");

            weapon.Name = weaponDto.Name;
            weapon.Manufacturer = weaponDto.Manufacturer;
            weapon.DateAcquired = weaponDto.DateAcquired;
            weapon.Price = weaponDto.Price;
            weapon.Condition = weaponDto.Condition;
            weapon.Status = weaponDto.Status;
            weapon.Notes = weaponDto.Notes;
            weapon.WarrantyInfo = weaponDto.WarrantyInfo;
            weapon.Platform = weaponDto.Platform.ToString();
            weapon.Category = weaponDto.Category;
            weapon.Subcategory = weaponDto.Subcategory;
            weapon.Model = weaponDto.Model;
            weapon.SerialNumber = weaponDto.SerialNumber;
            weapon.CaliberOrBbSize = weaponDto.CaliberOrBbSize;
            weapon.ActionType = weaponDto.ActionType;
            weapon.CountryOfOrigin = weaponDto.CountryOfOrigin;
            weapon.UpdatedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetWeaponDto(id);
        }

        public async Task<PartDto> UpdatePartAsync(Guid id, PartDto partDto)
        {
            var part = await _context.Parts.FindAsync(id);
            if (part == null)
                throw new KeyNotFoundException("Part not found");

            part.Name = partDto.Name;
            part.Manufacturer = partDto.Manufacturer;
            part.DateAcquired = partDto.DateAcquired;
            part.Price = partDto.Price;
            part.Condition = partDto.Condition;
            part.Status = partDto.Status;
            part.Notes = partDto.Notes;
            part.WarrantyInfo = partDto.WarrantyInfo;
            part.Platform = partDto.Platform.ToString();
            part.PartType = Enum.Parse<PartType>(partDto.PartType);
            part.CompatibleModelsRaw = partDto.CompatibleModelsRaw;
            part.UpdatedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetPartDto(id);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(Guid id, AccessoryDto accessoryDto)
        {
            var accessory = await _context.Accessories.FindAsync(id);
            if (accessory == null)
                throw new KeyNotFoundException("Accessory not found");

            accessory.Name = accessoryDto.Name;
            accessory.Manufacturer = accessoryDto.Manufacturer;
            accessory.DateAcquired = accessoryDto.DateAcquired;
            accessory.Price = accessoryDto.Price;
            accessory.Condition = accessoryDto.Condition;
            accessory.Status = accessoryDto.Status;
            accessory.Notes = accessoryDto.Notes;
            accessory.WarrantyInfo = accessoryDto.WarrantyInfo;
            accessory.Platform = accessoryDto.Platform.ToString();
            accessory.AccessoryType = accessoryDto.AccessoryType;
            accessory.UpdatedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetAccessoryDto(id);
        }

        public async Task<bool> DeleteItemAsync(Guid id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return false;

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LinkPartToWeaponAsync(Guid weaponId, Guid partId, bool isInstalled, string? notes)
        {
            var weapon = await _context.Weapons.FindAsync(weaponId);
            var part = await _context.Parts.FindAsync(partId);

            if (weapon == null || part == null)
                return false;

            var weaponPart = await _context.WeaponParts
                .FirstOrDefaultAsync(wp => wp.WeaponId == weaponId && wp.PartId == partId);

            if (weaponPart == null)
            {
                weaponPart = new WeaponPart
                {
                    WeaponId = weaponId,
                    PartId = partId,
                    IsCurrentlyInstalled = isInstalled,
                    Notes = notes
                };
                _context.WeaponParts.Add(weaponPart);
            }
            else
            {
                weaponPart.IsCurrentlyInstalled = isInstalled;
                weaponPart.Notes = notes;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlinkPartFromWeaponAsync(Guid weaponId, Guid partId)
        {
            var weaponPart = await _context.WeaponParts
                .FirstOrDefaultAsync(wp => wp.WeaponId == weaponId && wp.PartId == partId);

            if (weaponPart == null)
                return false;

            _context.WeaponParts.Remove(weaponPart);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LinkAccessoryToWeaponAsync(Guid weaponId, Guid accessoryId, bool isMounted, string? notes)
        {
            var weapon = await _context.Weapons.FindAsync(weaponId);
            var accessory = await _context.Accessories.FindAsync(accessoryId);

            if (weapon == null || accessory == null)
                return false;

            var weaponAccessory = await _context.WeaponAccessories
                .FirstOrDefaultAsync(wa => wa.WeaponId == weaponId && wa.AccessoryId == accessoryId);

            if (weaponAccessory == null)
            {
                weaponAccessory = new WeaponAccessory
                {
                    WeaponId = weaponId,
                    AccessoryId = accessoryId,
                    IsCurrentlyMounted = isMounted,
                    Notes = notes
                };
                _context.WeaponAccessories.Add(weaponAccessory);
            }
            else
            {
                weaponAccessory.IsCurrentlyMounted = isMounted;
                weaponAccessory.Notes = notes;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlinkAccessoryFromWeaponAsync(Guid weaponId, Guid accessoryId)
        {
            var weaponAccessory = await _context.WeaponAccessories
                .FirstOrDefaultAsync(wa => wa.WeaponId == weaponId && wa.AccessoryId == accessoryId);

            if (weaponAccessory == null)
                return false;

            _context.WeaponAccessories.Remove(weaponAccessory);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<WeaponDto> GetWeaponDto(Guid id)
        {
            var weapon = await _context.Weapons
                .Include(w => w.ItemTags).ThenInclude(it => it.Tag)
                .Include(w => w.Parts).ThenInclude(wp => wp.Part)
                .Include(w => w.Accessories).ThenInclude(wa => wa.Accessory)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (weapon == null)
                throw new KeyNotFoundException("Weapon not found");

            return new WeaponDto
            {
                Id = weapon.Id,
                Name = weapon.Name,
                Manufacturer = weapon.Manufacturer,
                DateAcquired = weapon.DateAcquired,
                Price = weapon.Price,
                Condition = weapon.Condition ?? ItemCondition.New,
                Status = weapon.Status,
                Notes = weapon.Notes,
                WarrantyInfo = weapon.WarrantyInfo,
                TrackingCode = weapon.TrackingCode,
                
                Platform = Enum.Parse<PlatformType>(weapon.Platform ?? "AR15"),
                Category = weapon.Category,
                Subcategory = weapon.Subcategory,
                Model = weapon.Model,
                SerialNumber = weapon.SerialNumber,
                CaliberOrBbSize = weapon.CaliberOrBbSize,
                ActionType = weapon.ActionType,
                CountryOfOrigin = weapon.CountryOfOrigin,
                TagIds = weapon.ItemTags.Select(t => t.TagId).ToList(),
                Parts = weapon.Parts.Select(wp => new WeaponPartDto
                {
                    PartId = wp.PartId,
                    PartName = wp.Part.Name,
                    IsCurrentlyInstalled = wp.IsCurrentlyInstalled,
                    Notes = wp.Notes
                }).ToList(),
                Accessories = weapon.Accessories.Select(wa => new WeaponAccessoryDto
                {
                    AccessoryId = wa.AccessoryId,
                    AccessoryName = wa.Accessory.Name,
                    IsCurrentlyMounted = wa.IsCurrentlyMounted,
                    Notes = wa.Notes
                }).ToList(),
                CreatedAtUtc = weapon.CreatedAtUtc ?? DateTime.UtcNow,
                UpdatedAtUtc = weapon.UpdatedAtUtc ?? DateTime.UtcNow
            };
        }

        private async Task<PartDto> GetPartDto(Guid id)
        {
            var part = await _context.Parts
                .Include(p => p.ItemTags).ThenInclude(it => it.Tag)
                .Include(p => p.Weapons).ThenInclude(wp => wp.Weapon)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null)
                throw new KeyNotFoundException("Part not found");

            return new PartDto
            {
                Id = part.Id,
                Name = part.Name,
                Manufacturer = part.Manufacturer,
                DateAcquired = part.DateAcquired,
                Price = part.Price,
                Condition = part.Condition ?? ItemCondition.New,
                Status = part.Status,
                Notes = part.Notes,
                WarrantyInfo = part.WarrantyInfo,
                TrackingCode = part.TrackingCode,
                
                Platform = Enum.Parse<PlatformType>(part.Platform ?? "AR15"),
                PartType = part.PartType.ToString(),
                CompatibleModelsRaw = part.CompatibleModelsRaw,
                TagIds = part.ItemTags.Select(t => t.TagId).ToList(),
                Weapons = part.Weapons.Select(wp => new WeaponPartDto
                {
                    PartId = wp.PartId,
                    PartName = wp.Part.Name,
                    IsCurrentlyInstalled = wp.IsCurrentlyInstalled,
                    Notes = wp.Notes
                }).ToList(),
                CreatedAtUtc = part.CreatedAtUtc ?? DateTime.UtcNow,
                UpdatedAtUtc = part.UpdatedAtUtc ?? DateTime.UtcNow
            };
        }

        private async Task<AccessoryDto> GetAccessoryDto(Guid id)
        {
            var accessory = await _context.Accessories
                .Include(a => a.ItemTags).ThenInclude(it => it.Tag)
                .Include(a => a.Weapons).ThenInclude(wa => wa.Weapon)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (accessory == null)
                throw new KeyNotFoundException("Accessory not found");

            return new AccessoryDto
            {
                Id = accessory.Id,
                Name = accessory.Name,
                Manufacturer = accessory.Manufacturer,
                DateAcquired = accessory.DateAcquired,
                Price = accessory.Price,
                Condition = accessory.Condition ?? ItemCondition.New,
                Status = accessory.Status,
                Notes = accessory.Notes,
                WarrantyInfo = accessory.WarrantyInfo,
                TrackingCode = accessory.TrackingCode,
                
                Platform = Enum.Parse<PlatformType>(accessory.Platform ?? "AR15"),
                AccessoryType = accessory.AccessoryType.ToString(),
                TagIds = accessory.ItemTags.Select(t => t.TagId).ToList(),
                Weapons = accessory.Weapons.Select(wa => new WeaponAccessoryDto
                {
                    AccessoryId = wa.AccessoryId,
                    AccessoryName = wa.Accessory.Name,
                    IsCurrentlyMounted = wa.IsCurrentlyMounted,
                    Notes = wa.Notes
                }).ToList(),
                CreatedAtUtc = accessory.CreatedAtUtc ?? DateTime.UtcNow,
                UpdatedAtUtc = accessory.UpdatedAtUtc ?? DateTime.UtcNow
            };
        }

        private ItemBaseDto MapToDto(Item item)
        {
            ItemBaseDto baseDto;

            switch (item.Type)
            {
                case ItemType.Weapon:
                    var weapon = item as Weapon;
                    baseDto = new WeaponDto
                    {
                        Id = weapon.Id,
                        Name = weapon.Name,
                        Manufacturer = weapon.Manufacturer,
                        DateAcquired = weapon.DateAcquired,
                        Price = weapon.Price,
                        Condition = weapon.Condition ?? ItemCondition.New,
                        Status = weapon.Status,
                        Notes = weapon.Notes,
                        WarrantyInfo = weapon.WarrantyInfo,
                        TrackingCode = weapon.TrackingCode,
                        
                        Platform = Enum.Parse<PlatformType>(weapon.Platform ?? "AR15"),
                        Category = weapon.Category,
                        Subcategory = weapon.Subcategory,
                        Model = weapon.Model,
                        SerialNumber = weapon.SerialNumber,
                        CaliberOrBbSize = weapon.CaliberOrBbSize,
                        ActionType = weapon.ActionType,
                        CountryOfOrigin = weapon.CountryOfOrigin,
                        TagIds = weapon.ItemTags.Select(t => t.TagId).ToList(),
                        Parts = weapon.Parts.Select(wp => new WeaponPartDto
                        {
                            PartId = wp.PartId,
                            PartName = wp.Part.Name,
                            IsCurrentlyInstalled = wp.IsCurrentlyInstalled,
                            Notes = wp.Notes
                        }).ToList(),
                        Accessories = weapon.Accessories.Select(wa => new WeaponAccessoryDto
                        {
                            AccessoryId = wa.AccessoryId,
                            AccessoryName = wa.Accessory.Name,
                            IsCurrentlyMounted = wa.IsCurrentlyMounted,
                            Notes = wa.Notes
                        }).ToList(),
                        CreatedAtUtc = weapon.CreatedAtUtc ?? DateTime.UtcNow,
                        UpdatedAtUtc = weapon.UpdatedAtUtc ?? DateTime.UtcNow
                    };
                    break;

                case ItemType.Part:
                    var part = item as Part;
                    baseDto = new PartDto
                    {
                        Id = part.Id,
                        Name = part.Name,
                        Manufacturer = part.Manufacturer,
                        DateAcquired = part.DateAcquired,
                        Price = part.Price,
                        Condition = part.Condition ?? ItemCondition.New,
                        Status = part.Status,
                        Notes = part.Notes,
                        WarrantyInfo = part.WarrantyInfo,
                        TrackingCode = part.TrackingCode,
                        
                        Platform = Enum.Parse<PlatformType>(part.Platform ?? "AR15"),
                        PartType = part.PartType.ToString(),
                        CompatibleModelsRaw = part.CompatibleModelsRaw,
                        TagIds = part.ItemTags.Select(t => t.TagId).ToList(),
                        Weapons = part.Weapons.Select(wp => new WeaponPartDto
                        {
                            PartId = wp.PartId,
                            PartName = wp.Part.Name,
                            IsCurrentlyInstalled = wp.IsCurrentlyInstalled,
                            Notes = wp.Notes
                        }).ToList(),
                        CreatedAtUtc = part.CreatedAtUtc ?? DateTime.UtcNow,
                        UpdatedAtUtc = part.UpdatedAtUtc ?? DateTime.UtcNow
                    };
                    break;

                case ItemType.Accessory:
                    var accessory = item as Accessory;
                    baseDto = new AccessoryDto
                    {
                        Id = accessory.Id,
                        Name = accessory.Name,
                        Manufacturer = accessory.Manufacturer,
                        DateAcquired = accessory.DateAcquired,
                        Price = accessory.Price,
                        Condition = accessory.Condition ?? ItemCondition.New,
                        Status = accessory.Status,
                        Notes = accessory.Notes,
                        WarrantyInfo = accessory.WarrantyInfo,
                        TrackingCode = accessory.TrackingCode,
                        
                        Platform = Enum.Parse<PlatformType>(accessory.Platform ?? "AR15"),

                        TagIds = accessory.ItemTags.Select(t => t.TagId).ToList(),
                        Weapons = accessory.Weapons.Select(wa => new WeaponAccessoryDto
                        {
                            AccessoryId = wa.AccessoryId,
                            AccessoryName = wa.Accessory.Name,
                            IsCurrentlyMounted = wa.IsCurrentlyMounted,
                            Notes = wa.Notes
                        }).ToList(),
CreatedAtUtc = accessory.CreatedAtUtc ?? DateTime.UtcNow,
                        UpdatedAtUtc = accessory.UpdatedAtUtc ?? DateTime.UtcNow
                    };
                    break;

                default:
                    baseDto = new WeaponDto
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Manufacturer = item.Manufacturer,
                        DateAcquired = item.DateAcquired,
                        Price = item.Price,
                        Condition = item.Condition ?? ItemCondition.New,
                        Status = item.Status,
                        Notes = item.Notes,
                        WarrantyInfo = item.WarrantyInfo,
                        TrackingCode = item.TrackingCode,
                        
                        TagIds = item.ItemTags.Select(t => t.TagId).ToList(),
                        CreatedAtUtc = item.CreatedAtUtc ?? DateTime.UtcNow,
                        UpdatedAtUtc = item.UpdatedAtUtc ?? DateTime.UtcNow
                    };
                    break;
            }

            return baseDto;
        }

        private async Task<string> GenerateTrackingCode(ItemType itemType)
        {
            // Generate a unique tracking code based on item type
            var prefix = itemType switch
            {
                ItemType.Weapon => "WPN",
                ItemType.Part => "PRT",
                ItemType.Accessory => "ACC",
                _ => "ITM"
            };

            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
            var random = new Random().Next(1000, 9999);
            var trackingCode = $"{prefix}-{timestamp}-{random}";

            // Ensure uniqueness
            while (await _context.Items.AnyAsync(i => i.TrackingCode == trackingCode))
            {
                random = new Random().Next(1000, 9999);
                trackingCode = $"{prefix}-{timestamp}-{random}";
            }

            return trackingCode;
        }
    }
}
