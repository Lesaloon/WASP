using System.ComponentModel.DataAnnotations;

namespace Wasp.Backend.Enums
{
    public enum ItemCondition
    {
        Unknown = 0,
        New,
        Used,
        Refurbished
    }

    public enum ItemStatus
    {
        Active = 0,
        InUse,
        Retired,
        UnderMaintenance
    }

    public enum ItemType
    {
        Weapon = 0,
        Part,
        Accessory
    }

    public enum PlatformType
    {
        Airsoft = 0,
        RealSteel,
        TrainingReplica,
        Other
    }

    public enum MaintenancePriority
    {
        Low = 0,
        Medium,
        High,
        Critical
    }

    public enum ActivityAction
    {
        Created = 0,
        Updated,
        StatusChanged,
        MaintenanceLogged,
        MaintenanceUpdated
    }
}
