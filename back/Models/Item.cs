using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Abstract base class for all items in the WASP system.
    /// Uses Table Per Hierarchy (TPH) inheritance strategy.
    /// </summary>
    public abstract class Item : BaseEntity
    {
        /// <summary>
        /// Unique identifier for the item.
        /// </summary>
        [Key]
        public override Guid Id { get; set; }

        /// <summary>
        /// Type of the item (Weapon, Part, Accessory).
        /// </summary>
        [Required]
        public ItemType Type { get; set; }

        /// <summary>
        /// Name or designation of the item.
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Unique serial number or identifier.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string SerialNumber { get; set; } = string.Empty;

        /// <summary>
        /// Manufacturer of the item.
        /// </summary>
        [StringLength(100)]
        public string? Manufacturer { get; set; }

        /// <summary>
        /// Model or variant of the item.
        /// </summary>
        [StringLength(100)]
        public string? Model { get; set; }

        /// <summary>
        /// Current status of the item.
        /// </summary>
        public ItemStatus Status { get; set; } = ItemStatus.Active;

        /// <summary>
        /// Date when the item was acquired.
        /// </summary>
        public DateTime? AcquisitionDate { get; set; }

        /// <summary>
        /// Date when the item was last serviced.
        /// </summary>
        public DateTime? LastServiceDate { get; set; }

        /// <summary>
        /// Date when the item is due for next service.
        /// </summary>
        public DateTime? NextServiceDue { get; set; }

        /// <summary>
        /// Current location of the item.
        /// </summary>
        [StringLength(200)]
        public string? Location { get; set; }

        /// <summary>
        /// Current owner or user of the item.
        /// </summary>
        [StringLength(200)]
        public string? Owner { get; set; }

        /// <summary>
        /// Condition rating of the item (1-10).
        /// </summary>
        public int? ConditionRating { get; set; }

        /// <summary>
        /// Additional notes or comments about the item.
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Platform or system this item belongs to.
        /// </summary>
        [StringLength(50)]
        public string? Platform { get; set; }

        /// <summary>
        /// Category for classification.
        /// </summary>
        [StringLength(50)]
        public string? Category { get; set; }

        /// <summary>
        /// Subcategory for further classification.
        /// </summary>
        [StringLength(50)]
        public string? Subcategory { get; set; }

        /// <summary>
        /// Tracking code for inventory management.
        /// </summary>
        [StringLength(100)]
        public string? TrackingCode { get; set; }

        /// <summary>
        /// Date when the item was acquired.
        /// </summary>
        public DateTime? DateAcquired { get; set; }

        /// <summary>
        /// Price of the item.
        /// </summary>
        public decimal? Price { get; set; }

        /// <summary>
        /// Condition of the item.
        /// </summary>
        public ItemCondition? Condition { get; set; }

        /// <summary>
        /// Warranty information for the item.
        /// </summary>
        [StringLength(500)]
        public string? WarrantyInfo { get; set; }

        /// <summary>
        /// Indicates if the item is currently checked out.
        /// </summary>
        public bool IsCheckedOut { get; set; } = false;

        /// <summary>
        /// Date when the item was checked out.
        /// </summary>
        public DateTime? CheckedOutAt { get; set; }

        /// <summary>
        /// User who checked out the item.
        /// </summary>
        public string? CheckedOutBy { get; set; }

        /// <summary>
        /// Date when the item was checked in.
        /// </summary>
        public DateTime? CheckedInAt { get; set; }

        /// <summary>
        /// User who checked in the item.
        /// </summary>
        public string? CheckedInBy { get; set; }

        /// <summary>
        /// Navigation property for tags associated with this item.
        /// </summary>
        public virtual ICollection<ItemTag> ItemTags { get; set; } = new List<ItemTag>();

        /// <summary>
        /// Navigation property for maintenance logs for this item.
        /// </summary>
        public virtual ICollection<MaintenanceLog> MaintenanceLogs { get; set; } = new List<MaintenanceLog>();

        /// <summary>
        /// Navigation property for activity logs for this item.
        /// </summary>
        public virtual ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();

        /// <summary>
        /// Navigation property for tags associated with this item.
        /// </summary>
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();

        /// <summary>
        /// Created at timestamp in UTC.
        /// </summary>
        public DateTime? CreatedAtUtc { get; set; }

        /// <summary>
        /// Updated at timestamp in UTC.
        /// </summary>
        public DateTime? UpdatedAtUtc { get; set; }

        /// <summary>
        /// Initializes a new instance of the Item class.
        /// </summary>
        protected Item()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            CreatedAtUtc = DateTime.UtcNow;
            UpdatedAtUtc = DateTime.UtcNow;
        }
    }
}