function getNextTimePeriod() {
    const now = new Date();
    const day = now.getDay();
    let times;

    if (day === 1) {
        times = [
            "08:45", "09:00", "10:00", "11:00", "11:20", "12:20", "13:25", "14:05", "15:10"
        ];
    } else if (day === 3) {
        times = [
            "08:45", "09:45", "10:45", "11:05", "12:10", "13:00", "14:05", "14:45", "15:10"
        ];
    } else if (day >= 2 && day <= 5) {
        times = [
            "08:45", "09:50", "10:55", "11:15", "12:20", "13:25", "13:45", "14:05", "15:10"
        ];
    } else {
        times = ["08:45"];
        const mondayMinutes = 8 * 60 + 45;
        const daysUntilMonday = (1 + 7 - day) % 7 || 7;
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
        const [firstHours, firstMinutes] = times[0].split(':').map(Number);
        const firstTimeMinutes = firstHours * 60 + firstMinutes;
        const firstTimeMilliseconds = firstTimeMinutes * 60 * 1000;
        return (24 * 60 * 60 * 1000 - nowMilliseconds) + firstTimeMilliseconds;
    } else {
        return "No scheduled times for today.";
    }
}

function formatTime(milliseconds, showMilliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = milliseconds % 1000;
    return showMilliseconds 
        ? `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s ${remainingMilliseconds}ms`
        : `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const toggleMilliseconds = document.getElementById('toggleMilliseconds').checked;
    const result = getNextTimePeriod();
    if (typeof result === "number") {
        const formattedTime = formatTime(result, toggleMilliseconds);
        timerElement.textContent = `Next Period is in ${formattedTime}.`;
        const totalMinutes = Math.floor(result / 60000);
        document.title = `${totalMinutes}m`;
    } else {
        timerElement.textContent = result;
        document.title = result;
    }
}

setInterval(updateTimer, 10);
updateTimer();
