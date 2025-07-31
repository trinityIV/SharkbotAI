// 🦈 Shark Bot Dashboard - JavaScript
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    initRealTimeUpdates();
    initActivityFeed();
    initSettings();
    initDeploymentOptions();
    
    console.log('🦈 Dashboard Loaded Successfully!');
});

// Dashboard Initialization
function initDashboard() {
    updateBotStatus();
    updateSystemHealth();
    updateAPIStatus();
    updateQuickStats();
    initLogSystem();
    
    // Update every 30 seconds
    setInterval(() => {
        updateBotStatus();
        updateSystemHealth();
        updateAPIStatus();
    }, 30000);
    
    // Update stats every 5 minutes
    setInterval(updateQuickStats, 300000);
}

// Bot Status Management
function updateBotStatus() {
    const statusDot = document.getElementById('statusDot');
    const botStatus = document.getElementById('botStatus');
    const statusMessage = document.getElementById('statusMessage');
    
    // Simulate bot status check (in real implementation, this would be an API call)
    const isOnline = Math.random() > 0.1; // 90% chance of being online
    
    if (isOnline) {
        statusDot.className = 'status-dot online';
        botStatus.textContent = '🦈 Shark Bot Online';
        statusMessage.textContent = 'Tous les systèmes opérationnels';
    } else {
        statusDot.className = 'status-dot offline';
        botStatus.textContent = '🦈 Shark Bot Offline';
        statusMessage.textContent = 'Connexion en cours...';
    }
    
    // Update last update time
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString('fr-FR');
}

// System Health Monitoring
function updateSystemHealth() {
    const cpuUsage = Math.floor(Math.random() * 60) + 10; // 10-70%
    const ramUsage = Math.floor(Math.random() * 50) + 20; // 20-70%
    const latency = Math.floor(Math.random() * 100) + 20; // 20-120ms
    
    // Update CPU
    const cpuBar = document.getElementById('cpuUsage');
    const cpuValue = document.getElementById('cpuValue');
    cpuBar.style.width = cpuUsage + '%';
    cpuValue.textContent = cpuUsage + '%';
    
    // Update RAM
    const ramBar = document.getElementById('ramUsage');
    const ramValue = document.getElementById('ramValue');
    ramBar.style.width = ramUsage + '%';
    ramValue.textContent = ramUsage + '%';
    
    // Update Latency
    const latencyBar = document.getElementById('latency');
    const latencyValue = document.getElementById('latencyValue');
    const latencyPercent = Math.min((latency / 200) * 100, 100);
    latencyBar.style.width = latencyPercent + '%';
    latencyValue.textContent = latency + 'ms';
    
    // Update health status colors
    updateHealthColors(cpuBar, cpuUsage);
    updateHealthColors(ramBar, ramUsage);
    updateHealthColors(latencyBar, latencyPercent);
    
    // Update overall system health
    const systemHealth = document.getElementById('systemHealth');
    const avgHealth = (cpuUsage + ramUsage + latencyPercent) / 3;
    
    if (avgHealth < 40) {
        systemHealth.textContent = 'Excellent';
        systemHealth.className = 'metric-status healthy';
    } else if (avgHealth < 70) {
        systemHealth.textContent = 'Bon';
        systemHealth.className = 'metric-status warning';
    } else {
        systemHealth.textContent = 'Critique';
        systemHealth.className = 'metric-status critical';
    }
}

function updateHealthColors(element, value) {
    element.className = 'health-fill';
    if (value < 40) {
        element.classList.add('good');
    } else if (value < 70) {
        element.classList.add('warning');
    } else {
        element.classList.add('critical');
    }
}

// API Status Monitoring
async function updateAPIStatus() {
    const apis = [
        { id: 'discordAPI', name: 'Discord API', url: 'https://discord.com/api/v10/gateway' },
        { id: 'cloudflareAPI', name: 'Cloudflare AI', url: 'https://api.cloudflare.com/client/v4/user' },
        { id: 'steamAPI', name: 'Steam API', url: 'https://api.steampowered.com/ISteamWebAPIUtil/GetServerInfo/v1/' }
    ];
    
    for (const api of apis) {
        const element = document.getElementById(api.id);
        
        try {
            // Simulate API check (in real implementation, use proper CORS-enabled endpoints)
            const isOnline = Math.random() > 0.05; // 95% chance of being online
            
            if (isOnline) {
                element.className = 'api-status online';
                element.innerHTML = '<i class="fas fa-check-circle"></i><span>Online</span>';
            } else {
                element.className = 'api-status offline';
                element.innerHTML = '<i class="fas fa-times-circle"></i><span>Offline</span>';
            }
        } catch (error) {
            element.className = 'api-status offline';
            element.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Error</span>';
        }
    }
}

