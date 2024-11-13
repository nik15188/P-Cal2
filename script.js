/* Base styles */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header styles */
header {
    text-align: center;
    margin-bottom: 20px;
}

/* Total cost styles */
.total-cost {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    padding: 15px 0;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

/* Navigation styles */
.category-nav {
    position: sticky;
    top: 60px;
    background-color: white;
    z-index: 99;
    padding: 10px 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-btn {
    padding: 10px 20px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 5px;
}

.category-btn.active {
    background-color: #007bff;
    color: white;
}

/* Category section styles */
.category-section {
    margin-bottom: 40px;
}

.category-section h2 {
    text-align: center;
    margin-bottom: 20px;
}

/* Product grid layout */
.category-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

/* Product card styles */
.product-card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-card h3 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

/* Input group styles */
.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

/* Button styles */
.calculate-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}

.calculate-btn:hover {
    background-color: #0056b3;
}

/* Price display styles */
.price {
    text-align: center;
    font-weight: bold;
    font-size: 1.1em;
    margin-top: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .category-section {
        grid-template-columns: 1fr;
    }
    
    .container {
        padding: 0 10px;
    }
    
    .category-nav {
        flex-wrap: wrap;
    }
}

// Pricing constants for all products
const PRICING = {
  workers: {
      requests: {
          free_tier_daily: 100000,
          paid_tier_monthly: 10000000,
          cost_per_million: 0.30
      },
      cpu: {
          free_tier: 10,
          paid_tier_monthly: 30000000,
          cost_per_million: 0.02
      }
  },
  r2: {
      storage: {
          free_tier: 10,
          cost_per_gb: 0.015
      },
      class_a: {
          free_tier: 1000000,
          cost_per_million: 4.50
      },
      class_b: {
          free_tier: 10000000,
          cost_per_million: 0.36
      }
  },
  workersKV: {
      reads: {
          free_tier_daily: 100000,
          paid_tier_monthly: 10000000,
          cost_per_million: 0.50
      },
      writes: {
          free_tier_daily: 1000,
          paid_tier_monthly: 1000000,
          cost_per_million: 5.00
      },
      deletes: {
          free_tier_daily: 1000,
          paid_tier_monthly: 1000000,
          cost_per_million: 5.00
      },
      lists: {
          free_tier_daily: 1000,
          paid_tier_monthly: 1000000,
          cost_per_million: 5.00
      },
      storage: {
          free_tier: 1,
          cost_per_gb: 0.50
      }
  },
  d1: {
      reads: {
          free_tier_daily: 5000000,
          paid_tier_monthly: 25000000000,
          cost_per_million: 0.001
      },
      writes: {
          free_tier_daily: 100000,
          paid_tier_monthly: 50000000,
          cost_per_million: 1.00
      },
      storage: {
          free_tier: 5,
          cost_per_gb: 0.75
      }
  },
  durableObjects: {
      requests: {
          paid_tier: 1000000,
          cost_per_million: 0.15
      },
      duration: {
          paid_tier: 400000,
          cost_per_million: 12.50
      }
  },
  aiGateway: {
      logs: {
          free_tier_monthly: 100000,
          paid_tier_monthly: 200000,
          cost_per_100k: 8.00
      }
  },
  vectorize: {
      queries: {
          free_tier_monthly: 30000000,
          paid_tier_monthly: 50000000,
          cost_per_million: 0.01
      },
      storage: {
          free_tier: 5000000,
          paid_tier: 10000000,
          cost_per_100million: 0.05
      }
  },
  cicd: {
      minutes: {
          free_tier_monthly: 3000,
          paid_tier_monthly: 6000,
          cost_per_minute: 0.005
      }
  },
  observability: {
      events: {
          free_tier_daily: 200000,
          paid_tier_monthly: 20000000,
          cost_per_million: 0.60
      }
  },
  analyticsEngine: {
      datapoints: {
          free_tier_daily: 100000,
          paid_tier_monthly: 10000000,
          cost_per_million: 0.25
      },
      queries: {
          free_tier_daily: 10000,
          paid_tier_monthly: 1000000,
          cost_per_million: 1.00
      }
  },
  zaraz: {
      events: {
          free_tier_monthly: 1000000,
          cost_per_million: 5.00
      }
  }
};

// Add this function at the top of your file, after the PRICING constant
function formatNumber(input) {
    // Remove existing commas and non-numeric characters except decimal point
    let value = input.value.replace(/,/g, '').replace(/[^\d]/g, '');
    
    // Format with commas if there's a value
    if (value !== '') {
        input.value = Number(value).toLocaleString('en-US');
    }
}

// Update your getMonthlyUsage function to handle formatted numbers
function getMonthlyUsage(dailyValue) {
    // Remove commas before calculation
    const cleanValue = typeof dailyValue === 'string' ? 
        Number(dailyValue.replace(/,/g, '')) : dailyValue;
    return cleanValue * 30;
}

// Add this helper function
function getCleanNumber(value) {
    return Number(String(value).replace(/,/g, ''));
}

// Utility function to calculate monthly usage
function getMonthlyUsage(dailyValue) {
  return dailyValue * 30;
}

// Utility function to calculate cost above free tier
function calculateCostAboveFreeTier(monthlyUsage, paidTierLimit, costPerUnit, unitSize = 1000000) {
  if (monthlyUsage > paidTierLimit) {
      return Math.max(Math.ceil((monthlyUsage - paidTierLimit) / unitSize) * costPerUnit, 0);
  }
  return 0;
}

function calculateWorkers() {
    const requestsPerDay = getCleanNumber(document.getElementById('workers-requests').value);
    const cpuTime = getCleanNumber(document.getElementById('workers-cpu').value);
    
    const monthlyRequests = getMonthlyUsage(requestsPerDay);
    const monthlyCPUTime = monthlyRequests * cpuTime;
    
    let cost = 0;
    if (requestsPerDay <= PRICING.workers.requests.free_tier_daily && 
        cpuTime <= PRICING.workers.cpu.free_tier) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(monthlyRequests, 
                                         PRICING.workers.requests.paid_tier_monthly, 
                                         PRICING.workers.requests.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyCPUTime, 
                                         PRICING.workers.cpu.paid_tier_monthly, 
                                         PRICING.workers.cpu.cost_per_million);
    }
    
    document.getElementById('workers-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateR2() {
    const storage = getCleanNumber(document.getElementById('r2-storage').value);
    const classA = getCleanNumber(document.getElementById('r2-class-a').value);
    const classB = getCleanNumber(document.getElementById('r2-class-b').value);
    
    const monthlyClassA = getMonthlyUsage(classA);
    const monthlyClassB = getMonthlyUsage(classB);
    
    let cost = 0;
    if (storage <= PRICING.r2.storage.free_tier && 
        monthlyClassA <= PRICING.r2.class_a.free_tier && 
        monthlyClassB <= PRICING.r2.class_b.free_tier) {
        cost = 0;
    } else {
        cost += Math.max(storage - PRICING.r2.storage.free_tier, 0) * PRICING.r2.storage.cost_per_gb;
        cost += calculateCostAboveFreeTier(monthlyClassA, 
                                         PRICING.r2.class_a.free_tier,
                                         PRICING.r2.class_a.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyClassB, 
                                         PRICING.r2.class_b.free_tier,
                                         PRICING.r2.class_b.cost_per_million);
    }
    
    document.getElementById('r2-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateKV() {
    const reads = getCleanNumber(document.getElementById('kv-reads').value);
    const writes = getCleanNumber(document.getElementById('kv-writes').value);
    const deletes = getCleanNumber(document.getElementById('kv-deletes').value);
    const lists = getCleanNumber(document.getElementById('kv-lists').value);
    const storage = getCleanNumber(document.getElementById('kv-storage').value);
    
    const monthlyReads = getMonthlyUsage(reads);
    const monthlyWrites = getMonthlyUsage(writes);
    const monthlyDeletes = getMonthlyUsage(deletes);
    const monthlyLists = getMonthlyUsage(lists);
    
    let cost = 0;
    if (reads <= PRICING.workersKV.reads.free_tier_daily &&
        writes <= PRICING.workersKV.writes.free_tier_daily &&
        deletes <= PRICING.workersKV.deletes.free_tier_daily &&
        lists <= PRICING.workersKV.lists.free_tier_daily &&
        storage <= PRICING.workersKV.storage.free_tier) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(monthlyReads, 
                                         PRICING.workersKV.reads.paid_tier_monthly,
                                         PRICING.workersKV.reads.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyWrites, 
                                         PRICING.workersKV.writes.paid_tier_monthly,
                                         PRICING.workersKV.writes.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyDeletes, 
                                         PRICING.workersKV.deletes.paid_tier_monthly,
                                         PRICING.workersKV.deletes.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyLists, 
                                         PRICING.workersKV.lists.paid_tier_monthly,
                                         PRICING.workersKV.lists.cost_per_million);
        cost += Math.max(storage - PRICING.workersKV.storage.free_tier, 0) * 
                PRICING.workersKV.storage.cost_per_gb;
    }
    
    document.getElementById('kv-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateD1() {
    const reads = getCleanNumber(document.getElementById('d1-reads').value);
    const writes = getCleanNumber(document.getElementById('d1-writes').value);
    const storage = getCleanNumber(document.getElementById('d1-storage').value);
    
    const monthlyReads = getMonthlyUsage(reads);
    const monthlyWrites = getMonthlyUsage(writes);
    
    let cost = 0;
    if (reads <= PRICING.d1.reads.free_tier_daily &&
        writes <= PRICING.d1.writes.free_tier_daily &&
        storage <= PRICING.d1.storage.free_tier) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(monthlyReads, 
                                         PRICING.d1.reads.paid_tier_monthly,
                                         PRICING.d1.reads.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyWrites, 
                                         PRICING.d1.writes.paid_tier_monthly,
                                         PRICING.d1.writes.cost_per_million);
        cost += Math.max(storage - PRICING.d1.storage.free_tier, 0) * 
                PRICING.d1.storage.cost_per_gb;
    }
    
    document.getElementById('d1-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateDO() {
    const requests = getCleanNumber(document.getElementById('do-requests').value);
    const duration = getCleanNumber(document.getElementById('do-duration').value);
    
    const monthlyRequests = getMonthlyUsage(requests);
    const monthlyDuration = getMonthlyUsage(duration);
    
    const requestCost = calculateCostAboveFreeTier(monthlyRequests,
                                                 PRICING.durableObjects.requests.paid_tier,
                                                 PRICING.durableObjects.requests.cost_per_million);
    const durationCost = calculateCostAboveFreeTier(monthlyDuration,
                                                  PRICING.durableObjects.duration.paid_tier,
                                                  PRICING.durableObjects.duration.cost_per_million);
    
    const totalCost = requestCost + durationCost;
    document.getElementById('do-price').textContent = totalCost.toFixed(2);
    updateTotalCost();
}

function calculateAIGateway() {
    const logsPerDay = getCleanNumber(document.getElementById('ai-gateway-logs').value);
    const monthlyLogs = getMonthlyUsage(logsPerDay);
    
    let cost = 0;
    if (monthlyLogs <= PRICING.aiGateway.logs.free_tier_monthly) {
        cost = 0;
    } else if (monthlyLogs <= PRICING.aiGateway.logs.paid_tier_monthly) {
        cost = 0;
    } else {
        const excessLogs = monthlyLogs - PRICING.aiGateway.logs.paid_tier_monthly;
        cost = Math.ceil(excessLogs / 100000) * PRICING.aiGateway.logs.cost_per_100k;
    }
    
    document.getElementById('ai-gateway-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateVectorize() {
    const queriesPerMonth = getCleanNumber(document.getElementById('vectorize-queries').value);
    const storedDimensions = getCleanNumber(document.getElementById('vectorize-storage').value);
    
    let cost = 0;
    if (queriesPerMonth <= PRICING.vectorize.queries.free_tier_monthly && 
        storedDimensions <= PRICING.vectorize.storage.free_tier) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(queriesPerMonth, 
                                         PRICING.vectorize.queries.paid_tier_monthly,
                                         PRICING.vectorize.queries.cost_per_million);
        cost += Math.ceil(Math.max(storedDimensions - PRICING.vectorize.storage.paid_tier, 0) / 100000000) * 
                PRICING.vectorize.storage.cost_per_100million;
    }
    
    document.getElementById('vectorize-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateCICD() {
    const minutesPerDay = getCleanNumber(document.getElementById('cicd-minutes').value);
    const monthlyMinutes = getMonthlyUsage(minutesPerDay);
    
    let cost = 0;
    if (monthlyMinutes <= PRICING.cicd.minutes.free_tier_monthly) {
        cost = 0;
    } else if (monthlyMinutes <= PRICING.cicd.minutes.paid_tier_monthly) {
        cost = 0;
    } else {
        cost = (monthlyMinutes - PRICING.cicd.minutes.paid_tier_monthly) * 
               PRICING.cicd.minutes.cost_per_minute;
    }
    
    document.getElementById('cicd-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateObservability() {
    const eventsPerDay = getCleanNumber(document.getElementById('obs-events').value);
    const monthlyEvents = getMonthlyUsage(eventsPerDay);
    
    let cost = 0;
    if (eventsPerDay <= PRICING.observability.events.free_tier_daily) {
        cost = 0;
    } else {
        cost = calculateCostAboveFreeTier(monthlyEvents, 
                                        PRICING.observability.events.paid_tier_monthly,
                                        PRICING.observability.events.cost_per_million);
    }
    
    document.getElementById('obs-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateAnalytics() {
    const datapointsPerDay = getCleanNumber(document.getElementById('analytics-datapoints').value);
    const queriesPerDay = getCleanNumber(document.getElementById('analytics-queries').value);
    
    const monthlyDatapoints = getMonthlyUsage(datapointsPerDay);
    const monthlyQueries = getMonthlyUsage(queriesPerDay);
    
    let cost = 0;
    if (datapointsPerDay <= PRICING.analyticsEngine.datapoints.free_tier_daily && 
        queriesPerDay <= PRICING.analyticsEngine.queries.free_tier_daily) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(monthlyDatapoints, 
                                         PRICING.analyticsEngine.datapoints.paid_tier_monthly,
                                         PRICING.analyticsEngine.datapoints.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyQueries, 
                                         PRICING.analyticsEngine.queries.paid_tier_monthly,
                                         PRICING.analyticsEngine.queries.cost_per_million);
    }
    
    document.getElementById('analytics-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateZaraz() {
    const eventsPerDay = getCleanNumber(document.getElementById('zaraz-events').value);
    const monthlyEvents = getMonthlyUsage(eventsPerDay);
    
    let cost = 0;
    if (monthlyEvents <= PRICING.zaraz.events.free_tier_monthly) {
        cost = 0;
    } else {
        cost = calculateCostAboveFreeTier(monthlyEvents, 
                                        PRICING.zaraz.events.free_tier_monthly,
                                        PRICING.zaraz.events.cost_per_million);
    }
    
    document.getElementById('zaraz-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function updateTotalCost() {
  const prices = document.querySelectorAll('.price span');
  let total = 0;
  
  prices.forEach(price => {
      total += Number(price.textContent);
  });
  
  document.getElementById('total-price').textContent = total.toFixed(2);
}

// Add event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const targetId = this.getAttribute('data-target');
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
              const navHeight = document.querySelector('.category-nav').offsetHeight;
              const totalCostHeight = document.querySelector('.total-cost').offsetHeight;
              const targetPosition = targetSection.offsetTop - navHeight - totalCostHeight - 20;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Add input event listeners to all number inputs
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
      input.addEventListener('input', function() {
          // Get the product card containing this input
          const productCard = this.closest('.product-card');
          if (productCard) {
              // Find and click the calculate button
              const calculateBtn = productCard.querySelector('.calculate-btn');
              if (calculateBtn) {
                  calculateBtn.click();
              }
          }
      });
  });
});
