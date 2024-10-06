function lotkaVolterra(t, z, params) {
    const [N1, N2] = z;
    const [r1, K1, a12, r2, K2, a21] = params;
    const dN1dt = r1 * N1 * (K1 - N1 - (a12 * N2)) / K1;
    const dN2dt = r2 * N2 * (K2 - N2 - (a21 * N1)) / K2;
    return [dN1dt, dN2dt];
}

function generateTrajectory(N1, N2, r1, K1, r2, K2, a12, a21) {
    const tSpan = [0, 100];
    const tEval = Array.from({length: 500}, (_, i) => i * 0.2);
    const params = [r1, K1, a12, r2, K2, a21];

    let trajectoryN1 = [N1];
    let trajectoryN2 = [N2];

    for (let t = 0; t < tEval.length - 1; t++) {
        const z = lotkaVolterra(t, [trajectoryN1[t], trajectoryN2[t]], params);
        trajectoryN1.push(trajectoryN1[t] + z[0] * (tEval[t + 1] - tEval[t]));
        trajectoryN2.push(trajectoryN2[t] + z[1] * (tEval[t + 1] - tEval[t]));
    }

    return {trajectoryN1, trajectoryN2};
}

function generatePlot() {
    const initial_N1 = parseFloat(document.getElementById("N1").value);
    const initial_N2 = parseFloat(document.getElementById("N2").value);
    const r1 = parseFloat(document.getElementById("r1").value);
    const K1 = parseFloat(document.getElementById("K1").value);
    const r2 = parseFloat(document.getElementById("r2").value);
    const K2 = parseFloat(document.getElementById("K2").value);
    const a12 = parseFloat(document.getElementById("a12").value);
    const a21 = parseFloat(document.getElementById("a21").value);

    const {trajectoryN1, trajectoryN2} = generateTrajectory(initial_N1, initial_N2, r1, K1, r2, K2, a12, a21);

    const trace1 = {
        x: trajectoryN1,
        y: trajectoryN2,
        mode: 'lines',
        name: 'Trajectory',
        line: {color: 'red'}
    };

    const trace2 = {
        x: [K1 - (a12 * initial_N2), K1],
        y: [initial_N2, K2 - (a21 * initial_N1)],
        mode: 'lines',
        name: 'Isocline N1',
        line: {color: 'blue'}
    };

    const trace3 = {
        x: [0, K1],
        y: [K2, K2 - (a21 * K1)],
        mode: 'lines',
        name: 'Isocline N2',
        line: {color: 'green'}
    };

    const layout = {
        title: 'Lotka-Volterra Competition Model',
        xaxis: {title: 'N1'},
        yaxis: {title: 'N2'},
        showlegend: true,
        width: 800,
        height: 600,
        paper_bgcolor: '#f4f4f4',
        plot_bgcolor: '#ffffff',
    };

    Plotly.newPlot('plot', [trace1, trace2, trace3], layout);

    // Plot trajectory over time
    const trajectoryPlotLayout = {
        title: 'Population Over Time',
        xaxis: {title: 'Time'},
        yaxis: {title: 'Population'},
        width: 800,
        height: 400,
        paper_bgcolor: '#f4f4f4',
        plot_bgcolor: '#ffffff',
    };

    const traceN1 = {
        x: Array.from({length: trajectoryN1.length}, (_, i) => i * 0.2),
        y: trajectoryN1,
        mode: 'lines',
        name: 'Species 1 Population',
        line: {color: 'orange'}
    };

    const traceN2 = {
        x: Array.from({length: trajectoryN2.length}, (_, i) => i * 0.2),
        y: trajectoryN2,
        mode: 'lines',
        name: 'Species 2 Population',
        line: {color: 'purple'}
    };

    // Continue plotting the trajectory over time
    Plotly.newPlot('trajectory-plot', [traceN1, traceN2], trajectoryPlotLayout);

    // Show download button after generating plot
    document.getElementById("download-btn").style.display = "inline";
}

// Function to download the plot
function downloadPlot() {
    Plotly.downloadImage('plot', {format: 'png', width: 800, height: 600, filename: 'lotka_volterra_plot'});
}

// Event listeners for buttons
document.getElementById("generate-btn").addEventListener("click", generatePlot);
document.getElementById("download-btn").addEventListener("click", downloadPlot);

