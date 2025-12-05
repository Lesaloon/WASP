using Microsoft.EntityFrameworkCore;
using Wasp.Backend.Models;
using Wasp.Backend.Enums;

namespace Wasp.Backend.Data
{
    public class WaspDbContext : DbContext
    {
        public DbSet<Item> Items => Set<Item>();
        public DbSet<Weapon> Weapons => Set<Weapon>();
        public DbSet<Part> Parts => Set<Part>();
        public DbSet<Accessory> Accessories => Set<Accessory>();
        public DbSet<Tag> Tags => Set<Tag>();
        public DbSet<ItemTag> ItemTags => Set<ItemTag>();
        public DbSet<WeaponPart> WeaponParts => Set<WeaponPart>();
        public DbSet<WeaponAccessory> WeaponAccessories => Set<WeaponAccessory>();
        public DbSet<MaintenanceLog> MaintenanceLogs => Set<MaintenanceLog>();
        public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();

        public WaspDbContext(DbContextOptions<WaspDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // TPH for Item
            modelBuilder.Entity<Item>()
                .HasDiscriminator<ItemType>("ItemType")
                .HasValue<Weapon>(ItemType.Weapon)
                .HasValue<Part>(ItemType.Part)
                .HasValue<Accessory>(ItemType.Accessory);

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.TrackingCode)
                .IsUnique();

            // Many-to-many ItemTag
            modelBuilder.Entity<ItemTag>()
                .HasKey(it => new { it.ItemId, it.TagId });

            modelBuilder.Entity<ItemTag>()
                .HasOne(it => it.Item)
                .WithMany(i => i.ItemTags)
                .HasForeignKey(it => it.ItemId);

            modelBuilder.Entity<ItemTag>()
                .HasOne(it => it.Tag)
                .WithMany(t => t.ItemTags)
                .HasForeignKey(it => it.TagId);

            // WeaponPart
            modelBuilder.Entity<WeaponPart>()
                .HasKey(wp => new { wp.WeaponId, wp.PartId });

            modelBuilder.Entity<WeaponPart>()
                .HasOne(wp => wp.Weapon)
                .WithMany(w => w.Parts)
                .HasForeignKey(wp => wp.WeaponId);

            modelBuilder.Entity<WeaponPart>()
                .HasOne(wp => wp.Part)
                .WithMany(p => p.Weapons)
                .HasForeignKey(wp => wp.PartId);

            // WeaponAccessory
            modelBuilder.Entity<WeaponAccessory>()
                .HasKey(wa => new { wa.WeaponId, wa.AccessoryId });

            modelBuilder.Entity<WeaponAccessory>()
                .HasOne(wa => wa.Weapon)
                .WithMany(w => w.Accessories)
                .HasForeignKey(wa => wa.WeaponId);

            modelBuilder.Entity<WeaponAccessory>()
                .HasOne(wa => wa.Accessory)
                .WithMany(a => a.Weapons)
                .HasForeignKey(wa => wa.AccessoryId);

            // MaintenanceLog → Item
            modelBuilder.Entity<MaintenanceLog>()
                .HasOne(m => m.Item)
                .WithMany(i => i.MaintenanceLogs)
                .HasForeignKey(m => m.ItemId);

            // ActivityLog → Item
            modelBuilder.Entity<ActivityLog>()
                .HasOne(a => a.Item)
                .WithMany(i => i.ActivityLogs)
                .HasForeignKey(a => a.ItemId);
        }
    }
}
