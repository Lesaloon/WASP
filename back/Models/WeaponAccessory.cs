using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Join entity for the many-to-many relationship between Weapons and Accessories.
    /// Represents which accessories are mounted on which weapons.
    /// </summary>
    [Table("WeaponAccessories")]
    public class WeaponAccessory
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
        /// Identifier for the accessory.
        /// </summary>
        [Required]
        public Guid AccessoryId { get; set; }

        /// <summary>
        /// Reference to the accessory entity.
        /// </summary>
        [ForeignKey("AccessoryId")]
        public virtual Accessory Accessory { get; set; } = null!;

        /// <summary>
        /// Date when the accessory was mounted on the weapon.
        /// </summary>
        public DateTime MountedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// User who mounted the accessory.
        /// </summary>
        public string? MountedBy { get; set; }

        /// <summary>
        /// Date when the accessory was unmounted from the weapon.
        /// </summary>
        public DateTime? UnmountedAt { get; set; }

        /// <summary>
        /// User who unmounted the accessory.
        /// </summary>
        public string? UnmountedBy { get; set; }

        /// <summary>
        /// Reason for unmounting (Battery, Maintenance, etc.).
        /// </summary>
        public string? UnmountingReason { get; set; }

        /// <summary>
        /// Notes about the mounting or unmounting.
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Indicates if the accessory is currently mounted.
        /// </summary>
        public bool IsCurrentlyMounted { get; set; } = true;

        /// <summary>
        /// Mount position or location on the weapon (e.g., "Rail 12 o'clock", "Rail 3 o'clock").
        /// </summary>
        public string? MountPosition { get; set; }

        /// <summary>
        /// Torque setting used when mounting (in inch-pounds).
        /// </summary>
        public decimal? MountTorque { get; set; }

        /// <summary>
        /// Initializes a new instance of the WeaponAccessory class.
        /// </summary>
        public WeaponAccessory()
        {
            MountedAt = DateTime.UtcNow;
            IsCurrentlyMounted = true;
        }
    }
}