export const mockMessages = [
  {
    id: "1",
    platform: "discord",
    sender: "Alex Chen",
    content:
      "Hey! Are we still on for the project meeting tomorrow? I have some new ideas to share about the UI design.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    unread: true,
    priority: "normal",
    attachments: 0
  },
  {
    id: "2",
    platform: "groupme",
    sender: "GroupMe App",
    subject: "Location Reminder",
    content:
      "You&apos;re near the grocery store! Don&apos;t forget to pick up milk, eggs, and bread for dinner tonight.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    unread: true,
    priority: "high",
    attachments: 0
  },
  {
    id: "3",
    platform: "slack",
    sender: "Sarah Johnson",
    subject: "Q4 Budget Review",
    content:
      "The quarterly budget review is scheduled for Friday at 2 PM. Please prepare your department&apos;s expense reports and projections.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    unread: false,
    priority: "high",
    attachments: 2
  },
  {
    id: "4",
    platform: "remind",
    sender: "Ms. Rodriguez",
    subject: "Assignment Due Tomorrow",
    content:
      "Reminder: Your research paper on renewable energy is due tomorrow by 11:59 PM. Please submit it through the online portal.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    unread: false,
    priority: "high",
    attachments: 1
  },
  {
    id: "5",
    platform: "discord",
    sender: "Gaming Squad",
    content:
      "Anyone up for a quick game tonight? We need one more player for our ranked match. Let me know if you&apos;re interested!",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    unread: false,
    priority: "low",
    attachments: 0
  },
  {
    id: "6",
    platform: "slack",
    sender: "IT Support",
    subject: "System Maintenance",
    content:
      "Scheduled maintenance will occur this weekend from 2 AM to 6 AM. Some services may be temporarily unavailable.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    unread: false,
    priority: "normal",
    attachments: 0
  },
  {
    id: "7",
    platform: "groupme",
    sender: "GroupMe App",
    subject: "Daily Check-in",
    content:
      "Good morning! You&apos;ve successfully checked in at the office. Have a productive day ahead!",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    unread: false,
    priority: "low",
    attachments: 0
  },
  {
    id: "8",
    platform: "discord",
    sender: "Emma Wilson",
    content:
      "Thanks for helping me with the code review yesterday! The suggestions you made really improved the performance.",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    unread: false,
    priority: "normal",
    attachments: 0
  },
  {
    id: "9",
    platform: "remind",
    sender: "Dr. Martinez",
    subject: "Lab Session Cancelled",
    content:
      "Tomorrow&apos;s chemistry lab session has been cancelled due to equipment maintenance. We&apos;ll reschedule for next week.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    unread: false,
    priority: "normal",
    attachments: 0
  },
  {
    id: "10",
    platform: "slack",
    sender: "Marketing Team",
    subject: "Campaign Results",
    content:
      "Great news! Our latest marketing campaign exceeded expectations with a 25% increase in engagement. Full report attached.",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    unread: false,
    priority: "normal",
    attachments: 3
  },
  {
    id: "11",
    platform: "groupme",
    sender: "GroupMe App",
    subject: "Weekly Summary",
    content:
      "This week you visited 12 locations and completed 8 location-based tasks. Keep up the great work!",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    unread: false,
    priority: "low",
    attachments: 0
  },
  {
    id: "12",
    platform: "discord",
    sender: "Study Group",
    content:
      "Study session for the upcoming exam is scheduled for Saturday at 3 PM in the library. Bring your notes and questions!",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    unread: false,
    priority: "normal",
    attachments: 1
  }
]
