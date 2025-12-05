using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents a tag that can be associated with items for categorization and organization.
    /// </summary>
    public class Tag : BaseEntity
    {
        /// <summary>
        /// Unique identifier for the tag.
        /// </summary>
        [Key]
        public override Guid Id { get; set; }

        /// <summary>
        /// Name of the tag.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Description or purpose of the tag.
        /// </summary>
        [StringLength(500)]
        public string? Description { get; set; }

        /// <summary>
        /// Color code for the tag (e.g., #FF0000 for red).
        /// </summary>
        [StringLength(7)]
        public string? Color { get; set; }

        /// <summary>
        /// Indicates if the tag is active or archived.
        /// </summary>
        public bool IsActive { get; set; } = true;

        /// <summary>
        /// Created at timestamp in UTC.
        /// </summary>
        public DateTime? CreatedAtUtc { get; set; }

        /// <summary>
        /// Updated at timestamp in UTC.
        /// </summary>
        public DateTime? UpdatedAtUtc { get; set; }

        /// <summary>
        /// Navigation property for items associated with this tag.
        /// </summary>
        public virtual ICollection<ItemTag> ItemTags { get; set; } = new List<ItemTag>();

        /// <summary>
        /// Initializes a new instance of the Tag class.
        /// </summary>
        public Tag()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}