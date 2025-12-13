// ===========================
// State Management
// ===========================
let tasks = [];
let currentFilter = 'all';
let currentTheme = 'dark';
let currentChecklist = 'preflight';

// ===========================
// DOM Elements
// ===========================
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const nextChecklistBtn = document.getElementById('next-checklist-btn');
const checklistTitle = document.getElementById('checklist-title');

// ===========================
// Initialize App
// ===========================
function init() {
    loadThemeFromStorage();
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    attachEventListeners();

    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(error => console.log('Service Worker registration failed:', error));
    }
}

// ===========================
// Event Listeners
// ===========================
function attachEventListeners() {
    // Add task on button click
    addBtn.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set current filter and re-render
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Next checklist button
    if (nextChecklistBtn) {
        nextChecklistBtn.addEventListener('click', switchChecklist);
    }
}

// ===========================
// Task Operations
// ===========================
function addTask() {
    const text = taskInput.value.trim();

    if (text === '') {
        // Shake animation for empty input
        taskInput.parentElement.style.animation = 'none';
        setTimeout(() => {
            taskInput.parentElement.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        return;
    }

    // Create new task
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        column: 1, // New tasks go to column 1 by default
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task); // Add to beginning of array
    saveTasksToStorage();

    // Clear input with smooth transition
    taskInput.value = '';
    taskInput.focus();

    // Render and update
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

function deleteTask(id) {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);

    // Fade out animation
    if (taskElement) {
        taskElement.classList.add('fade-out');
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveTasksToStorage();
            renderTasks();
            updateStats();
        }, 300);
    }
}

// ===========================
// Rendering
// ===========================
function renderTasks() {
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    // Separate tasks by column
    const column1Tasks = filteredTasks.filter(t => t.column === 1);
    const column2Tasks = filteredTasks.filter(t => t.column === 2);

    // Render both columns
    taskList.innerHTML = `
        <div class="task-column">
            ${column1Tasks.map(task => renderTaskItem(task)).join('')}
        </div>
        <div class="task-column">
            ${column2Tasks.map(task => renderTaskItem(task)).join('')}
        </div>
    `;
}

function renderTaskItem(task) {
    return `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete task">
                    🗑️
                </button>
            </div>
        </li>
    `;
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    // Animate counter updates
    animateValue(totalCount, parseInt(totalCount.textContent) || 0, total, 300);
    animateValue(completedCount, parseInt(completedCount.textContent) || 0, completed, 300);
}

// ===========================
// Local Storage
// ===========================
function saveTasksToStorage() {
    try {
        localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadTasksFromStorage() {
    try {
        const stored = localStorage.getItem('taskflow-tasks');
        if (stored) {
            tasks = JSON.parse(stored);
        } else {
            // Initialize with default A380 checklist items
            tasks = getDefaultChecklist();
            currentChecklist = 'preflight';
            saveTasksToStorage();
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        tasks = getDefaultChecklist();
    }
}

function getDefaultChecklist() {
    const now = new Date().toISOString();
    let id = Date.now();

    // First Column items
    const column1Items = [
        'Brake Temp',
        'Batt Check/ADIRS',
        'Power Up',
        'OIS',
        'TechLog/MEL',
        'A/C Conf Diff/OEB',
        'Fire Test',
        'APU Start',
        'TOPA'
    ];

    // Second Column items
    const column2Items = [
        'Security Check Form',
        'Fuel Figures',
        'NOTOC',
        'ATC CLR',
        'Briefing',
        'Cockpit Prep',
        'Loadsheet Confirmation',
        'Xcheck Avionics',
        'Tech + Cabin Logs Sign',
        'PA (USA spec)',
        'Before Start Checklist'
    ];

    const defaultTasks = [];

    // Add column 1 items
    column1Items.forEach((text, index) => {
        defaultTasks.push({
            id: id++,
            text: text,
            completed: false,
            column: 1,
            createdAt: now
        });
    });

    // Add column 2 items
    column2Items.forEach((text, index) => {
        defaultTasks.push({
            id: id++,
            text: text,
            completed: false,
            column: 2,
            createdAt: now
        });
    });

    return defaultTasks;
}

function getCruiseChecklist() {
    const now = new Date().toISOString();
    let id = Date.now();

    const cruiseItems = [
        'Systems check',
        'Fuel check',
        'Alternate Weather',
        'OEI Strategy',
        'Decompression Strategy',
        'DARD (if applicable)',
        'Track and Distance (if applicable)',
        'Dest Alternate route'
    ];

    const cruiseTasks = [];

    cruiseItems.forEach((text, index) => {
        cruiseTasks.push({
            id: id++,
            text: text,
            completed: false,
            column: 1, // All cruise items in column 1
            createdAt: now
        });
    });

    return cruiseTasks;
}

function switchChecklist() {
    // Toggle between checklists
    if (currentChecklist === 'preflight') {
        currentChecklist = 'cruise';
        tasks = getCruiseChecklist();
        checklistTitle.textContent = '✈️ Cruise Checklist';
        nextChecklistBtn.textContent = '← Back';
    } else {
        currentChecklist = 'preflight';
        tasks = getDefaultChecklist();
        checklistTitle.textContent = '✈️ Preflight Checklist';
        nextChecklistBtn.textContent = 'Next →';
    }

    saveTasksToStorage();
    renderTasks();
    updateStats();
}

// Make globally accessible
window.getDefaultChecklist = getDefaultChecklist;
window.getCruiseChecklist = getCruiseChecklist;
window.switchChecklist = switchChecklist;

// ===========================
// Theme Management
// ===========================
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveThemeToStorage();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update theme icon with animation
    if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg) scale(0)';
        setTimeout(() => {
            themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
    }
}

function saveThemeToStorage() {
    try {
        localStorage.setItem('taskflow-theme', currentTheme);
    } catch (error) {
        console.error('Error saving theme to localStorage:', error);
    }
}

function loadThemeFromStorage() {
    try {
        const stored = localStorage.getItem('taskflow-theme');
        if (stored && (stored === 'dark' || stored === 'light')) {
            currentTheme = stored;
        }
        applyTheme();
    } catch (error) {
        console.error('Error loading theme from localStorage:', error);
    }
}

// ===========================
// Utility Functions
// ===========================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Add shake animation to CSS (dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===========================
// Initialize on Load
// ===========================
document.addEventListener('DOMContentLoaded', init);
