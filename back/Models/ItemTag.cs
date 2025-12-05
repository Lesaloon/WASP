using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Join entity for the many-to-many relationship between Items and Tags.
    /// Represents which tags are associated with which items.
    /// </summary>
    [Table("ItemTags")]
    public class ItemTag
    {
        /// <summary>
        /// Identifier for the item.
        /// </summary>
        [Required]
        public Guid ItemId { get; set; }

        /// <summary>
        /// Reference to the item entity.
        /// </summary>
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; } = null!;

        /// <summary>
        /// Identifier for the tag.
        /// </summary>
        [Required]
        public Guid TagId { get; set; }

        /// <summary>
        /// Reference to the tag entity.
        /// </summary>
        [ForeignKey("TagId")]
        public virtual Tag Tag { get; set; } = null!;

        /// <summary>
        /// Date when this tag was assigned to the item.
        /// </summary>
        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// User who assigned this tag to the item.
        /// </summary>
        public string? AssignedBy { get; set; }

        /// <summary>
        /// Initializes a new instance of the ItemTag class.
        /// </summary>
        public ItemTag()
        {
            AssignedAt = DateTime.UtcNow;
        }
    }
}