// 🦈 Shark Bot Dashboard - Charts & Analytics
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    initAnalytics();
    
    console.log('📊 Charts Module Loaded!');
});

// Chart Initialization
function initCharts() {
    initCommandsChart();
    initUsageTrendsChart();
    initServerDistributionChart();
    
    // Update charts every 5 minutes
    setInterval(() => {
        updateAllCharts();
    }, 300000);
}

// Commands Usage Chart
function initCommandsChart() {
    const ctx = document.getElementById('commandsChart');
    if (!ctx) return;
    
    const commandsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['/shark', '/image', '/humour', '/servers', '/gay', '/troll', 'Autres'],
            datasets: [{
                data: [1247, 892, 634, 456, 389, 234, 156],
                backgroundColor: [
                    'rgba(78, 205, 196, 0.8)',
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(255, 217, 61, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(149, 165, 166, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 205, 196, 1)',
                    'rgba(74, 144, 226, 1)',
                    'rgba(255, 217, 61, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(149, 165, 166, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 22, 40, 0.9)',
                    titleColor: 'rgba(255, 255, 255, 1)',
                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(78, 205, 196, 0.5)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed * 100) / total).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000
            }
        }
    });
    
    window.commandsChart = commandsChart;
}

// Usage Trends Chart
function initUsageTrendsChart() {
    const ctx = document.getElementById('usageTrendsChart');
    if (!ctx) return;
    
    // Generate sample data for the last 24 hours
    const labels = [];
    const commandData = [];
    const userActivity = [];
    const errorRate = [];
    
    for (let i = 23; i >= 0; i--) {
        const hour = new Date();
        hour.setHours(hour.getHours() - i);
        labels.push(hour.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        
        // Simulate realistic usage patterns
        const baseActivity = Math.sin((23 - i) * Math.PI / 12) * 50 + 100; // Peak during day
        commandData.push(Math.max(0, baseActivity + (Math.random() - 0.5) * 40));
        userActivity.push(Math.max(0, baseActivity * 1.5 + (Math.random() - 0.5) * 60));
        errorRate.push(Math.max(0, Math.random() * 10));
    }
    
    const usageTrendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Commandes',
                    data: commandData,
                    borderColor: 'rgba(78, 205, 196, 1)',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(78, 205, 196, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 4
                },
                {
                    label: 'Activité Utilisateurs',
                    data: userActivity,
                    borderColor: 'rgba(74, 144, 226, 1)',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(74, 144, 226, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 4
                },
                {
                    label: 'Taux d\'Erreur',
                    data: errorRate,
                    borderColor: 'rgba(255, 107, 107, 1)',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(255, 107, 107, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: 20,
                        font: {
                            size: 13
                        },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 22, 40, 0.95)',
                    titleColor: 'rgba(255, 255, 255, 1)',
                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(78, 205, 196, 0.5)',
                    borderWidth: 1,
                    cornerRadius: 10,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxTicksLimit: 12
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        beginAtZero: true
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    window.usageTrendsChart = usageTrendsChart;
    
    // Time period selector
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            updateUsageTrendsChart(period);
        });
    });
}

