/**
 * Attendance & 30-Day Day-Locking Tracking Service
 */
exports.calculateProgress = (startDate, attendanceRecords = [], durationDays = 30) => {
  const now = new Date();
  const start = new Date(startDate);
  
  // Calculate elapsed days since cohort started
  const diffTime = Math.max(0, now.setHours(0,0,0,0) - start.setHours(0,0,0,0));
  const elapsedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Current unlocked day capped at duration (30)
  const currentDay = Math.min(elapsedDays + 1, durationDays);
  
  // Days attended
  const attendedCount = attendanceRecords.filter((r) => r.attended).length;
  
  const completionRate = Math.round((attendedCount / currentDay) * 100);
  const cohortProgress = Math.round((currentDay / durationDays) * 100);
  
  return {
    currentDay,
    totalDays: durationDays,
    attendedCount,
    completionRate,
    cohortProgress,
    isCompleted: currentDay >= durationDays,
  };
};
