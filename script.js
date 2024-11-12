document.getElementById('pricingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const requestsPerDay = parseFloat(document.getElementById('requests').value);
    const cpuTimeMs = parseFloat(document.getElementById('cpuTime').value);
    
    // Calculate monthly requests
    const monthlyRequests = requestsPerDay * 30;
    
    // Pricing tiers (example rates)
    const REQUEST_RATE = 0.0000005; // $0.50 per million requests
    const CPU_RATE = 0.00000001; // $0.01 per million ms of CPU time
    
    // Calculate costs
    const requestCost = monthlyRequests * REQUEST_RATE;
    const cpuCost = monthlyRequests * cpuTimeMs * CPU_RATE;
    const totalCost = requestCost + cpuCost;
    
    // Display results
    document.getElementById('totalPrice').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('breakdown').innerHTML = `
        <p>Requests cost: $${requestCost.toFixed(2)}</p>
        <p>CPU time cost: $${cpuCost.toFixed(2)}</p>
        <p>Monthly requests: ${monthlyRequests.toLocaleString()}</p>
    `;
});
