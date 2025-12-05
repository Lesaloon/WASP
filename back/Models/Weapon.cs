using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents a weapon in the WASP system.
    /// Extends the base Item class with weapon-specific properties.
    /// </summary>
    public class Weapon : Item
    {
        /// <summary>
        /// Type of weapon (Rifle, Pistol, Shotgun, etc.).
        /// </summary>
        [Required]
        public WeaponType WeaponType { get; set; }

        /// <summary>
        /// Caliber or ammunition type for the weapon.
        /// </summary>
        [StringLength(50)]
        public string? Caliber { get; set; }

        /// <summary>
        /// Barrel length in inches.
        /// </summary>
        public decimal? BarrelLength { get; set; }

        /// <summary>
        /// Overall length in inches.
        /// </summary>
        public decimal? OverallLength { get; set; }

        /// <summary>
        /// Weight in pounds.
        /// </summary>
        public decimal? Weight { get; set; }

        /// <summary>
        /// Action type (Semi-Auto, Bolt, Lever, etc.).
        /// </summary>
        [StringLength(50)]
        public string? Action { get; set; }

        /// <summary>
        /// Capacity of the magazine.
        /// </summary>
        public int? MagazineCapacity { get; set; }

        /// <summary>
        /// Year of manufacture.
        /// </summary>
        public int? YearOfManufacture { get; set; }

        /// <summary>
        /// Country of origin.
        /// </summary>
        [StringLength(50)]
        public string? CountryOfOrigin { get; set; }

        /// <summary>
        /// Classification or class of the weapon.
        /// </summary>
        [StringLength(50)]
        public string? WeaponClass { get; set; }

        /// <summary>
        /// License or permit number required for this weapon.
        /// </summary>
        [StringLength(100)]
        public string? LicenseNumber { get; set; }

        /// <summary>
        /// Date when the license expires.
        /// </summary>
        public DateTime? LicenseExpiryDate { get; set; }

        /// <summary>
        /// Current ammunition count for this weapon.
        /// </summary>
        public int? AmmunitionCount { get; set; }

        /// <summary>
        /// Type of ammunition currently loaded.
        /// </summary>
        [StringLength(50)]
        public string? CurrentAmmunitionType { get; set; }

        /// <summary>
        /// Last zero distance in yards/meters.
        /// </summary>
        public decimal? LastZeroDistance { get; set; }

        /// <summary>
        /// Last zero date.
        /// </summary>
        public DateTime? LastZeroDate { get; set; }

        /// <summary>
        /// Last bore sighting date.
        /// </summary>
        public DateTime? LastBoreSightingDate { get; set; }

        /// <summary>
        /// Last function check date.
        /// </summary>
        public DateTime? LastFunctionCheckDate { get; set; }

        /// <summary>
        /// Last safety check date.
        /// </summary>
        public DateTime? LastSafetyCheckDate { get; set; }

        

        /// <summary>
        /// Caliber or BB size for airsoft weapons.
        /// </summary>
        [StringLength(20)]
        public string? CaliberOrBbSize { get; set; }

        /// <summary>
        /// Action type for airsoft weapons.
        /// </summary>
        [StringLength(50)]
        public string? ActionType { get; set; }

        /// <summary>
        /// Navigation property for parts associated with this weapon.
        /// </summary>
        public virtual ICollection<WeaponPart> Parts { get; set; } = new List<WeaponPart>();

        /// <summary>
        /// Navigation property for accessories mounted on this weapon.
        /// </summary>
        public virtual ICollection<WeaponAccessory> Accessories { get; set; } = new List<WeaponAccessory>();

        /// <summary>
        /// Navigation property for weapon parts join entity.
        /// </summary>
        public virtual ICollection<WeaponPart> WeaponParts { get; set; } = new List<WeaponPart>();

        /// <summary>
        /// Navigation property for weapon accessories join entity.
        /// </summary>
        public virtual ICollection<WeaponAccessory> WeaponAccessories { get; set; } = new List<WeaponAccessory>();

        

        /// <summary>
        /// Initializes a new instance of the Weapon class.
        /// </summary>
        public Weapon()
        {
            Type = ItemType.Weapon;
        }
    }
}