// Server Distribution Chart
function initServerDistributionChart() {
    const ctx = document.getElementById('serverDistributionChart');
    if (!ctx) return;
    
    const serverDistributionChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Gaming', 'Communauté', 'NSFW', 'Développement', 'Éducation', 'Autres'],
            datasets: [{
                data: [45, 32, 18, 25, 12, 8],
                backgroundColor: [
                    'rgba(78, 205, 196, 0.7)',
                    'rgba(74, 144, 226, 0.7)',
                    'rgba(255, 107, 107, 0.7)',
                    'rgba(255, 217, 61, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(149, 165, 166, 0.7)'
                ],
                borderColor: [
                    'rgba(78, 205, 196, 1)',
                    'rgba(74, 144, 226, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(255, 217, 61, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(149, 165, 166, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 22, 40, 0.9)',
                    titleColor: 'rgba(255, 255, 255, 1)',
                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(78, 205, 196, 0.5)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed * 100) / total).toFixed(1);
                            return `${context.label}: ${context.parsed} serveurs (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        backdropColor: 'transparent'
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500
            }
        }
    });
    
    window.serverDistributionChart = serverDistributionChart;
}

// Analytics Functions
function initAnalytics() {
    // Real-time analytics updates
    setInterval(() => {
        updateAnalyticsData();
    }, 60000); // Update every minute
    
    // Initialize performance metrics
    initPerformanceMetrics();
}

function updateUsageTrendsChart(period) {
    const chart = window.usageTrendsChart;
    if (!chart) return;
    
    let labels = [];
    let commandData = [];
    let userActivity = [];
    let errorRate = [];
    
    switch (period) {
        case '24h':
            // 24 hours data (hourly)
            for (let i = 23; i >= 0; i--) {
                const hour = new Date();
                hour.setHours(hour.getHours() - i);
                labels.push(hour.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
                
                const baseActivity = Math.sin((23 - i) * Math.PI / 12) * 50 + 100;
                commandData.push(Math.max(0, baseActivity + (Math.random() - 0.5) * 40));
                userActivity.push(Math.max(0, baseActivity * 1.5 + (Math.random() - 0.5) * 60));
                errorRate.push(Math.max(0, Math.random() * 10));
            }
            break;
            
        case '7d':
            // 7 days data (daily)
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(day.getDate() - i);
                labels.push(day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }));
                
                const baseActivity = 200 + Math.random() * 100;
                commandData.push(baseActivity);
                userActivity.push(baseActivity * 1.8);
                errorRate.push(Math.random() * 15);
            }
            break;
            
        case '30d':
            // 30 days data (daily, showing every 3rd day)
            for (let i = 29; i >= 0; i -= 3) {
                const day = new Date();
                day.setDate(day.getDate() - i);
                labels.push(day.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }));
                
                const baseActivity = 150 + Math.random() * 150;
                commandData.push(baseActivity);
                userActivity.push(baseActivity * 2);
                errorRate.push(Math.random() * 20);
            }
            break;
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = commandData;
    chart.data.datasets[1].data = userActivity;
    chart.data.datasets[2].data = errorRate;
    
    chart.update('active');
}

function updateAllCharts() {
    // Update commands chart with new data
    if (window.commandsChart) {
        const chart = window.commandsChart;
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(value => 
            Math.max(0, value + Math.floor(Math.random() * 10) - 5)
        );
        chart.update('none');
    }
    
    // Update server distribution with slight variations
    if (window.serverDistributionChart) {
        const chart = window.serverDistributionChart;
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(value => 
            Math.max(1, value + Math.floor(Math.random() * 3) - 1)
        );
        chart.update('none');
    }
}

function updateAnalyticsData() {
    // Update top commands with random increments
    const commandRanks = document.querySelectorAll('.command-rank');
    commandRanks.forEach(rank => {
        const countElement = rank.querySelector('.command-count');
        const currentCount = parseInt(countElement.textContent.replace(/,/g, ''));
        
        if (Math.random() < 0.4) { // 40% chance to increment
            const increment = Math.floor(Math.random() * 5) + 1;
            const newCount = currentCount + increment;
            countElement.textContent = newCount.toLocaleString();
            
            // Animate the increment
            countElement.style.color = 'rgba(78, 205, 196, 1)';
            setTimeout(() => {
                countElement.style.color = '';
            }, 1000);
        }
    });
}

function initPerformanceMetrics() {
    // Monitor chart rendering performance
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.name.includes('chart') && entry.duration > 100) {
                console.warn(`🐌 Slow chart rendering: ${entry.name} took ${entry.duration}ms`);
                
                // Reduce chart complexity if performance is poor
                if (entry.duration > 500) {
                    optimizeChartPerformance();
                }
            }
        });
    });
    
    observer.observe({ entryTypes: ['measure'] });
}

function optimizeChartPerformance() {
    // Reduce animation duration for better performance
    const charts = [window.commandsChart, window.usageTrendsChart, window.serverDistributionChart];
    
    charts.forEach(chart => {
        if (chart && chart.options.animation) {
            chart.options.animation.duration = 500; // Reduce from default
            chart.update('none');
        }
    });
    
    console.log('📊 Chart performance optimized');
}

// Real-time Data Simulation
function startRealTimeSimulation() {
    // Simulate real-time command usage
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
            simulateCommandUsage();
        }
    }, 10000);
    
    // Simulate server joins/leaves
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            simulateServerChange();
        }
    }, 30000);
}

function simulateCommandUsage() {
    const commands = ['/shark', '/image', '/humour', '/servers', '/gay', '/troll'];
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    
    // Update commands chart
    if (window.commandsChart) {
        const chart = window.commandsChart;
        const commandIndex = chart.data.labels.indexOf(randomCommand);
        
        if (commandIndex !== -1) {
            chart.data.datasets[0].data[commandIndex]++;
            chart.update('none');
        }
    }
    
    // Add to activity feed
    if (window.DashboardAPI) {
        const users = ['@GamerPro', '@SharkFan', '@BotLover', '@RandomUser', '@TestUser'];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        window.DashboardAPI.addActivityItem({
            type: 'command',
            message: `Utilisateur ${randomUser} a utilisé ${randomCommand}`,
            time: 'À l\'instant'
        });
    }
}

function simulateServerChange() {
    if (window.serverDistributionChart) {
        const chart = window.serverDistributionChart;
        const randomIndex = Math.floor(Math.random() * chart.data.datasets[0].data.length);
        
        // Randomly add or remove a server
        const change = Math.random() < 0.7 ? 1 : -1; // 70% chance to add, 30% to remove
        chart.data.datasets[0].data[randomIndex] = Math.max(0, chart.data.datasets[0].data[randomIndex] + change);
        
        chart.update('none');
        
        // Update server count in quick stats
        const serverCount = document.getElementById('serverCount');
        if (serverCount) {
            const currentCount = parseInt(serverCount.textContent);
            serverCount.textContent = Math.max(0, currentCount + change);
        }
    }
}

// Export chart functions
window.ChartsAPI = {
    updateUsageTrendsChart,
    updateAllCharts,
    optimizeChartPerformance,
    startRealTimeSimulation
};

// Start real-time simulation after page load
setTimeout(startRealTimeSimulation, 5000);

// Chart.js global configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.backgroundColor = 'rgba(255, 255, 255, 0.05)';

// Custom Chart.js plugins
Chart.register({
    id: 'sharkTheme',
    beforeDraw: function(chart) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        
        // Add subtle shark-themed background pattern
        if (chart.config.type === 'line') {
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(78, 205, 196, 0.05)');
            gradient.addColorStop(1, 'rgba(10, 22, 40, 0.1)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        }
    }
});

console.log('📊 Charts initialized with Shark theme!');
