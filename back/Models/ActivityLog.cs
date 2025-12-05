using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents an activity log entry for tracking all actions performed on items.
    /// Provides a complete audit trail for compliance and security purposes.
    /// </summary>
    public class ActivityLog : BaseEntity
    {
        /// <summary>
        /// Unique identifier for the activity log.
        /// </summary>
        [Key]
        public override Guid Id { get; set; }

        /// <summary>
        /// Identifier for the item involved in the activity.
        /// </summary>
        [Required]
        public Guid ItemId { get; set; }

        /// <summary>
        /// Reference to the item entity.
        /// </summary>
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; } = null!;

        /// <summary>
        /// Type of activity performed.
        /// </summary>
        [Required]
        public ActivityType ActivityType { get; set; }

        /// <summary>
        /// Description of the activity.
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// User who performed the activity.
        /// </summary>
        [Required]
        [StringLength(200)]
        public string PerformedBy { get; set; } = string.Empty;

        /// <summary>
        /// IP address from which the activity was performed.
        /// </summary>
        [StringLength(50)]
        public string? IpAddress { get; set; }

        /// <summary>
        /// User agent string for the client application.
        /// </summary>
        [StringLength(500)]
        public string? UserAgent { get; set; }

        /// <summary>
        /// Additional details about the activity in JSON format.
        /// </summary>
        public string? Details { get; set; }

        /// <summary>
        /// Previous values before the activity (for updates/deletes).
        /// </summary>
        public string? PreviousValues { get; set; }

        /// <summary>
        /// New values after the activity (for creates/updates).
        /// </summary>
        public string? NewValues { get; set; }

        /// <summary>
        /// Result of the activity (Success, Failed, Partial, etc.).
        /// </summary>
        [Required]
        public ActivityResult Result { get; set; }

        /// <summary>
        /// Severity level of the activity.
        /// </summary>
        [Required]
        public ActivitySeverity Severity { get; set; }

        /// <summary>
        /// Duration of the activity in milliseconds (if applicable).
        /// </summary>
        public long? Duration { get; set; }

        /// <summary>
        /// Session identifier for grouping related activities.
        /// </summary>
        public string? SessionId { get; set; }

        /// <summary>
        /// Transaction identifier for database operations.
        /// </summary>
        public string? TransactionId { get; set; }

        /// <summary>
        /// Location or department where the activity occurred.
        /// </summary>
        [StringLength(200)]
        public string? Location { get; set; }

        /// <summary>
        /// Device or workstation used for the activity.
        /// </summary>
        [StringLength(200)]
        public string? Device { get; set; }

        /// <summary>
        /// Whether this activity requires approval or review.
        /// </summary>
        public bool RequiresReview { get; set; } = false;

        /// <summary>
        /// Date when the review was completed.
        /// </summary>
        public DateTime? ReviewedAt { get; set; }

        /// <summary>
        /// User who reviewed this activity.
        /// </summary>
        [StringLength(200)]
        public string? ReviewedBy { get; set; }

        /// <summary>
        /// Review comments or notes.
        /// </summary>
        public string? ReviewNotes { get; set; }

        /// <summary>
        /// User ID who performed the activity.
        /// </summary>
        [StringLength(200)]
        public string? UserId { get; set; }

        /// <summary>
        /// Action performed (for API endpoints).
        /// </summary>
        [StringLength(100)]
        public string? Action { get; set; }

        /// <summary>
        /// Details in JSON format.
        /// </summary>
        public string? DetailsJson { get; set; }

        /// <summary>
        /// Created at timestamp in UTC.
        /// </summary>
        public DateTime? CreatedAtUtc { get; set; }

        /// <summary>
        /// Updated at timestamp in UTC.
        /// </summary>
        public DateTime? UpdatedAtUtc { get; set; }

        /// <summary>
        /// Initializes a new instance of the ActivityLog class.
        /// </summary>
        public ActivityLog()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            CreatedAtUtc = DateTime.UtcNow;
            UpdatedAtUtc = DateTime.UtcNow;
            Result = ActivityResult.Success;
            Severity = ActivitySeverity.Information;
        }
    }
}