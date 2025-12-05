namespace Wasp.Backend.Enums
{
    /// <summary>
    /// Severity level of an activity or event.
    /// </summary>
    public enum ActivitySeverity
    {
        /// <summary>
        /// Informational message.
        /// </summary>
        Information,
        
        /// <summary>
        /// Warning message.
        /// </summary>
        Warning,
        
        /// <summary>
        /// Error message.
        /// </summary>
        Error,
        
        /// <summary>
        /// Critical error message.
        /// </summary>
        Critical,
        
        /// <summary>
        /// Debug information.
        /// </summary>
        Debug,
        
        /// <summary>
        /// Audit trail information.
        /// </summary>
        Audit
    }
}