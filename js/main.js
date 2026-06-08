/* ==========================================
   Math Adventure Kids - Main JavaScript
   ========================================== */

// Game state management
const gameState = {
    currentGame: null,
    currentUser: {
        name: 'Young Mathematician',
        score: 0,
        achievements: [],
        progress: {
            counting: 45,
            addition: 30,
            subtraction: 20,
            multiplication: 10
        }
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Math Adventure Kids - Initializing...');
    initializeApp();
});

function initializeApp() {
    loadUserProfile();
    setupEventListeners();
    displayWelcomeMessage();
}

// Load user profile from localStorage
function loadUserProfile() {
    const savedProfile = localStorage.getItem('mathAdventureProfile');
    if (savedProfile) {
        gameState.currentUser = JSON.parse(savedProfile);
    }
}

// Save user profile to localStorage
function saveUserProfile() {
    localStorage.setItem('mathAdventureProfile', JSON.stringify(gameState.currentUser));
}

// Setup event listeners
function setupEventListeners() {
    const profileBtn = document.getElementById('profileBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    if (profileBtn) {
        profileBtn.addEventListener('click', showProfile);
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', showSettings);
    }
}

// Display personalized welcome message
function displayWelcomeMessage() {
    const greeting = document.getElementById('userGreeting');
    if (greeting) {
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';

        if (hour < 12) {
            timeGreeting = '🌅 Good Morning';
        } else if (hour < 18) {
            timeGreeting = '☀️ Good Afternoon';
        } else {
            timeGreeting = '🌙 Good Evening';
        }

        greeting.innerHTML = `
            <p>${timeGreeting}, ${gameState.currentUser.name}! 👋</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">You've earned ${gameState.currentUser.score} points so far. Keep it up! 🚀</p>
        `;
    }
}

// Start a game
function startGame(gameName) {
    gameState.currentGame = gameName;
    console.log(`Starting game: ${gameName}`);

    const gameMap = {
        'numberQuest': loadNumberQuest,
        'mathRaces': loadMathRaces,
        'puzzleBlocks': loadPuzzleBlocks,
        'fractionPizza': loadFractionPizza,
        'shapeExplorer': loadShapeExplorer,
        'moneyMaster': loadMoneyMaster
    };

    if (gameMap[gameName]) {
        gameMap[gameName]();
    } else {
        alert('Game not yet available! 🚀 Coming soon!');
    }
}

