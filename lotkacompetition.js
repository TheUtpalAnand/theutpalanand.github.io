document.getElementById('modelForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const r1 = parseFloat(document.getElementById('a11').value);
    const r2 = parseFloat(document.getElementById('a22').value);
    const K1 = parseFloat(document.getElementById('b12').value);
    const K2 = parseFloat(document.getElementById('b21').value);
    const N1 = parseFloat(document.getElementById('n1').value);
    const N2 = parseFloat(document.getElementById('n2').value);
    const totalTime = parseFloat(document.getElementById('time').value);

    // Placeholder for your backend logic (this should be replaced with an actual fetch to your Python backend)
    const timeSteps = totalTime; // Adjust this based on your model's requirements
    const time = [...Array(timeSteps).keys()]; // Time array

    // Here you'd implement a call to your backend and receive the population data
    // For now, let's simulate some data for demonstration
    const populationData1 = Array.from({ length: timeSteps }, (_, t) => N1 * Math.exp(r1 * t)); // Simulated data for N1
    const populationData2 = Array.from({ length: timeSteps }, (_, t) => N2 * Math.exp(r2 * t)); // Simulated data for N2

    // Generate Population vs Time Chart
    const ctx1 = document.getElementById('populationChart').getContext('2d');
    const populationChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Population of Species 1',
                data: populationData1,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            },
            {
                label: 'Population of Species 2',
                data: populationData2,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Generate N1 vs N2 Chart
    const ctx2 = document.getElementById('n1n2Chart').getContext('2d');
    const n1n2Chart = new Chart(ctx2, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'N1 vs N2',
                data: time.map(t => ({ x: populationData1[t], y: populationData2[t] })),
                backgroundColor: 'rgba(255, 206, 86, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Population of Species 1 (N1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Population of Species 2 (N2)'
                    }
                }
            }
        }
    });
});
