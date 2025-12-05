using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Join entity for the many-to-many relationship between Weapons and Parts.
    /// Represents which parts are installed on which weapons.
    /// </summary>
    [Table("WeaponParts")]
    public class WeaponPart
    {
        /// <summary>
        /// Identifier for the weapon.
        /// </summary>
        [Required]
        public Guid WeaponId { get; set; }

        /// <summary>
        /// Reference to the weapon entity.
        /// </summary>
        [ForeignKey("WeaponId")]
        public virtual Weapon Weapon { get; set; } = null!;

        /// <summary>
        /// Identifier for the part.
        /// </summary>
        [Required]
        public Guid PartId { get; set; }

        /// <summary>
        /// Reference to the part entity.
        /// </summary>
        [ForeignKey("PartId")]
        public virtual Part Part { get; set; } = null!;

        /// <summary>
        /// Date when the part was installed on the weapon.
        /// </summary>
        public DateTime InstalledAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// User who installed the part.
        /// </summary>
        public string? InstalledBy { get; set; }

        /// <summary>
        /// Date when the part was removed from the weapon.
        /// </summary>
        public DateTime? RemovedAt { get; set; }

        /// <summary>
        /// User who removed the part.
        /// </summary>
        public string? RemovedBy { get; set; }

        /// <summary>
        /// Reason for removal (Worn, Damaged, Upgraded, etc.).
        /// </summary>
        public string? RemovalReason { get; set; }

        /// <summary>
        /// Notes about the installation or removal.
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Indicates if the part is currently installed.
        /// </summary>
        public bool IsCurrentlyInstalled { get; set; } = true;

        /// <summary>
        /// Initializes a new instance of the WeaponPart class.
        /// </summary>
        public WeaponPart()
        {
            InstalledAt = DateTime.UtcNow;
            IsCurrentlyInstalled = true;
        }
    }
}