// Quick Stats Updates
function updateQuickStats() {
    // Simulate uptime calculation
    const startTime = new Date('2024-01-01T00:00:00Z');
    const now = new Date();
    const uptime = Math.floor((now - startTime) / 1000);
    
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    
    document.getElementById('uptime').textContent = `${days}j ${hours}h ${minutes}m`;
    
    // Simulate server and user counts
    document.getElementById('serverCount').textContent = Math.floor(Math.random() * 50) + 150;
    document.getElementById('userCount').textContent = (Math.floor(Math.random() * 5000) + 15000).toLocaleString();
}

// Real-time Updates
function initRealTimeUpdates() {
    // Simulate real-time command usage updates
    setInterval(() => {
        updateCommandUsage();
    }, 10000); // Update every 10 seconds
    
    // Simulate activity feed updates
    setInterval(() => {
        addRandomActivity();
    }, 15000); // Add activity every 15 seconds
}

function updateCommandUsage() {
    const commands = [
        { name: '/shark', count: 1247 },
        { name: '/image', count: 892 },
        { name: '/humour', count: 634 },
        { name: '/servers', count: 456 },
        { name: '/gay', count: 389 }
    ];
    
    // Randomly increment command counts
    commands.forEach(cmd => {
        if (Math.random() < 0.3) { // 30% chance to increment
            cmd.count += Math.floor(Math.random() * 5) + 1;
        }
    });
    
    // Update display
    const commandRanks = document.querySelectorAll('.command-rank');
    commandRanks.forEach((rank, index) => {
        if (commands[index]) {
            const countElement = rank.querySelector('.command-count');
            const fillElement = rank.querySelector('.command-fill');
            
            countElement.textContent = commands[index].count.toLocaleString();
            
            // Update bar width based on relative usage
            const maxCount = Math.max(...commands.map(c => c.count));
            const percentage = (commands[index].count / maxCount) * 100;
            fillElement.style.width = percentage + '%';
        }
    });
}

// Activity Feed Management
function initActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    
    // Initial activities
    const initialActivities = [
        { type: 'command', message: 'Utilisateur @JohnDoe a utilisé /shark', time: '2 minutes ago' },
        { type: 'join', message: 'Bot rejoint le serveur "Gaming Paradise"', time: '5 minutes ago' },
        { type: 'command', message: 'Utilisateur @Alice a utilisé /image', time: '8 minutes ago' },
        { type: 'error', message: 'Erreur API Cloudflare (récupérée)', time: '12 minutes ago' },
        { type: 'command', message: 'Utilisateur @Bob a utilisé /servers hvh', time: '15 minutes ago' }
    ];
    
    initialActivities.forEach(activity => {
        addActivityItem(activity);
    });
    
    // Activity filter
    const activityFilter = document.getElementById('activityFilter');
    activityFilter.addEventListener('change', (e) => {
        filterActivities(e.target.value);
    });
}

