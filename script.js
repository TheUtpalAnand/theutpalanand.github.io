// Example data structure to hold the daily work logs
const workLog = [
    { date: '2024-09-21', topic: 'Physics - Quantum Mechanics', timeSpent: '3 hours' },
    { date: '2024-09-21', topic: 'Biology - Genetics', timeSpent: '2 hours' },
    { date: '2024-09-22', topic: 'Ecology - Data Analysis', timeSpent: '4 hours' }
];

// Function to render the logs on the page
function renderWorkLog() {
    const workLogContainer = document.getElementById('work-log');
    workLogContainer.innerHTML = ''; // Clear previous content

    workLog.forEach(entry => {
        const logEntryDiv = document.createElement('div');
        logEntryDiv.classList.add('log-entry');
        
        const logDate = document.createElement('h2');
        logDate.textContent = entry.date;

        const logTopic = document.createElement('p');
        logTopic.textContent = `Topic: ${entry.topic}`;

        const logTimeSpent = document.createElement('p');
        logTimeSpent.textContent = `Time Spent: ${entry.timeSpent}`;

        logEntryDiv.appendChild(logDate);
        logEntryDiv.appendChild(logTopic);
        logEntryDiv.appendChild(logTimeSpent);
        workLogContainer.appendChild(logEntryDiv);
    });
}

// Call the render function on page load
window.onload = renderWorkLog;
