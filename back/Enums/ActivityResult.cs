namespace Wasp.Backend.Enums
{
    /// <summary>
    /// Result of an activity or operation.
    /// </summary>
    public enum ActivityResult
    {
        /// <summary>
        /// Operation completed successfully.
        /// </summary>
        Success,
        
        /// <summary>
        /// Operation failed.
        /// </summary>
        Failure,
        
        /// <summary>
        /// Operation was cancelled.
        /// </summary>
        Cancelled,
        
        /// <summary>
        /// Operation was skipped.
        /// </summary>
        Skipped,
        
        /// <summary>
        /// Operation is in progress.
        /// </summary>
        InProgress,
        
        /// <summary>
        /// Operation was rejected.
        /// </summary>
        Rejected,
        
        /// <summary>
        /// Operation timed out.
        /// </summary>
        Timeout,
        
        /// <summary>
        /// Operation was aborted.
        /// </summary>
        Aborted
    }
}