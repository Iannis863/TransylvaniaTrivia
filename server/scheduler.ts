import { storage } from "./storage";
import { sendReminderEmail } from "./email";

function getEventTuesday(registrationDate: Date): Date {
  const regDate = new Date(registrationDate);
  const dayOfWeek = regDate.getDay();
  
  if (dayOfWeek === 2) {
    const eventTime = new Date(regDate);
    eventTime.setHours(20, 0, 0, 0);
    if (regDate < eventTime) {
      return eventTime;
    }
  }
  
  const result = new Date(regDate);
  const daysUntilTuesday = dayOfWeek <= 2 ? 2 - dayOfWeek : 9 - dayOfWeek;
  result.setDate(result.getDate() + daysUntilTuesday);
  result.setHours(20, 0, 0, 0);
  return result;
}

let lastReminderDate: string | null = null;

async function sendTodayReminders() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  if (lastReminderDate === today) {
    console.log('[Scheduler] Reminders already sent today, skipping...');
    return;
  }
  
  console.log(`[Scheduler] Sending reminder emails for quiz night on ${today}...`);
  
  try {
    const allRegistrations = await storage.getTeamRegistrations();
    
    const todayTeams = allRegistrations.filter(reg => {
      const eventDate = getEventTuesday(new Date(reg.createdAt));
      const eventKey = eventDate.toISOString().split('T')[0];
      return eventKey === today;
    });
    
    console.log(`[Scheduler] Found ${todayTeams.length} teams registered for today's quiz`);
    
    for (const team of todayTeams) {
      await sendReminderEmail(
        team.email,
        team.teamName,
        team.captainName,
        team.memberCount
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    lastReminderDate = today;
    console.log(`[Scheduler] Finished sending ${todayTeams.length} reminder emails`);
  } catch (error) {
    console.error('[Scheduler] Error sending reminder emails:', error);
  }
}

function scheduleNextReminder() {
  const now = new Date();
  const target = new Date(now);
  
  target.setHours(12, 0, 0, 0);
  
  if (now.getDay() !== 2) {
    const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7;
    target.setDate(target.getDate() + daysUntilTuesday);
  } else if (now.getHours() >= 12) {
    target.setDate(target.getDate() + 7);
  }
  
  const msUntilTarget = target.getTime() - now.getTime();
  
  console.log(`[Scheduler] Next reminder scheduled for ${target.toISOString()} (in ${Math.round(msUntilTarget / 1000 / 60)} minutes)`);
  
  setTimeout(() => {
    sendTodayReminders();
    scheduleNextReminder();
  }, msUntilTarget);
}

export function startScheduler() {
  console.log('[Scheduler] Starting reminder email scheduler...');
  
  const now = new Date();
  if (now.getDay() === 2 && now.getHours() >= 12 && now.getHours() < 20) {
    console.log('[Scheduler] Server started on Tuesday after 12 PM - checking if reminders needed...');
    sendTodayReminders();
  }
  
  scheduleNextReminder();
  
  console.log('[Scheduler] Scheduler started - will send reminders every Tuesday at 12:00 PM');
}
