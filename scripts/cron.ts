import { db } from '@/db';
import { tasks } from '@/db/schema';
import { addDays, isBefore } from 'date-fns';

async function checkTasks() {
  console.log('Cron Job Started: Checking upcoming tasks...');
  try {
    const allTasks = await db.select().from(tasks);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next14Days = addDays(today, 14);

    let found = false;

    allTasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      if (isBefore(dueDate, next14Days)) {
        found = true;
        console.log(`⚠️ UPCOMING TASK: [${task.category}] ${task.title} - Due on ${task.dueDate}`);
        if (task.price) {
          console.log(`   💰 Price: ${task.price} CZK`);
        }
      }
    });

    if (!found) {
      console.log('✅ No tasks due in the next 14 days.');
    }
    
    console.log('Cron Job Finished.');
  } catch (error) {
    console.error('Error during cron job:', error);
  }
}

// Execute the check immediately when run
checkTasks().then(() => process.exit(0));
