// Pricing constants for all products
const PRICING = {
    workers: {
        requests: {
            free_tier: 1000000,
            cost_per_million: 0.15
        },
        cpu: {
            free_tier: 400000,
            cost_per_million: 0.12
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
            free_tier: 1000000,
            cost_per_million: 0.50
        },
        writes: {
            free_tier: 1000000,
            cost_per_million: 5.00
        },
        deletes: {
            free_tier: 1000000,
            cost_per_million: 5.00
        },
        lists: {
            free_tier: 1000000,
            cost_per_million: 5.00
        },
        storage: {
            free_tier: 1,
            cost_per_gb: 0.50
        }
    },
    d1: {
        reads: {
            free_tier: 500000,
            cost_per_million: 0.10
        },
        writes: {
            free_tier: 100000,
            cost_per_million: 0.50
        },
        storage: {
            free_tier: 5,
            cost_per_gb: 0.20
        }
    },
    durableObjects: {
        requests: {
            cost_per_million: 0.15
        },
        duration: {
            cost_per_million_gb_s: 0.12
        }
    },
    aiGateway: {
        logs: {
            cost_per_thousand: 0.05
        }
    },
    vectorize: {
        queries: {
            cost_per_million_dimensions: 0.001
        },
        storage: {
            cost_per_dimension: 0.001
        }
    },
    cicd: {
        minutes: {
            cost_per_minute: 0.003
        }
    },
    observability: {
        events: {
            free_tier: 10000,
            cost_per_million: 50
        }
    },
    analyticsEngine: {
        datapoints: {
            free_tier: 100000,
            cost_per_million: 0.50
        },
        queries: {
            free_tier: 10000,
            cost_per_million: 5.00
        }
    },
    zaraz: {
        events: {
            free_tier: 5000000,
            cost_per_million: 0.50
        }
    }
};

// Utility function to calculate monthly usage
function getMonthlyUsage(dailyValue) {
    return dailyValue * 30;
}

// Utility function to calculate cost above free tier
function calculateCostAboveFreeTier(usage, freeTier, costPerUnit, unitSize = 1000000) {
    if (usage > freeTier) {
        return ((usage - freeTier) / unitSize) * costPerUnit;
    }
    return 0;
}

