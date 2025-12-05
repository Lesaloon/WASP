using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Models
{
    /// <summary>
    /// Represents a part in the WASP system.
    /// Extends the base Item class with part-specific properties.
    /// </summary>
    public class Part : Item
    {
        /// <summary>
        /// Type of part (Barrel, Bolt, Trigger, etc.).
        /// </summary>
        [Required]
        public PartType PartType { get; set; }

        /// <summary>
        /// Compatibility with weapon types.
        /// </summary>
        [StringLength(200)]
        public string? Compatibility { get; set; }

        /// <summary>
        /// Material used in the part's construction.
        /// </summary>
        [StringLength(100)]
        public string? Material { get; set; }

        /// <summary>
        /// Finish or coating applied to the part.
        /// </summary>
        [StringLength(100)]
        public string? Finish { get; set; }

        /// <summary>
        /// Color of the part.
        /// </summary>
        [StringLength(50)]
        public string? Color { get; set; }

        /// <summary>
        /// Thread pitch for threaded parts.
        /// </summary>
        [StringLength(20)]
        public string? ThreadPitch { get; set; }

        /// <summary>
        /// Thread direction (Right-hand, Left-hand).
        /// </summary>
        [StringLength(20)]
        public string? ThreadDirection { get; set; }

        /// <summary>
        /// Length of the part in inches.
        /// </summary>
        public decimal? Length { get; set; }

        /// <summary>
        /// Diameter of the part in inches.
        /// </summary>
        public decimal? Diameter { get; set; }

        /// <summary>
        /// Weight of the part in ounces.
        /// </summary>
        public decimal? Weight { get; set; }

        /// <summary>
        /// Manufacturer part number.
        /// </summary>
        [StringLength(100)]
        public string? PartNumber { get; set; }

        /// <summary>
        /// Whether this part is currently installed on a weapon.
        /// </summary>
        public bool IsInstalled { get; set; } = false;

        /// <summary>
        /// Date when the part was installed.
        /// </summary>
        public DateTime? InstalledDate { get; set; }

        /// <summary>
        /// Date when the part was removed.
        /// </summary>
        public DateTime? RemovedDate { get; set; }

        /// <summary>
        /// Reason for removal (Worn, Damaged, Upgraded, etc.).
        /// </summary>
        [StringLength(200)]
        public string? RemovalReason { get; set; }

        /// <summary>
        /// Number of rounds fired through this part (for applicable parts).
        /// </summary>
        public int? RoundsFired { get; set; }

        /// <summary>
        /// Number of installations this part has had.
        /// </summary>
        public int? NumberOfInstallations { get; set; }

        /// <summary>
        /// Last inspection date for this part.
        /// </summary>
        public DateTime? LastInspectionDate { get; set; }

        /// <summary>
        /// Inspection result (Pass, Fail, Needs Attention).
        /// </summary>
        [StringLength(50)]
        public string? LastInspectionResult { get; set; }

        

        /// <summary>
        /// Compatible models for this part.
        /// </summary>
        [StringLength(500)]
        public string? CompatibleModelsRaw { get; set; }

        /// <summary>
        /// Navigation property for weapons this part is associated with.
        /// </summary>
        public virtual ICollection<WeaponPart> Weapons { get; set; } = new List<WeaponPart>();

        /// <summary>
        /// Navigation property for weapon parts join entity.
        /// </summary>
        public virtual ICollection<WeaponPart> WeaponParts { get; set; } = new List<WeaponPart>();

        

        /// <summary>
        /// Initializes a new instance of the Part class.
        /// </summary>
        public Part()
        {
            Type = ItemType.Part;
        }
    }
}