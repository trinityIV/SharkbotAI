// 🦈 Shark Bot Commands - Interactive JavaScript
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initCommandsNavigation();
    initCommandDemos();
    initCommandSearch();
    initCommandCopy();
    
    console.log('🦈 Commands Module Loaded!');
});

// Commands Navigation
function initCommandsNavigation() {
    const navButtons = document.querySelectorAll('.cmd-nav-btn');
    const categories = document.querySelectorAll('.cmd-category');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.dataset.category;
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target category
            categories.forEach(category => {
                category.classList.remove('active');
                if (category.dataset.category === targetCategory) {
                    category.classList.add('active');
                    
                    // Animate cards in
                    const cards = category.querySelectorAll('.cmd-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    });
}

// Command Demos
function initCommandDemos() {
    const commandCards = document.querySelectorAll('.cmd-card');
    
    commandCards.forEach(card => {
        const commandName = card.querySelector('.cmd-name').textContent;
        const demoButton = createDemoButton(commandName);
        
        card.appendChild(demoButton);
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// Create Demo Button
function createDemoButton(commandName) {
    const button = document.createElement('button');
    button.className = 'demo-btn';
    button.innerHTML = '<i class="fas fa-play"></i> Démo';
    button.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, var(--seaweed-green), var(--ocean-surface));
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        runCommandDemo(commandName);
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 5px 15px rgba(78, 205, 196, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '';
    });
    
    return button;
}

// Command Demo Implementations
function runCommandDemo(commandName) {
    const demos = {
        '/shark': () => showAIDemo(),
        '/image': () => showImageDemo(),
        '/humour': () => showHumourDemo(),
        '/troll': () => showTrollDemo(),
        '/gay': () => showGayDemo(),
        '/lyrics': () => showLyricsDemo(),
        '/servers': () => showServersDemo(),
        '/steamosint': () => showOSINTDemo(),
        '/nsfw': () => showNSFWDemo(),
        '/nude': () => showNudeDemo(),
        '/dark': () => showDarkDemo()
    };
    
    const demo = demos[commandName];
    if (demo) {
        demo();
    } else {
        showGenericDemo(commandName);
    }
}

// AI Conversation Demo
function showAIDemo() {
    const modal = createDemoModal('Conversation IA', `
        <div class="demo-chat">
            <div class="chat-message user">
                <strong>Utilisateur:</strong> Explique-moi le machine learning en 2 minutes
            </div>
            <div class="chat-message bot typing">
                <strong>Shark Bot:</strong> <span class="typing-indicator">🦈 Le requin réfléchit...</span>
            </div>
        </div>
    `);
    
    setTimeout(() => {
        const botMessage = modal.querySelector('.chat-message.bot');
        botMessage.classList.remove('typing');
        botMessage.innerHTML = `
            <strong>Shark Bot:</strong> 
            <p>🧠 <strong>Machine Learning expliqué simplement :</strong></p>
            <p>Imagine que tu enseignes à un requin à reconnaître différents poissons :</p>
            <ul>
                <li>📊 <strong>Données</strong> : Tu lui montres 1000 photos de poissons étiquetées</li>
                <li>🎯 <strong>Entraînement</strong> : Il apprend les patterns (forme, couleur, taille)</li>
                <li>🔍 <strong>Prédiction</strong> : Il peut maintenant identifier de nouveaux poissons</li>
            </ul>
            <p>C'est exactement ça le ML : apprendre des patterns dans les données pour faire des prédictions ! 🦈✨</p>
        `;
    }, 2000);
}

// Image Generation Demo
function showImageDemo() {
    const modal = createDemoModal('Génération d\'Images', `
        <div class="demo-image-gen">
            <div class="prompt-input">
                <strong>Prompt:</strong> "Un requin qui code en Python dans l'océan"
            </div>
            <div class="generating">
                <div class="loading-spinner"></div>
                <p>🎨 Génération en cours...</p>
            </div>
        </div>
    `);
    
    setTimeout(() => {
        const generating = modal.querySelector('.generating');
        generating.innerHTML = `
            <div class="generated-image">
                <div class="image-placeholder">
                    🦈💻🐍
                    <p>Image générée !</p>
                    <p style="font-size: 0.8rem; opacity: 0.7;">
                        Style: Cartoon humoristique<br>
                        Résolution: 1024x1024<br>
                        Modèle: Stable Diffusion XL
                    </p>
                </div>
            </div>
        `;
    }, 3000);
}

// Humour Demo
function showHumourDemo() {
    const jokes = [
        "Pourquoi les requins ne mangent pas de clowns ? Parce que ça a un goût de poisson ! 🦈🤡",
        "Un requin entre dans un bar et dit : 'Un verre d'eau salée, s'il vous plaît !' 🦈🍺",
        "Comment appelle-t-on un requin qui fait du yoga ? Un requin zen ! 🦈🧘‍♂️"
    ];
    
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    
    createDemoModal('Humour Français', `
        <div class="demo-humour">
            <div class="joke-container">
                <h4>🎭 Blague du jour :</h4>
                <p class="joke-text">${randomJoke}</p>
                <div class="humour-stats">
                    <span class="stat">😂 Niveau: Excellent</span>
                    <span class="stat">🇫🇷 Style: Français</span>
                    <span class="stat">🦈 Thème: Requin</span>
                </div>
            </div>
        </div>
    `);
}

// Troll Demo
function showTrollDemo() {
    createDemoModal('Troll Personnalisé', `
        <div class="demo-troll">
            <div class="troll-setup">
                <p><strong>Utilisateur mentionné:</strong> @JeanDupont</p>
                <p><strong>Thème:</strong> Café</p>
            </div>
            <div class="troll-result">
                <h4>🎯 Résultat du troll :</h4>
                <div class="troll-message">
                    <p>Eh @JeanDupont ! 😏</p>
                    <p>J'ai entendu dire que tu bois ton café avec une paille... 
                    C'est pour éviter de te brûler la langue ou c'est juste ton côté sophistiqué ? ☕😂</p>
                    <p>En tout cas, même les requins boivent leur eau salée plus normalement ! 🦈</p>
                </div>
                <div class="troll-rating">
                    <span>🔥 Niveau de troll: 7/10</span>
                    <span>😄 Humour: Amical</span>
                </div>
            </div>
        </div>
    `);
}

// Gay-o-mètre Demo
function showGayDemo() {
    const percentage = Math.floor(Math.random() * 101);
    const progressBar = createProgressBar(percentage);
    
    createDemoModal('Gay-o-mètre', `
        <div class="demo-gay">
            <div class="gayometer">
                <h4>🏳️‍🌈 Analyse de gaytitude</h4>
                <div class="target-user">
                    <p><strong>Utilisateur:</strong> @ExempleUser</p>
                </div>
                <div class="percentage-display">
                    <div class="big-percentage">${percentage}%</div>
                    ${progressBar}
                </div>
                <div class="gay-comment">
                    <p>${getGayComment(percentage)}</p>
                </div>
                <div class="disclaimer">
                    <small>⚠️ Résultat 100% humoristique et déterministe basé sur l'ID utilisateur</small>
                </div>
            </div>
        </div>
    `);
}

// Servers Demo
function showServersDemo() {
    createDemoModal('Serveurs CS:GO/CS2', `
        <div class="demo-servers">
            <div class="server-category">
                <h4>🎯 Catégorie: HvH (Hack vs Hack)</h4>
            </div>
            <div class="servers-list">
                <div class="server-item">
                    <div class="server-info">
                        <strong>🦈 Shark HvH Arena</strong>
                        <p>IP: 185.244.173.25:27015</p>
                        <p>Joueurs: 18/20</p>
                    </div>
                    <button class="connect-btn" onclick="copyToClipboard('connect 185.244.173.25:27015')">
                        📋 Copier IP
                    </button>
                </div>
                <div class="server-item">
                    <div class="server-info">
                        <strong>⚡ Lightning HvH</strong>
                        <p>IP: 192.168.1.100:27015</p>
                        <p>Joueurs: 15/16</p>
                    </div>
                    <button class="connect-btn" onclick="copyToClipboard('connect 192.168.1.100:27015')">
                        📋 Copier IP
                    </button>
                </div>
            </div>
            <div class="ai-recommendation">
                <h5>🤖 Recommandation IA :</h5>
                <p>Shark HvH Arena est parfait pour toi ! Serveur stable avec une bonne communauté HvH. 
                Prépare tes configs et amuse-toi bien ! 🦈</p>
            </div>
        </div>
    `);
}

// OSINT Demo
function showOSINTDemo() {
    createDemoModal('OSINT Steam', `
        <div class="demo-osint">
            <div class="osint-input">
                <p><strong>Profil analysé:</strong> https://steamcommunity.com/id/exemple</p>
            </div>
            <div class="osint-progress">
                <div class="progress-step completed">✅ Extraction Steam ID</div>
                <div class="progress-step completed">✅ Données API Steam</div>
                <div class="progress-step completed">✅ Scraping profil</div>
                <div class="progress-step active">🔄 Analyse IA...</div>
            </div>
            <div class="osint-preview">
                <h5>📊 Aperçu des données collectées :</h5>
                <ul>
                    <li>👤 Informations profil (nom, avatar, statut)</li>
                    <li>🎮 Bibliothèque de jeux (247 jeux)</li>
                    <li>👥 Liste d'amis (156 amis)</li>
                    <li>🏆 Badges et achievements</li>
                    <li>💬 Commentaires récents</li>
                    <li>🚫 Statut VAC/Game bans</li>
                </ul>
                <p><strong>🤖 Analyse IA en cours...</strong></p>
            </div>
        </div>
    `);
}

// NSFW Demo (Safe version)
function showNSFWDemo() {
    createDemoModal('Contenu NSFW', `
        <div class="demo-nsfw">
            <div class="nsfw-warning">
                <h4>🔞 Vérification NSFW</h4>
                <div class="channel-check">
                    <p>✅ Salon Discord NSFW détecté</p>
                    <p>✅ Utilisateur majeur vérifié</p>
                    <p>✅ Permissions accordées</p>
                </div>
            </div>
            <div class="nsfw-content-preview">
                <h5>🎭 Types de contenu disponibles :</h5>
                <ul>
                    <li>💬 Humour adulte non censuré</li>
                    <li>📝 Textes provocants et osés</li>
                    <li>🖼️ Images artistiques NSFW</li>
                </ul>
                <div class="safety-note">
                    <p><strong>🛡️ Sécurité :</strong> Contenu généré uniquement dans les salons NSFW autorisés</p>
                </div>
            </div>
        </div>
    `);
}

// Helper Functions
function createDemoModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    // Add styles
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
    
    // Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    return modal;
}

function createProgressBar(percentage) {
    return `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
    `;
}

function getGayComment(percentage) {
    if (percentage === 0) return "🚫 Pas gay du tout ! Hétéro confirmé ! 👨‍👩‍👧‍👦";
    if (percentage < 20) return "😐 Très légèrement gay, presque imperceptible ! 🤏";
    if (percentage < 40) return "🤔 Un petit côté gay qui se révèle parfois ! 🌈";
    if (percentage < 60) return "😏 Moyennement gay, ça se voit un peu ! 🏳️‍🌈";
    if (percentage < 80) return "💅 Plutôt gay, ça commence à se voir ! ✨";
    if (percentage < 95) return "🌈 Très gay ! Tu rayonnes de gaytitude ! 💖";
    if (percentage < 100) return "🏳️‍🌈 ULTRA GAY ! Tu es une légende ! 👑";
    return "🌈✨ 100% GAY ABSOLU ! Tu es l'incarnation de la gaytitude ! 👑🏳️‍🌈";
}

// Command Search
function initCommandSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Rechercher une commande...';
    searchInput.className = 'command-search glass-card';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        margin: 0 auto 2rem;
        padding: 1rem;
        border: none;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
        text-align: center;
    `;
    
    const commandsSection = document.querySelector('#commands .container');
    const sectionHeader = commandsSection.querySelector('.section-header');
    sectionHeader.appendChild(searchInput);
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const commandCards = document.querySelectorAll('.cmd-card');
        
        commandCards.forEach(card => {
            const commandName = card.querySelector('.cmd-name').textContent.toLowerCase();
            const description = card.querySelector('.cmd-description').textContent.toLowerCase();
            
            if (commandName.includes(query) || description.includes(query)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 Copié dans le presse-papiers !');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(78, 205, 196, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add required CSS
const commandsCSS = document.createElement('style');
commandsCSS.textContent = `
    .demo-modal .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .demo-modal .modal-content {
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        margin: 2rem;
    }
    
    .demo-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .demo-modal .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .demo-modal .close-btn:hover {
        opacity: 1;
    }
    
    .chat-message {
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .chat-message.user {
        background: rgba(74, 144, 226, 0.2);
        margin-left: 2rem;
    }
    
    .chat-message.bot {
        background: rgba(78, 205, 196, 0.2);
        margin-right: 2rem;
    }
    
    .typing-indicator {
        animation: pulse 1.5s infinite;
    }
    
    .progress-bar {
        width: 100%;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem 0;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--seaweed-green), var(--ocean-surface));
        transition: width 2s ease;
    }
    
    .server-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        margin: 0.5rem 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    
    .connect-btn {
        padding: 0.5rem 1rem;
        background: var(--seaweed-green);
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .connect-btn:hover {
        background: var(--ocean-surface);
        transform: scale(1.05);
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(commandsCSS);

// Export for global use
window.CommandsDemo = {
    runCommandDemo,
    copyToClipboard,
    showNotification
};
