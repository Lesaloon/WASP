namespace Wasp.Backend.Enums
{
    /// <summary>
    /// Status of maintenance activities.
    /// </summary>
    public enum MaintenanceStatus
    {
        /// <summary>
        /// Maintenance scheduled but not yet started.
        /// </summary>
        Scheduled,
        
        /// <summary>
        /// Maintenance in progress.
        /// </summary>
        InProgress,
        
        /// <summary>
        /// Maintenance completed successfully.
        /// </summary>
        Completed,
        
        /// <summary>
        /// Maintenance failed or encountered issues.
        /// </summary>
        Failed,
        
        /// <summary>
        /// Maintenance cancelled.
        /// </summary>
        Cancelled,
        
        /// <summary>
        /// Maintenance request pending approval.
        /// </summary>
        Pending,
        
        /// <summary>
        /// Maintenance issue has been resolved.
        /// </summary>
        Resolved
    }
}