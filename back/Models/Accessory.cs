using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents an accessory in the WASP system.
    /// Extends the base Item class with accessory-specific properties.
    /// </summary>
    public class Accessory : Item
    {
        /// <summary>
        /// Type of accessory (Optic, Laser, Flashlight, etc.).
        /// </summary>
        [Required]
        public AccessoryType AccessoryType { get; set; }

        /// <summary>
        /// Mount type or interface (Picatinny, Weaver, M-LOK, etc.).
        /// </summary>
        [StringLength(100)]
        public string? MountType { get; set; }

        /// <summary>
        /// Compatibility with weapon types or platforms.
        /// </summary>
        [StringLength(200)]
        public string? Compatibility { get; set; }

        /// <summary>
        /// Material used in the accessory's construction.
        /// </summary>
        [StringLength(100)]
        public string? Material { get; set; }

        /// <summary>
        /// Finish or coating applied to the accessory.
        /// </summary>
        [StringLength(100)]
        public string? Finish { get; set; }

        /// <summary>
        /// Color of the accessory.
        /// </summary>
        [StringLength(50)]
        public string? Color { get; set; }

        /// <summary>
        /// Length of the accessory in inches.
        /// </summary>
        public decimal? Length { get; set; }

        /// <summary>
        /// Height or width of the accessory in inches.
        /// </summary>
        public decimal? Width { get; set; }

        /// <summary>
        /// Height of the accessory in inches.
        /// </summary>
        public decimal? Height { get; set; }

        /// <summary>
        /// Weight of the accessory in ounces.
        /// </summary>
        public decimal? Weight { get; set; }

        /// <summary>
        /// Power source or battery type required.
        /// </summary>
        [StringLength(50)]
        public string? PowerSource { get; set; }

        /// <summary>
        /// Battery life in hours.
        /// </summary>
        public int? BatteryLife { get; set; }

        /// <summary>
        /// Whether this accessory is currently mounted on a weapon.
        /// </summary>
        public bool IsMounted { get; set; } = false;

        /// <summary>
        /// Date when the accessory was mounted.
        /// </summary>
        public DateTime? MountedDate { get; set; }

        /// <summary>
        /// Date when the accessory was unmounted.
        /// </summary>
        public DateTime? UnmountedDate { get; set; }

        /// <summary>
        /// Reason for unmounting (Battery, Maintenance, etc.).
        /// </summary>
        [StringLength(200)]
        public string? UnmountingReason { get; set; }

        /// <summary>
        /// Number of mounting cycles this accessory has undergone.
        /// </summary>
        public int? MountingCycles { get; set; }

        /// <summary>
        /// Last zero adjustment date (for optics and lasers).
        /// </summary>
        public DateTime? LastZeroDate { get; set; }

        /// <summary>
        /// Last zero adjustment value.
        /// </summary>
        [StringLength(50)]
        public string? LastZeroValue { get; set; }

        /// <summary>
        /// Last battery replacement date.
        /// </summary>
        public DateTime? LastBatteryReplacementDate { get; set; }

        /// <summary>
        /// Last function test date.
        /// </summary>
        public DateTime? LastFunctionTestDate { get; set; }

        /// <summary>
        /// Function test result (Pass, Fail, Needs Attention).
        /// </summary>
        [StringLength(50)]
        public string? LastFunctionTestResult { get; set; }

        

        /// <summary>
        /// Navigation property for weapons this accessory is mounted on.
        /// </summary>
        public virtual ICollection<WeaponAccessory> Weapons { get; set; } = new List<WeaponAccessory>();

        /// <summary>
        /// Navigation property for weapon accessories join entity.
        /// </summary>
        public virtual ICollection<WeaponAccessory> WeaponAccessories { get; set; } = new List<WeaponAccessory>();

        

        /// <summary>
        /// Initializes a new instance of the Accessory class.
        /// </summary>
        public Accessory()
        {
            Type = ItemType.Accessory;
        }
    }
}