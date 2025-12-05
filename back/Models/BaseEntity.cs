using System;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Abstract base class for all entities with common properties.
    /// Provides ID, timestamps, and audit trail functionality.
    /// </summary>
    public abstract class BaseEntity
    {
/// <summary>
    /// Unique identifier for the entity.
    /// </summary>
    public virtual Guid Id { get; set; }

        /// <summary>
        /// Timestamp when the entity was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Timestamp when the entity was last modified.
        /// </summary>
        public DateTime UpdatedAt { get; set; }

        /// <summary>
        /// User who created the entity.
        /// </summary>
        public string? CreatedBy { get; set; }

        /// <summary>
        /// User who last modified the entity.
        /// </summary>
        public string? UpdatedBy { get; set; }

        /// <summary>
        /// Initializes a new instance of the BaseEntity class.
        /// Sets default values for timestamps.
        /// </summary>
        protected BaseEntity()
        {
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}