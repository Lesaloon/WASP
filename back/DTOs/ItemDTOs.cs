using System;
using System.Collections.Generic;
using Wasp.Backend.Enums;

namespace Wasp.Backend.DTOs
{
    public abstract class ItemBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Manufacturer { get; set; }
        public DateTime? DateAcquired { get; set; }
        public decimal? Price { get; set; }
        public ItemCondition Condition { get; set; }
        public ItemStatus Status { get; set; }
        public string? Notes { get; set; }
        public string? WarrantyInfo { get; set; }
        public string TrackingCode { get; set; } = null!;
        public List<Guid> TagIds { get; set; } = new List<Guid>();
        public DateTime CreatedAtUtc { get; set; }
        public DateTime? UpdatedAtUtc { get; set; }
    }

    public class WeaponDto : ItemBaseDto
    {
        public PlatformType Platform { get; set; }
        public string Category { get; set; } = null!;
        public string? Subcategory { get; set; }
        public string Model { get; set; } = null!;
        public string? SerialNumber { get; set; }
        public string? CaliberOrBbSize { get; set; }
        public string? ActionType { get; set; }
        public string? CountryOfOrigin { get; set; }
        public List<WeaponPartDto> Parts { get; set; } = new List<WeaponPartDto>();
        public List<WeaponAccessoryDto> Accessories { get; set; } = new List<WeaponAccessoryDto>();
    }

    public class PartDto : ItemBaseDto
    {
        public PlatformType Platform { get; set; }
        public string PartType { get; set; } = null!;
        public string? CompatibleModelsRaw { get; set; }
        public List<WeaponPartDto> Weapons { get; set; } = new List<WeaponPartDto>();
    }

    public class AccessoryDto : ItemBaseDto
    {
        public PlatformType Platform { get; set; }
        public ItemType AccessoryType { get; set; }
        public List<WeaponAccessoryDto> Weapons { get; set; } = new List<WeaponAccessoryDto>();
    }

    public class WeaponPartDto
    {
        public Guid PartId { get; set; }
        public string PartName { get; set; } = null!;
        public bool IsCurrentlyInstalled { get; set; }
        public string? Notes { get; set; }
    }

    public class WeaponAccessoryDto
    {
        public Guid AccessoryId { get; set; }
        public string AccessoryName { get; set; } = null!;
        public bool IsCurrentlyMounted { get; set; }
        public string? Notes { get; set; }
    }

    public class LinkPartDto
    {
        public bool IsInstalled { get; set; }
        public string? Notes { get; set; }
    }

    public class LinkAccessoryDto
    {
        public bool IsMounted { get; set; }
        public string? Notes { get; set; }
    }

    public class MaintenanceLogDto
    {
        public Guid Id { get; set; }
        public Guid ItemId { get; set; }
        public string ItemName { get; set; } = null!;
        public MaintenancePriority Priority { get; set; }
        public string IssueDescription { get; set; } = null!;
        public MaintenanceStatus Status { get; set; }
        public string? AssignedToUserId { get; set; }
        public string? ResolutionSteps { get; set; }
        public DateTime DateLoggedUtc { get; set; }
        public DateTime? DateResolvedUtc { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public DateTime? UpdatedAtUtc { get; set; }
    }

    public class ActivityLogDto
    {
        public Guid Id { get; set; }
        public Guid ItemId { get; set; }
        public string ItemName { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public ActivityAction Action { get; set; }
        public string? DetailsJson { get; set; }
        public DateTime CreatedAtUtc { get; set; }
    }

    public class TagDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedAtUtc { get; set; }
    }

    public class CreateMaintenanceLogDto
    {
        public Guid ItemId { get; set; }
        public MaintenancePriority Priority { get; set; }
        public string IssueDescription { get; set; } = null!;
        public string? AssignedToUserId { get; set; }
    }

    public class UpdateMaintenanceLogDto
    {
        public MaintenanceStatus Status { get; set; }
        public string? ResolutionSteps { get; set; }
        public string? AssignedToUserId { get; set; }
    }

    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }

    public class ItemFilterDto
    {
        public ItemType? Type { get; set; }
        public PlatformType? Platform { get; set; }
        public ItemStatus? Status { get; set; }
        public string? Category { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public string? Search { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