// Individual product calculation functions
function calculateWorkers() {
    const requestsPerDay = Number(document.getElementById('workers-requests').value);
    const cpuTime = Number(document.getElementById('workers-cpu').value);
    
    const monthlyRequests = getMonthlyUsage(requestsPerDay);
    const monthlyCPUTime = monthlyRequests * cpuTime;
    
    let cost = 0;
    cost += calculateCostAboveFreeTier(monthlyRequests, PRICING.workers.requests.free_tier, 
                                     PRICING.workers.requests.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyCPUTime, PRICING.workers.cpu.free_tier, 
                                     PRICING.workers.cpu.cost_per_million);
    
    document.getElementById('workers-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateR2() {
    const storage = Number(document.getElementById('r2-storage').value);
    const classA = Number(document.getElementById('r2-class-a').value);
    const classB = Number(document.getElementById('r2-class-b').value);
    
    let cost = 0;
    cost += calculateCostAboveFreeTier(storage, PRICING.r2.storage.free_tier, 
                                     PRICING.r2.storage.cost_per_gb, 1);
    
    const monthlyClassA = getMonthlyUsage(classA);
    const monthlyClassB = getMonthlyUsage(classB);
    
    cost += calculateCostAboveFreeTier(monthlyClassA, PRICING.r2.class_a.free_tier, 
                                     PRICING.r2.class_a.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyClassB, PRICING.r2.class_b.free_tier, 
                                     PRICING.r2.class_b.cost_per_million);
    
    document.getElementById('r2-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateKV() {
    const reads = Number(document.getElementById('kv-reads').value);
    const writes = Number(document.getElementById('kv-writes').value);
    const deletes = Number(document.getElementById('kv-deletes').value);
    const lists = Number(document.getElementById('kv-lists').value);
    const storage = Number(document.getElementById('kv-storage').value);
    
    let cost = 0;
    const monthlyReads = getMonthlyUsage(reads);
    const monthlyWrites = getMonthlyUsage(writes);
    const monthlyDeletes = getMonthlyUsage(deletes);
    const monthlyLists = getMonthlyUsage(lists);
    
    cost += calculateCostAboveFreeTier(monthlyReads, PRICING.workersKV.reads.free_tier, 
                                     PRICING.workersKV.reads.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyWrites, PRICING.workersKV.writes.free_tier, 
                                     PRICING.workersKV.writes.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyDeletes, PRICING.workersKV.deletes.free_tier, 
                                     PRICING.workersKV.deletes.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyLists, PRICING.workersKV.lists.free_tier, 
                                     PRICING.workersKV.lists.cost_per_million);
    cost += calculateCostAboveFreeTier(storage, PRICING.workersKV.storage.free_tier, 
                                     PRICING.workersKV.storage.cost_per_gb, 1);
    
    document.getElementById('kv-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateD1() {
    const readsPerDay = Number(document.getElementById('d1-reads').value);
    const writesPerDay = Number(document.getElementById('d1-writes').value);
    const storage = Number(document.getElementById('d1-storage').value);
    
    let cost = 0;
    const monthlyReads = getMonthlyUsage(readsPerDay);
    const monthlyWrites = getMonthlyUsage(writesPerDay);
    
    cost += calculateCostAboveFreeTier(monthlyReads, PRICING.d1.reads.free_tier, 
                                     PRICING.d1.reads.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyWrites, PRICING.d1.writes.free_tier, 
                                     PRICING.d1.writes.cost_per_million);
    cost += calculateCostAboveFreeTier(storage, PRICING.d1.storage.free_tier, 
                                     PRICING.d1.storage.cost_per_gb, 1);
    
    document.getElementById('d1-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateDO() {
    const requests = Number(document.getElementById('do-requests').value);
    const duration = Number(document.getElementById('do-duration').value);
    
    let cost = 0;
    const monthlyRequests = getMonthlyUsage(requests);
    const monthlyDuration = getMonthlyUsage(duration);
    
    cost += (monthlyRequests / 1000000) * PRICING.durableObjects.requests.cost_per_million;
    cost += (monthlyDuration / 1000000) * PRICING.durableObjects.duration.cost_per_million_gb_s;
    
    document.getElementById('do-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateAIGateway() {
    const logsPerDay = Number(document.getElementById('ai-gateway-logs').value);
    const monthlyLogs = getMonthlyUsage(logsPerDay);
    
    const cost = (monthlyLogs / 1000) * PRICING.aiGateway.logs.cost_per_thousand;
    
    document.getElementById('ai-gateway-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateVectorize() {
    const queriesPerMonth = Number(document.getElementById('vectorize-queries').value);
    const storedDimensions = Number(document.getElementById('vectorize-storage').value);
    
    let cost = 0;
    cost += (queriesPerMonth / 1000000) * PRICING.vectorize.queries.cost_per_million_dimensions;
    cost += storedDimensions * PRICING.vectorize.storage.cost_per_dimension;
    
    document.getElementById('vectorize-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateCICD() {
    const minutesPerDay = Number(document.getElementById('cicd-minutes').value);
    const monthlyMinutes = getMonthlyUsage(minutesPerDay);
    
    const cost = monthlyMinutes * PRICING.cicd.minutes.cost_per_minute;
    
    document.getElementById('cicd-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateObservability() {
    const eventsPerDay = Number(document.getElementById('obs-events').value);
    const monthlyEvents = getMonthlyUsage(eventsPerDay);
    
    const cost = calculateCostAboveFreeTier(monthlyEvents, 
                                          PRICING.observability.events.free_tier,
                                          PRICING.observability.events.cost_per_million);
    
    document.getElementById('obs-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateAnalytics() {
    const datapointsPerDay = Number(document.getElementById('analytics-datapoints').value);
    const queriesPerDay = Number(document.getElementById('analytics-queries').value);
    
    let cost = 0;
    const monthlyDatapoints = getMonthlyUsage(datapointsPerDay);
    const monthlyQueries = getMonthlyUsage(queriesPerDay);
    
    cost += calculateCostAboveFreeTier(monthlyDatapoints, 
                                     PRICING.analyticsEngine.datapoints.free_tier,
                                     PRICING.analyticsEngine.datapoints.cost_per_million);
    cost += calculateCostAboveFreeTier(monthlyQueries, 
                                     PRICING.analyticsEngine.queries.free_tier,
                                     PRICING.analyticsEngine.queries.cost_per_million);
    
    document.getElementById('analytics-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateZaraz() {
    const eventsPerDay = Number(document.getElementById('zaraz-events').value);
    const monthlyEvents = getMonthlyUsage(eventsPerDay);
    
    const cost = calculateCostAboveFreeTier(monthlyEvents, 
                                          PRICING.zaraz.events.free_tier,
                                          PRICING.zaraz.events.cost_per_million);
    
    document.getElementById('zaraz-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

// Function to update total cost
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