// Game loaders (placeholder functions)
function loadNumberQuest() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">🔢 Number Quest</div>
                <div class="game-stats">
                    <div class="stat-item">
                        <div class="stat-label">Score</div>
                        <div class="stat-value" id="gameScore">0</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Level</div>
                        <div class="stat-value" id="gameLevel">1</div>
                    </div>
                </div>
            </div>

            <div class="score-display">
                <div class="score-label">Current Score</div>
                <div class="score-number" id="totalScore">0</div>
            </div>

            <div class="game-progress">
                <div class="progress-label">Progress: Question <span id="currentQuestion">1</span>/5</div>
                <div class="progress-bar-game">
                    <div class="progress-bar-game-fill" id="progressFill" style="width: 20%;"></div>
                </div>
            </div>

            <div class="question-area">
                <div class="question-text" id="questionText">Which number is bigger? 5 or 3?</div>
                <div class="options-container" id="optionsContainer">
                    <button class="option-btn" onclick="selectAnswer(this)">3</button>
                    <button class="option-btn" onclick="selectAnswer(this)">5</button>
                </div>
            </div>

            <div class="feedback" id="feedback"></div>

            <div class="game-controls">
                <button class="btn-next" id="nextBtn" style="display:none;" onclick="nextQuestion()">Next Question →</button>
                <button class="btn-back" onclick="backToHome()">← Back to Home</button>
            </div>
        </div>
    `;

    initializeNumberQuestGame();
}

function loadMathRaces() {
    alert('🏃 Math Races - Coming Soon!\n\nSpeed challenges in arithmetic are on the way!');
    backToHome();
}

function loadPuzzleBlocks() {
    alert('🧩 Puzzle Blocks - Coming Soon!\n\nSolve math puzzles for rewards!');
    backToHome();
}

function loadFractionPizza() {
    alert('🍕 Fraction Pizza - Coming Soon!\n\nLearn fractions through pizza slices!');
    backToHome();
}

function loadShapeExplorer() {
    alert('🔷 Shape Explorer - Coming Soon!\n\nDiscover geometry concepts!');
    backToHome();
}

function loadMoneyMaster() {
    alert('💰 Money Master - Coming Soon!\n\nLearn real-world math with money!');
    backToHome();
}

// Number Quest Game Implementation
let numberQuestState = {
    currentQuestionIndex: 0,
    score: 0,
    answered: false,
    questions: [
        { question: 'Which number is bigger? 5 or 3?', options: ['3', '5'], correct: '5' },
        { question: 'Count the stars: ⭐⭐⭐⭐', options: ['3', '4', '5'], correct: '4' },
        { question: 'Which comes after 7?', options: ['6', '8', '9'], correct: '8' },
        { question: 'Which is the smallest? 9, 4, 7', options: ['9', '4', '7'], correct: '4' },
        { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' }
    ]
};

function initializeNumberQuestGame() {
    numberQuestState = {
        currentQuestionIndex: 0,
        score: 0,
        answered: false,
        questions: [
            { question: 'Which number is bigger? 5 or 3?', options: ['3', '5'], correct: '5' },
            { question: 'Count the stars: ⭐⭐⭐⭐', options: ['3', '4', '5'], correct: '4' },
            { question: 'Which comes after 7?', options: ['6', '8', '9'], correct: '8' },
            { question: 'Which is the smallest? 9, 4, 7', options: ['9', '4', '7'], correct: '4' },
            { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' }
        ]
    };

    displayNumberQuestQuestion();
}

function displayNumberQuestQuestion() {
    if (numberQuestState.currentQuestionIndex >= numberQuestState.questions.length) {
        endNumberQuestGame();
        return;
    }

    const question = numberQuestState.questions[numberQuestState.currentQuestionIndex];
    numberQuestState.answered = false;

    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = numberQuestState.currentQuestionIndex + 1;
    document.getElementById('totalScore').textContent = numberQuestState.score;
    document.getElementById('progressFill').style.width = ((numberQuestState.currentQuestionIndex + 1) / numberQuestState.questions.length * 100) + '%';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('feedback').classList.remove('show');

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = function() { selectAnswer(this); };
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button) {
    if (numberQuestState.answered) return;

    numberQuestState.answered = true;
    const selectedAnswer = button.textContent;
    const correctAnswer = numberQuestState.questions[numberQuestState.currentQuestionIndex].correct;
    const feedback = document.getElementById('feedback');

    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
        numberQuestState.score += 10;
        feedback.textContent = '✨ Correct! Great job! ✨';
        feedback.classList.add('correct', 'show');
    } else {
        button.classList.add('incorrect');
        feedback.textContent = `❌ Not quite! The correct answer is ${correctAnswer}`;
        feedback.classList.add('incorrect', 'show');
    }

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });

    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('totalScore').textContent = numberQuestState.score;
}

function nextQuestion() {
    numberQuestState.currentQuestionIndex++;
    displayNumberQuestQuestion();
}

function endNumberQuestGame() {
    const container = document.querySelector('.game-container');
    const finalScore = numberQuestState.score;
    const maxScore = numberQuestState.questions.length * 10;
    const percentage = (finalScore / maxScore * 100).toFixed(0);

    let resultMessage = '🎉 Awesome job!';
    let stars = '⭐⭐⭐';

    if (percentage < 50) {
        resultMessage = '💪 Keep practicing!';
        stars = '⭐';
    } else if (percentage < 80) {
        resultMessage = '🌟 Good work!';
        stars = '⭐⭐';
    }

    container.innerHTML = `
        <div class="result-screen celebration">
            <div class="result-title">${resultMessage}</div>
            <div class="result-message">You completed Number Quest!</div>
            <div class="stars-earned">${stars}</div>
            <div class="final-score">${finalScore} / ${maxScore} Points</div>
            <div class="result-message" style="font-size: 1.1rem;">Score: ${percentage}%</div>
            <div class="game-controls" style="margin-top: 2rem;">
                <button class="btn-restart" onclick="startGame('numberQuest')">Play Again 🔄</button>
                <button class="btn-back" onclick="backToHome()">Back Home 🏠</button>
            </div>
        </div>
    `;

    // Update user profile
    gameState.currentUser.score += finalScore;
    gameState.currentUser.progress.counting += 5;
    saveUserProfile();
}

// Navigation functions
function backToHome() {
    location.reload();
}

function showProfile() {
    alert(`👤 Your Profile\n\nName: ${gameState.currentUser.name}\nTotal Score: ${gameState.currentUser.score}\n\nKeep playing to earn more points! 🚀`);
}

function showSettings() {
    const name = prompt('Enter your name (or leave blank to keep current):', gameState.currentUser.name);
    if (name && name.trim() !== '') {
        gameState.currentUser.name = name;
        saveUserProfile();
        displayWelcomeMessage();
        alert('✨ Profile updated! Welcome, ' + name + '!');
    }
}

console.log('Math Adventure Kids - Loaded Successfully! 🎉');
