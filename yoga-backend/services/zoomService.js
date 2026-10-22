/**
 * Zoom Service to generate and handle Zoom Live Class links
 */
exports.generateClassRoomLink = ({ className, batchTime, dayNumber, email }) => {
  // Configured meeting ID based on morning slots (6 AM, 7 AM, 8 AM)
  const slotMap = {
    '06:00': { meetingId: '89104523101', passcode: 'YOGA06' },
    '07:00': { meetingId: '89104523102', passcode: 'YOGA07' },
    '08:00': { meetingId: '89104523103', passcode: 'YOGA08' },
  };

  const slotInfo = slotMap[batchTime] || { meetingId: '89104523100', passcode: 'ESCAPE' };

  return {
    meetingId: slotInfo.meetingId,
    passcode: slotInfo.passcode,
    zoomJoinUrl: `https://zoom.us/j/${slotInfo.meetingId}?pwd=${slotInfo.passcode}`,
    webSdkDirectUrl: `https://escapeinyoga.com/live-room?session=${slotInfo.meetingId}`,
    topic: `${className} — Live Session (Day ${dayNumber})`,
  };
};
