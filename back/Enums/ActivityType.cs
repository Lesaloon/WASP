namespace Wasp.Backend.Enums
{
    /// <summary>
    /// Types of activities logged in the system.
    /// </summary>
    public enum ActivityType
    {
        /// <summary>
        /// User login activity.
        /// </summary>
        Login,
        
        /// <summary>
        /// User logout activity.
        /// </summary>
        Logout,
        
        /// <summary>
        /// Item creation.
        /// </summary>
        ItemCreated,
        
        /// <summary>
        /// Item modification.
        /// </summary>
        ItemModified,
        
        /// <summary>
        /// Item deletion.
        /// </summary>
        ItemDeleted,
        
        /// <summary>
        /// Part installation.
        /// </summary>
        PartInstalled,
        
        /// <summary>
        /// Part removal.
        /// </summary>
        PartRemoved,
        
        /// <summary>
        /// Accessory installation.
        /// </summary>
        AccessoryInstalled,
        
        /// <summary>
        /// Accessory removal.
        /// </summary>
        AccessoryRemoved,
        
        /// <summary>
        /// Maintenance log entry.
        /// </summary>
        MaintenanceLogged,
        
        /// <summary>
        /// Tag assignment.
        /// </summary>
        TagAssigned,
        
        /// <summary>
        /// Tag removal.
        /// </summary>
        TagRemoved,
        
        /// <summary>
        /// System configuration change.
        /// </summary>
        SystemConfigChanged,
        
        /// <summary>
        /// Data import activity.
        /// </summary>
        DataImported,
        
        /// <summary>
        /// Data export activity.
        /// </summary>
        DataExported,
        
        /// <summary>
        /// Other system activities.
        /// </summary>
        Other
    }
}