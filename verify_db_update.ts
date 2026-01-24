
import { UserService } from './src/services/UserService';
import { database } from './src/db';

async function testUpdate() {
    console.log("Starting test...");

    // 1. Get current user
    let user = await UserService.getCurrentUser();
    if (!user) {
        console.log("No user found. Creating one.");
        user = await UserService.createGuestUser();
    }

    console.log("Current notifications:", user.notifications);

    // 2. Toggle dailyTips
    const currentVal = user.notifications?.dailyTips ?? true;
    const newVal = !currentVal;

    console.log(`Toggling dailyTips from ${currentVal} to ${newVal}`);

    const newNotifs = { ...user.notifications, dailyTips: newVal };

    // 3. Update
    await UserService.updateUser({ notifications: newNotifs });

    // 4. Fetch again
    const userAgain = await UserService.getCurrentUser();
    console.log("Fetched notifications after update:", userAgain.notifications);

    if (userAgain.notifications.dailyTips === newVal) {
        console.log("SUCCESS: Value updated correctly.");
    } else {
        console.log("FAILURE: Value did not update.");
    }
}

testUpdate().catch(err => console.error(err));
