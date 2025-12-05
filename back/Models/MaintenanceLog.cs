using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents a maintenance log entry for an item.
    /// Tracks all maintenance activities, inspections, and service records.
    /// </summary>
    public class MaintenanceLog : BaseEntity
    {
        /// <summary>
        /// Unique identifier for the maintenance log.
        /// </summary>
        [Key]
        public override Guid Id { get; set; }

        /// <summary>
        /// Identifier for the item being maintained.
        /// </summary>
        [Required]
        public Guid ItemId { get; set; }

        /// <summary>
        /// Reference to the item entity.
        /// </summary>
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; } = null!;

        /// <summary>
        /// Type of maintenance performed.
        /// </summary>
        [Required]
        public MaintenanceType MaintenanceType { get; set; }

        /// <summary>
        /// Description of the maintenance activity.
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Date when the maintenance was performed.
        /// </summary>
        [Required]
        public DateTime MaintenanceDate { get; set; }

        /// <summary>
        /// Technician or person who performed the maintenance.
        /// </summary>
        [Required]
        [StringLength(200)]
        public string PerformedBy { get; set; } = string.Empty;

        /// <summary>
        /// Next scheduled maintenance date.
        /// </summary>
        public DateTime? NextMaintenanceDate { get; set; }

        /// <summary>
        /// Maintenance result or status (Completed, Failed, Pending, etc.).
        /// </summary>
        [Required]
        public MaintenanceStatus Status { get; set; }

        /// <summary>
        /// Cost of the maintenance (if applicable).
        /// </summary>
        public decimal? Cost { get; set; }

        /// <summary>
        /// Parts replaced during maintenance (comma-separated list).
        /// </summary>
        public string? PartsReplaced { get; set; }

        /// <summary>
        /// Labor hours spent on maintenance.
        /// </summary>
        public decimal? LaborHours { get; set; }

        /// <summary>
        /// Additional notes or comments about the maintenance.
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Whether this maintenance was performed as part of a scheduled service.
        /// </summary>
        public bool IsScheduled { get; set; } = false;

        /// <summary>
        /// Mileage, rounds fired, or usage count at time of maintenance (if applicable).
        /// </summary>
        public int? UsageCount { get; set; }

        /// <summary>
        /// Vehicle ID or equipment ID where maintenance was performed (if applicable).
        /// </summary>
        [StringLength(100)]
        public string? EquipmentId { get; set; }

        /// <summary>
        /// Vendor or service provider who performed the maintenance.
        /// </summary>
        [StringLength(200)]
        public string? Vendor { get; set; }

        /// <summary>
        /// Maintenance order or work order number.
        /// </summary>
        [StringLength(100)]
        public string? WorkOrderNumber { get; set; }

        /// <summary>
        /// Inspection results or findings.
        /// </summary>
        public string? InspectionResults { get; set; }

        /// <summary>
        /// Safety check results.
        /// </summary>
        public string? SafetyCheckResults { get; set; }

/// <summary>
        /// Performance test results.
        /// </summary>
        public string? PerformanceTestResults { get; set; }

        /// <summary>
        /// Issue description for maintenance requests.
        /// </summary>
        [StringLength(500)]
        public string? IssueDescription { get; set; }

        /// <summary>
        /// Resolution steps taken.
        /// </summary>
        [StringLength(1000)]
        public string? ResolutionSteps { get; set; }

        /// <summary>
        /// User assigned to resolve the issue.
        /// </summary>
        [StringLength(200)]
        public string? AssignedToUserId { get; set; }

        /// <summary>
        /// Date when the issue was logged.
        /// </summary>
        public DateTime? DateLoggedUtc { get; set; }

        /// <summary>
        /// Date when the issue was resolved.
        /// </summary>
        public DateTime? DateResolvedUtc { get; set; }

        /// <summary>
        /// Created at timestamp in UTC.
        /// </summary>
        public DateTime? CreatedAtUtc { get; set; }

        /// <summary>
        /// Updated at timestamp in UTC.
        /// </summary>
        public DateTime? UpdatedAtUtc { get; set; }

        /// <summary>
        /// Maintenance priority level.
        /// </summary>
        public MaintenancePriority Priority { get; set; }

        /// <summary>
        /// Initializes a new instance of the MaintenanceLog class.
        /// </summary>
        public MaintenanceLog()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            MaintenanceDate = DateTime.UtcNow;
            Status = MaintenanceStatus.Completed;
        }
    }
}