function addActivityItem(activity) {
    const activityFeed = document.getElementById('activityFeed');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.dataset.type = activity.type;
    
    const iconClass = {
        command: 'fas fa-terminal',
        error: 'fas fa-exclamation-triangle',
        join: 'fas fa-plus-circle'
    }[activity.type] || 'fas fa-info-circle';
    
    activityItem.innerHTML = `
        <div class="activity-icon ${activity.type}">
            <i class="${iconClass}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-message">${activity.message}</div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `;
    
    activityFeed.insertBefore(activityItem, activityFeed.firstChild);
    
    // Keep only last 20 activities
    while (activityFeed.children.length > 20) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

function addRandomActivity() {
    const activities = [
        { type: 'command', message: 'Utilisateur @RandomUser a utilisé /shark', time: 'À l\'instant' },
        { type: 'command', message: 'Utilisateur @GamerPro a utilisé /servers', time: 'À l\'instant' },
        { type: 'join', message: 'Bot rejoint un nouveau serveur', time: 'À l\'instant' },
        { type: 'command', message: 'Utilisateur @Funny a utilisé /gay', time: 'À l\'instant' }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    addActivityItem(randomActivity);
}

function filterActivities(filter) {
    const activities = document.querySelectorAll('.activity-item');
    
    activities.forEach(activity => {
        if (filter === 'all' || activity.dataset.type === filter) {
            activity.style.display = 'flex';
        } else {
            activity.style.display = 'none';
        }
    });
}

// Log System
function initLogSystem() {
    const logsContent = document.getElementById('logsContent');
    const logSearch = document.getElementById('logSearch');
    const logLevel = document.getElementById('logLevel');
    
    // Sample logs
    const sampleLogs = [
        { timestamp: new Date().toISOString(), level: 'info', message: 'Bot started successfully' },
        { timestamp: new Date(Date.now() - 60000).toISOString(), level: 'info', message: 'Connected to Discord gateway' },
        { timestamp: new Date(Date.now() - 120000).toISOString(), level: 'warning', message: 'High memory usage detected: 78%' },
        { timestamp: new Date(Date.now() - 180000).toISOString(), level: 'info', message: 'Command /shark executed by user 123456789' },
        { timestamp: new Date(Date.now() - 240000).toISOString(), level: 'error', message: 'Failed to generate image: API rate limit exceeded' },
        { timestamp: new Date(Date.now() - 300000).toISOString(), level: 'debug', message: 'Processing message in guild 987654321' }
    ];
    
    function displayLogs(logs = sampleLogs) {
        logsContent.innerHTML = '';
        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <span class="log-timestamp">${new Date(log.timestamp).toLocaleString('fr-FR')}</span>
                <span class="log-level ${log.level}">${log.level}</span>
                <span class="log-message">${log.message}</span>
            `;
            logsContent.appendChild(logEntry);
        });
    }
    
    displayLogs();
    
    // Log filtering
    logLevel.addEventListener('change', (e) => {
        const level = e.target.value;
        const filteredLogs = level === 'all' ? sampleLogs : sampleLogs.filter(log => log.level === level);
        displayLogs(filteredLogs);
    });
    
    // Log search
    logSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredLogs = sampleLogs.filter(log => 
            log.message.toLowerCase().includes(query) ||
            log.level.toLowerCase().includes(query)
        );
        displayLogs(filteredLogs);
    });
}

// Settings Management
function initSettings() {
    // Range inputs with live updates
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueSpan = input.parentElement.querySelector('.range-value');
        
        input.addEventListener('input', (e) => {
            valueSpan.textContent = e.target.value;
        });
    });
    
    // Settings save simulation
    const settingsInputs = document.querySelectorAll('#settings input, #settings select');
    settingsInputs.forEach(input => {
        input.addEventListener('change', () => {
            showNotification('⚙️ Paramètres sauvegardés !', 'success');
        });
    });
}

// Deployment Options
function initDeploymentOptions() {
    // Add click handlers for deployment buttons
    window.showDockerInstructions = function() {
        showDeploymentModal('docker');
    };
    
    window.showCloudflareInstructions = function() {
        showDeploymentModal('cloudflare');
    };
}

function showDeploymentModal(type) {
    const modalContent = type === 'docker' ? getDockerInstructions() : getCloudflareInstructions();
    
    const modal = document.createElement('div');
    modal.className = 'deployment-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h3>${type === 'docker' ? '🐳 Déploiement Docker' : '☁️ Déploiement Cloudflare'}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${modalContent}
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
}

function getDockerInstructions() {
    return `
        <div class="deployment-instructions">
            <h4>🚀 Déploiement Docker Complet</h4>
            <p>Docker permet de déployer le bot avec toutes ses fonctionnalités :</p>
            
            <div class="instruction-step">
                <h5>1. Créer le Dockerfile</h5>
                <pre><code>FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "bot.py"]</code></pre>
            </div>
            
            <div class="instruction-step">
                <h5>2. Construire l'image</h5>
                <pre><code>docker build -t shark-bot .</code></pre>
            </div>
            
            <div class="instruction-step">
                <h5>3. Lancer le conteneur</h5>
                <pre><code>docker run -d --name shark-bot --env-file .env shark-bot</code></pre>
            </div>
            
            <div class="deployment-benefits">
                <h5>✅ Avantages Docker :</h5>
                <ul>
                    <li>🔧 Toutes les fonctionnalités disponibles</li>
                    <li>🔄 Redémarrage automatique</li>
                    <li>📊 Monitoring complet</li>
                    <li>🛡️ Isolation sécurisée</li>
                    <li>⚡ Performance optimale</li>
                </ul>
            </div>
            
            <div class="deployment-platforms">
                <h5>🌐 Plateformes recommandées :</h5>
                <div class="platform-list">
                    <div class="platform-item">
                        <strong>Railway</strong> - Déploiement automatique depuis GitHub
                    </div>
                    <div class="platform-item">
                        <strong>Render</strong> - Hébergement gratuit avec limitations
                    </div>
                    <div class="platform-item">
                        <strong>DigitalOcean</strong> - VPS avec contrôle total
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCloudflareInstructions() {
    return `
        <div class="deployment-instructions">
            <h4>☁️ Déploiement Cloudflare Workers</h4>
            <div class="warning-box">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Limitation importante :</strong> Les Cloudflare Workers ne supportent pas les connexions WebSocket persistantes requises par Discord.
            </div>
            
            <div class="instruction-step">
                <h5>🔄 Solution Alternative : Webhook Mode</h5>
                <p>Possible mais avec fonctionnalités limitées :</p>
                <ul>
                    <li>✅ Commandes slash basiques</li>
                    <li>❌ Pas de conversations continues</li>
                    <li>❌ Pas de threads privés</li>
                    <li>❌ Pas de monitoring temps réel</li>
                </ul>
            </div>
            
            <div class="instruction-step">
                <h5>📋 Implémentation Webhook (Limitée)</h5>
                <pre><code>// worker.js - Version simplifiée
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const interaction = await request.json();
      
      // Traitement basique des commandes
      if (interaction.type === 2) {
        return handleSlashCommand(interaction, env);
      }
    }
    
    return new Response('Shark Bot Webhook', { status: 200 });
  }
}</code></pre>
            </div>
            
            <div class="recommendation-box">
                <h5>🎯 Recommandation</h5>
                <p><strong>Utilisez Docker</strong> pour une expérience complète du Shark Bot avec toutes ses fonctionnalités avancées :</p>
                <ul>
                    <li>🧠 IA conversationnelle avec mémoire</li>
                    <li>🎮 Gaming intégré (serveurs CS:GO/CS2)</li>
                    <li>🔍 OSINT Steam complet</li>
                    <li>🎨 Génération d'images NSFW</li>
                    <li>📊 Dashboard de monitoring</li>
                </ul>
            </div>
            
            <div class="alternative-hosting">
                <h5>🌟 Alternatives Recommandées</h5>
                <div class="platform-list">
                    <div class="platform-item">
                        <strong>Railway + Docker</strong> - Déploiement automatique, $5/mois
                    </div>
                    <div class="platform-item">
                        <strong>Render + Docker</strong> - Plan gratuit avec limitations
                    </div>
                    <div class="platform-item">
                        <strong>VPS + Docker</strong> - Contrôle total, à partir de $5/mois
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function refreshAPIStatus() {
    const refreshBtn = document.querySelector('.refresh-btn i');
    refreshBtn.style.animation = 'spin 1s linear';
    
    updateAPIStatus();
    
    setTimeout(() => {
        refreshBtn.style.animation = '';
    }, 1000);
}

function clearLogs() {
    const logsContent = document.getElementById('logsContent');
    logsContent.innerHTML = '<div class="log-entry"><span class="log-message">Logs vidés</span></div>';
    showNotification('🗑️ Logs vidés !', 'info');
}

function downloadLogs() {
    const logs = document.querySelectorAll('.log-entry');
    let logContent = '';
    
    logs.forEach(log => {
        const timestamp = log.querySelector('.log-timestamp')?.textContent || '';
        const level = log.querySelector('.log-level')?.textContent || '';
        const message = log.querySelector('.log-message')?.textContent || '';
        logContent += `${timestamp} [${level.toUpperCase()}] ${message}\n`;
    });
    
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shark-bot-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('📥 Logs téléchargés !', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10001;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    // Set colors based on type
    const colors = {
        success: 'background: rgba(78, 205, 196, 0.9); color: white;',
        error: 'background: rgba(255, 107, 107, 0.9); color: white;',
        warning: 'background: rgba(255, 217, 61, 0.9); color: black;',
        info: 'background: rgba(74, 144, 226, 0.9); color: white;'
    };
    
    notification.style.cssText += colors[type];
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add required CSS for modals and notifications
const dashboardCSS = document.createElement('style');
dashboardCSS.textContent = `
    .deployment-modal .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .deployment-modal .modal-content {
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        margin: 2rem;
    }
    
    .deployment-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .deployment-modal .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .deployment-modal .close-btn:hover {
        opacity: 1;
    }
    
    .deployment-instructions h4 {
        color: var(--seaweed-green);
        margin-bottom: 1rem;
    }
    
    .deployment-instructions h5 {
        color: var(--foam-white);
        margin: 1.5rem 0 0.5rem;
    }
    
    .instruction-step {
        margin: 1.5rem 0;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    
    .instruction-step pre {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 5px;
        overflow-x: auto;
        margin: 0.5rem 0;
    }
    
    .instruction-step code {
        color: var(--seaweed-green);
        font-family: 'Courier New', monospace;
    }
    
    .warning-box {
        background: rgba(255, 217, 61, 0.1);
        border: 1px solid #ffd93d;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .warning-box i {
        color: #ffd93d;
    }
    
    .recommendation-box {
        background: rgba(78, 205, 196, 0.1);
        border: 1px solid var(--seaweed-green);
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .recommendation-box h5 {
        color: var(--seaweed-green);
    }
    
    .platform-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .platform-item {
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        border-left: 3px solid var(--seaweed-green);
    }
    
    .platform-item strong {
        color: var(--seaweed-green);
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(dashboardCSS);

// Export functions for global use
window.DashboardAPI = {
    updateBotStatus,
    updateSystemHealth,
    updateAPIStatus,
    refreshAPIStatus,
    clearLogs,
    downloadLogs,
    showNotification
};
