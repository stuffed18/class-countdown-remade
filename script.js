function getNextTimePeriod() {
    const now = new Date();
    const day = now.getDay();
    let times;

    if (day === 1) {
        // Monday
        times = [
            "08:45", // 8:45 AM
            "09:00", // 9:00 AM
            "10:00", // 10:00 AM
            "11:00", // 11:00 AM
            "11:20", // 11:20 AM
            "12:20", // 12:20 PM
            "13:25", // 1:25 PM
            "14:05", // 2:05 PM
            "15:10"  // 3:10 PM
        ];
    } else if (day === 3) {
        // Wednesday
        times = [
            "08:45",
            "09:45",
            "10:45",
            "11:05",
            "12:10",
            "13:00",
            "14:05",
            "14:45",
            "15:10"
        ];
    } else if (day >= 2 && day <= 5) {
        // Tuesday, Thursday, and Friday
        times = [
            "08:45",
            "09:50",
            "10:55",
            "11:15",
            "12:20",
            "13:25",
            "13:45",
            "14:05",
            "15:10"
        ];
    } else {
        // Weekend (Saturday and Sunday) - Calculate time until first period on Monday
        times = ["08:45"];  // First time period on Monday
        const mondayMinutes = 8 * 60 + 45; // 8:45 AM on Monday
        const daysUntilMonday = (1 + 7 - day) % 7 || 7; // Days until next Monday
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const nowSeconds = nowMinutes * 60 + now.getSeconds();
        const nowMilliseconds = nowSeconds * 1000 + now.getMilliseconds();
        const secondsUntilMonday = daysUntilMonday * 24 * 60 * 60 * 1000 - nowMilliseconds;
        return secondsUntilMonday + mondayMinutes * 60 * 1000;
    }

    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const nowSeconds = nowMinutes * 60 + now.getSeconds();
    const nowMilliseconds = nowSeconds * 1000 + now.getMilliseconds();

    for (let time of times) {
        const [hours, minutes] = time.split(':').map(Number);
        const timeMinutes = hours * 60 + minutes;
        const timeMilliseconds = timeMinutes * 60 * 1000;

        if (timeMilliseconds > nowMilliseconds) {
            return timeMilliseconds - nowMilliseconds;
        }
    }

    if (times.length > 0) {
        // If no future time found, return the milliseconds until the first time period the next day
        const [firstHours, firstMinutes] = times[0].split(':').map(Number);
        const firstTimeMinutes = firstHours * 60 + firstMinutes;
        const firstTimeMilliseconds = firstTimeMinutes * 60 * 1000;
        return (24 * 60 * 60 * 1000 - nowMilliseconds) + firstTimeMilliseconds;
    } else {
        return "No scheduled times for today.";
    }
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = milliseconds % 1000;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s ${remainingMilliseconds}ms`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const result = getNextTimePeriod();
    if (typeof result === "number") {
        timerElement.textContent = `Next time period is in ${formatTime(result)}.`;
    } else {
        timerElement.textContent = result;
    }
}

setInterval(updateTimer, 10); // Update every 10 milliseconds for better performance
updateTimer();
