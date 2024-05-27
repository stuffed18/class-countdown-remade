function getNextTimePeriod() {
    const times = [
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
    
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (let time of times) {
        const [hours, minutes] = time.split(':').map(Number);
        const timeMinutes = hours * 60 + minutes;
        if (timeMinutes > nowMinutes) {
            return timeMinutes - nowMinutes;
        }
    }
    
    // If no future time found, return the minutes until the first time period the next day
    const firstTimeMinutes = parseInt(times[0].split(':')[0]) * 60 + parseInt(times[0].split(':')[1]);
    return (24 * 60 - nowMinutes) + firstTimeMinutes;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const minutesLeft = getNextTimePeriod();
    timerElement.textContent = `Next period is in ${minutesLeft} minutes.`;
}

setInterval(updateTimer, 1000);
updateTimer();
