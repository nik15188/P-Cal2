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
    const requestsPerDay = Number(document.getElementById('workers-requests').value);
    const cpuTime = Number(document.getElementById('workers-cpu').value);
    
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
    const storage = Number(document.getElementById('r2-storage').value);
    const classA = Number(document.getElementById('r2-class-a').value);
    const classB = Number(document.getElementById('r2-class-b').value);
    
    const monthlyClassA = getMonthlyUsage(classA);
    const monthlyClassB = getMonthlyUsage(classB);
    
    let cost = 0;
    if (storage <= PRICING.r2.storage.free_tier && 
        monthlyClassA <= PRICING.r2.class_a.free_tier && 
        monthlyClassB <= PRICING.r2.class_b.free_tier) {
        cost = 0;
    } else {
        cost += Math.max(storage - PRICING.r2.storage.free_tier, 0) * PRICING.r2.storage.cost_per_gb;
        cost += calculateCostAboveFreeTier(monthlyClassA, PRICING.r2.class_a.free_tier, 
                                         PRICING.r2.class_a.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyClassB, PRICING.r2.class_b.free_tier, 
                                         PRICING.r2.class_b.cost_per_million);
    }
    
    document.getElementById('r2-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateKV() {
    const reads = Number(document.getElementById('kv-reads').value);
    const writes = Number(document.getElementById('kv-writes').value);
    const deletes = Number(document.getElementById('kv-deletes').value);
    const lists = Number(document.getElementById('kv-lists').value);
    const storage = Number(document.getElementById('kv-storage').value);
    
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
        cost += calculateCostAboveFreeTier(monthlyReads, PRICING.workersKV.reads.paid_tier_monthly, 
                                         PRICING.workersKV.reads.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyWrites, PRICING.workersKV.writes.paid_tier_monthly, 
                                         PRICING.workersKV.writes.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyDeletes, PRICING.workersKV.deletes.paid_tier_monthly, 
                                         PRICING.workersKV.deletes.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyLists, PRICING.workersKV.lists.paid_tier_monthly, 
                                         PRICING.workersKV.lists.cost_per_million);
        cost += Math.max(storage - PRICING.workersKV.storage.free_tier, 0) * PRICING.workersKV.storage.cost_per_gb;
    }
    
    document.getElementById('kv-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateD1() {
    const readsPerDay = Number(document.getElementById('d1-reads').value);
    const writesPerDay = Number(document.getElementById('d1-writes').value);
    const storage = Number(document.getElementById('d1-storage').value);
    
    const monthlyReads = getMonthlyUsage(readsPerDay);
    const monthlyWrites = getMonthlyUsage(writesPerDay);
    
    let cost = 0;
    if (readsPerDay <= PRICING.d1.reads.free_tier_daily && 
        writesPerDay <= PRICING.d1.writes.free_tier_daily &&
        storage <= PRICING.d1.storage.free_tier) {
        cost = 0;
    } else {
        cost += calculateCostAboveFreeTier(monthlyReads, PRICING.d1.reads.paid_tier_monthly, 
                                         PRICING.d1.reads.cost_per_million);
        cost += calculateCostAboveFreeTier(monthlyWrites, PRICING.d1.writes.paid_tier_monthly, 
                                         PRICING.d1.writes.cost_per_million);
        cost += Math.max(storage - PRICING.d1.storage.free_tier, 0) * PRICING.d1.storage.cost_per_gb;
    }
    
    document.getElementById('d1-price').textContent = cost.toFixed(2);
    updateTotalCost();
}

function calculateDO() {
    const requests = Number(document.getElementById('do-requests').value);
    const duration = Number(document.getElementById('do-duration').value);
    
    if (requests === 0 && duration === 0) {
        document.getElementById('do-price').textContent = "0.00";
        updateTotalCost();
        return;
    }
    
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
    const logsPerDay = Number(document.getElementById('ai-gateway-logs').value);
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
    const queriesPerMonth = Number(document.getElementById('vectorize-queries').value);
    const storedDimensions = Number(document.getElementById('vectorize-storage').value);
    
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
    const minutesPerDay = Number(document.getElementById('cicd-minutes').value);
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
    const eventsPerDay = Number(document.getElementById('obs-events').value);
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
    const datapointsPerDay = Number(document.getElementById('analytics-datapoints').value);
    const queriesPerDay = Number(document.getElementById('analytics-queries').value);
    
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
    const eventsPerDay = Number(document.getElementById('zaraz-events').value);
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
