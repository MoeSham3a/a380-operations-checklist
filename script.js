// ===========================
// State Management
// ===========================
let tasks = [];
let currentFilter = 'all';
let currentTheme = 'dark';
let currentChecklist = 'preflight';
let departureTime = null;
let reminderShown = false;
let clockInterval = null;
let reminderInterval = null;
let timelineDisplayMode = 'utc'; // 'utc' or 'local'

// FDP Calculator State
let isAcclimatised = true;

// FDP Table Data - Two or More Flight Crew (Acclimatised)
// Automatically generated from two-or-more-flight-crew-acclimatised.xlsx
const FDP_TABLE_ACCLIMATISED = [
    {
        timeRange: "0600-0759",
        sectors: {
            "1": 13,
            "2": 12.25,
            "3": 11.5,
            "4": 10.75,
            "5": 10,
            "6": 9.5,
            "7": 9,
            "8": 9
        }
    },
    {
        timeRange: "0800-1259",
        sectors: {
            "1": 14,
            "2": 13.25,
            "3": 12.5,
            "4": 11.75,
            "5": 11,
            "6": 10.5,
            "7": 10,
            "8": 9.5
        }
    },
    {
        timeRange: "1300-1759",
        sectors: {
            "1": 13,
            "2": 12.25,
            "3": 11.5,
            "4": 10.75,
            "5": 10,
            "6": 9.5,
            "7": 9,
            "8": 9
        }
    },
    {
        timeRange: "1800-2159",
        sectors: {
            "1": 12,
            "2": 11.25,
            "3": 10.5,
            "4": 9.75,
            "5": 9,
            "6": 9,
            "7": 9,
            "8": 9
        }
    },
    {
        timeRange: "2200-0559",
        sectors: {
            "1": 11,
            "2": 10.25,
            "3": 9.5,
            "4": 9,
            "5": 9,
            "6": 9,
            "7": 9,
            "8": 9
        }
    }
];

// FDP Table Data - Two or More Flight Crew (Non-Acclimatised)
// Automatically generated from two-or-more-flight-crew-not-acclimatised.xlsx
const FDP_TABLE_NON_ACCLIMATISED = [
    {
        restCategory: "up to 18 hours or over 30 hours",
        sectors: {
            "1": 13,
            "2": 12.25,
            "3": 11.5,
            "4": 10.75,
            "5": 10,
            "6": 9.25,
            "7": 9.25
        }
    },
    {
        restCategory: "between 18 and 30 hours",
        sectors: {
            "1": 11.5,
            "2": 11,
            "3": 10.5,
            "4": 9.75,
            "5": 9,
            "6": 9,
            "7": 9
        }
    }
];

// FDP Extension state
let restType = 'bunk'; // 'bunk' or 'seat'

// Checklist item information database
const checklistInfo = {
    'Brake Temp': {
        title: 'Brake Temperature Cooling Chart',
        content: `
            <img src="Brake-cooling-table.JPG" alt="Brake Cooling Table" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    'NOTOC': {
        title: 'Emergency Response Guide for Dangerous Goods',
        content: `
            <img src="ERG.JPG" alt="ERG" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    'Briefing': {
        title: 'Departure Briefing',
        content: `
            <img src="Departure-briefing.JPG" alt="Departure Briefing" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    'Fuel Figures': {
        title: 'Fuel discrepancy table',
        content: `
            <img src="Fuel-difference-table.JPG" alt="Fuel discrepancy table" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    'PA (USA spec)': {
        title: 'Passenger Announcements',
        content: `
            <img src="Pre-departure-PA.JPG" alt="Pre-departure PA" style="width: 100%; max-width: 600px; border-radius: 8px;">
            <span>USA specific</span>
            <img src="USA-PA.JPG" alt="USA PA" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    // Add more items as needed
};

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
const utcClockElement = document.getElementById('utc-clock');
const localClockElement = document.getElementById('local-clock');
const departureTimeInput = document.getElementById('departure-time');
// ===========================
// Initialize App
// ===========================
function init() {
    loadThemeFromStorage();
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    attachEventListeners();

    // Modal event listeners
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('info-modal');
    const overlay = modal?.querySelector('.modal-overlay');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            closeInfoModal();
            closeToolkit();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeInfoModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeInfoModal();
        }
    });
    // Start UTC clock
    startUTCClock();

    // Load and setup departure time
    loadDepartureTime();
    loadTimelineDisplayMode();
    setupDepartureTimeListener();
    updateTimeline(); // Initial timeline update

    // Start reminder checker
    startReminderChecker();

    // Start timeline updates
    startTimelineUpdates();

    // Register service worker for offline functionality
    registerServiceWorker();

    // Setup network status monitoring
    setupNetworkMonitoring();
}

// ===========================
// Service Worker & Network Detection
// ===========================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('[App] Service Worker registered successfully');

                // Check for updates immediately
                checkForUpdates(registration);

                // Check for updates every 5 minutes
                setInterval(() => checkForUpdates(registration), 5 * 60 * 1000);

                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker is ready
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.error('[App] Service Worker registration failed:', error);
            });

        // Reload page when new service worker takes control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }
}

function checkForUpdates(registration) {
    if (!navigator.onLine) {
        console.log('[App] Offline - skipping update check');
        return;
    }

    if (registration) {
        registration.update().catch(err => {
            console.log('[App] Update check failed:', err);
        });
    }

    // Also check version via fetch
    fetch('./manifest.json', {
        headers: { 'x-version-check': 'true' },
        cache: 'no-cache'
    })
        .then(response => response.json())
        .then(data => {
            // You can add version checking logic here if needed
            console.log('[App] Version check complete');
        })
        .catch(err => {
            console.log('[App] Version check failed (offline or network error)');
        });
}

function setupNetworkMonitoring() {
    // Initial status
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
}

function handleOnlineStatus() {
    console.log('[App] Back online');
    updateOnlineStatus();

    // Check for updates when coming back online
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration) {
                checkForUpdates(registration);
            }
        });
    }
}

function handleOfflineStatus() {
    console.log('[App] Gone offline');
    updateOnlineStatus();
}

function updateOnlineStatus() {
    const offlineIndicator = document.querySelector('.offline-indicator');
    const footerText = document.querySelector('.footer-text');

    if (navigator.onLine) {
        if (offlineIndicator) {
            offlineIndicator.style.color = '#10b981'; // Green
        }
        if (footerText) {
            footerText.innerHTML = '<span class="offline-indicator">●</span> Online • Data saved locally';
        }
    } else {
        if (offlineIndicator) {
            offlineIndicator.style.color = '#f59e0b'; // Orange
        }
        if (footerText) {
            footerText.innerHTML = '<span class="offline-indicator">●</span> Offline • Using cached data';
        }
    }
}

function showUpdateNotification() {
    // Check if notification already exists
    if (document.querySelector('.update-notification')) {
        return;
    }

    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <span class="update-icon">🔄</span>
            <div class="update-text">
                <strong>Update Available</strong>
                <p>A new version is ready to install</p>
            </div>
            <button class="update-btn" onclick="refreshApp()">Update Now</button>
            <button class="dismiss-btn" onclick="dismissUpdate()">Later</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function refreshApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration && registration.waiting) {
                // Tell the service worker to skip waiting
                registration.waiting.postMessage('SKIP_WAITING');
            } else {
                // Just reload
                window.location.reload();
            }
        });
    } else {
        window.location.reload();
    }
}

function dismissUpdate() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Make functions globally accessible
window.refreshApp = refreshApp;
window.dismissUpdate = dismissUpdate;


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

    tasks.push(task); // Add to end of array
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
    const hasInfo = checklistInfo[task.text] || checklistInfo[task.text.split('/')[0]?.trim()];
    const infoIcon = hasInfo ? `<span class="info-icon" onclick='openInfoModal("${task.text}")'>ℹ️</span>` : '';

    return `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHtml(task.text)}${infoIcon}</span>
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

// Modal functions
function openInfoModal(itemName) {
    const modal = document.getElementById('info-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (checklistInfo[itemName]) {
        title.textContent = checklistInfo[itemName].title;
        body.innerHTML = checklistInfo[itemName].content;
        modal.classList.remove('hidden');
    }
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.classList.add('hidden');
}

// Make globally accessible
window.openInfoModal = openInfoModal;

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
// UTC Clock & Departure Time
// ===========================
function startUTCClock() {
    function updateClock() {
        const now = new Date();

        // UTC Time
        const utcHours = String(now.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');

        if (utcClockElement) {
            utcClockElement.textContent = `${utcHours}:${utcMinutes}:${utcSeconds}`;
        }

        // Local Time
        const localHours = String(now.getHours()).padStart(2, '0');
        const localMinutes = String(now.getMinutes()).padStart(2, '0');
        const localSeconds = String(now.getSeconds()).padStart(2, '0');

        if (localClockElement) {
            localClockElement.textContent = `${localHours}:${localMinutes}:${localSeconds}`;
        }
    }

    updateClock(); // Initial update
    clockInterval = setInterval(updateClock, 1000);
}

function setupDepartureTimeListener() {
    if (departureTimeInput) {
        departureTimeInput.addEventListener('change', (e) => {
            departureTime = e.target.value;
            reminderShown = false; // Reset reminder when time changes
            saveDepartureTime();
            updateTimeline(); // Update timeline when STD changes
        });
    }
}

function saveDepartureTime() {
    try {
        localStorage.setItem('departure-time', departureTime || '');
    } catch (error) {
        console.error('Error saving departure time:', error);
    }
}

function loadDepartureTime() {
    try {
        const saved = localStorage.getItem('departure-time');
        if (saved && departureTimeInput) {
            departureTime = saved;
            departureTimeInput.value = saved;
        }
    } catch (error) {
        console.error('Error loading departure time:', error);
    }
}

function startReminderChecker() {
    reminderInterval = setInterval(checkForReminder, 10000); // Check every 10 seconds
}

function checkForReminder() {
    if (!departureTime || reminderShown) return;

    const now = new Date();
    const [hours, minutes] = departureTime.split(':').map(Number);

    // Create departure time in UTC today
    const departure = new Date();
    departure.setUTCHours(hours, minutes, 0, 0);

    // Calculate 20 minutes before departure
    const reminderTime = new Date(departure.getTime() - 20 * 60 * 1000);

    // Check if current time is within 30 seconds of reminder time
    const timeDiff = Math.abs(now - reminderTime);

    if (timeDiff < 30000) { // Within 30 seconds
        showAPUReminder();
        reminderShown = true;
    }
}

function showAPUReminder() {
    // Create reminder notification
    const notification = document.createElement('div');
    notification.className = 'reminder-notification';
    notification.innerHTML = `
        <h3>⚠️ APU START REMINDER</h3>
        <p><strong>20 minutes to departure</strong></p>
        <p>Time to start the APU</p>
        <button onclick="closeReminder(this)">ACKNOWLEDGE</button>
    `;

    document.body.appendChild(notification);
}

function closeReminder(button) {
    const notification = button.closest('.reminder-notification');
    if (notification) {
        notification.remove();
    }
}

// Make globally accessible
window.closeReminder = closeReminder;

// ===========================
// Timeline Management
// ===========================
function updateTimeline() {
    const timelineSection = document.getElementById('timeline-section');

    if (!departureTime || !timelineSection) {
        if (timelineSection) {
            timelineSection.classList.add('hidden');
        }
        return;
    }

    // Show timeline section
    timelineSection.classList.remove('hidden');

    // Parse STD time
    const [stdHours, stdMinutes] = departureTime.split(':').map(Number);

    // Calculate current time until departure
    const now = new Date();
    const departure = new Date();
    departure.setUTCHours(stdHours, stdMinutes, 0, 0);
    const minutesUntilDeparture = Math.floor((departure - now) / (1000 * 60));

    // Timeline configuration
    const timelineStart = -85;  // Timeline starts 85 minutes before STD
    const timelineEnd = 0;      // Timeline ends at STD
    const timelineRange = timelineEnd - timelineStart;

    // Get all milestone time elements
    const milestones = document.querySelectorAll('.timeline-milestone');

    milestones.forEach(milestone => {
        const offset = parseInt(milestone.getAttribute('data-offset')) || 0;
        const timeElement = milestone.querySelector('.milestone-time');

        if (!timeElement) return;

        // Calculate absolute time based on STD + offset
        const milestoneDate = new Date();
        milestoneDate.setUTCHours(stdHours, stdMinutes, 0, 0);
        milestoneDate.setMinutes(milestoneDate.getMinutes() + offset);

        // Format time based on display mode
        let timeString;
        if (timelineDisplayMode === 'utc') {
            const hours = String(milestoneDate.getUTCHours()).padStart(2, '0');
            const minutes = String(milestoneDate.getUTCMinutes()).padStart(2, '0');
            timeString = `${hours}:${minutes}`;
        } else {
            const hours = String(milestoneDate.getHours()).padStart(2, '0');
            const minutes = String(milestoneDate.getMinutes()).padStart(2, '0');
            timeString = `${hours}:${minutes}`;
        }

        timeElement.textContent = timeString;

        // Position milestone along the timeline
        const position = ((offset - timelineStart) / timelineRange) * 100;
        milestone.style.left = `${position}%`;

        // Mark as completed if we've passed this milestone
        if (minutesUntilDeparture <= offset) {
            milestone.classList.add('completed');
        } else {
            milestone.classList.remove('completed');
        }
    });

    // Update timeline progress indicator
    updateTimelineProgress();
}

function updateTimelineProgress() {
    if (!departureTime) return;

    const progressBar = document.getElementById('timeline-progress');
    if (!progressBar) return;

    const now = new Date();
    const [stdHours, stdMinutes] = departureTime.split(':').map(Number);

    // Create departure time today
    const departure = new Date();
    departure.setUTCHours(stdHours, stdMinutes, 0, 0);

    // Start of timeline (85 minutes before departure)
    const timelineStart = new Date(departure.getTime() - 85 * 60 * 1000);

    // Calculate progress percentage
    const totalDuration = 85 * 60 * 1000; // 85 minutes in milliseconds
    const elapsed = now - timelineStart;
    const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

    progressBar.style.width = `${progress}%`;
}

function toggleTimelineDisplay() {
    // Toggle between UTC and Local
    timelineDisplayMode = timelineDisplayMode === 'utc' ? 'local' : 'utc';

    // Update button text
    const toggleText = document.getElementById('timeline-toggle-text');
    if (toggleText) {
        toggleText.textContent = timelineDisplayMode.toUpperCase();
    }

    // Save preference
    try {
        localStorage.setItem('timeline-display-mode', timelineDisplayMode);
    } catch (error) {
        console.error('Error saving timeline display mode:', error);
    }

    // Update timeline display
    updateTimeline();
}

function loadTimelineDisplayMode() {
    try {
        const saved = localStorage.getItem('timeline-display-mode');
        if (saved === 'utc' || saved === 'local') {
            timelineDisplayMode = saved;
            const toggleText = document.getElementById('timeline-toggle-text');
            if (toggleText) {
                toggleText.textContent = timelineDisplayMode.toUpperCase();
            }
        }
    } catch (error) {
        console.error('Error loading timeline display mode:', error);
    }
}

function startTimelineUpdates() {
    // Update timeline progress every 10 seconds
    setInterval(() => {
        if (departureTime) {
            updateTimelineProgress();
        }
    }, 10000);
}

// Make timeline functions globally accessible
window.toggleTimelineDisplay = toggleTimelineDisplay;
window.updateTimeline = updateTimeline;


// ===========================
// Toolkit Functions
// ===========================
let currentToolkit = null;

function openToolkit(toolType) {
    const modal = document.getElementById('toolkit-modal');
    const allPanels = document.querySelectorAll('.toolkit-panel');

    // Hide all panels
    allPanels.forEach(panel => panel.classList.add('hidden'));

    // Show selected panel
    const panel = document.getElementById(`${toolType}-toolkit`);
    if (panel) {
        panel.classList.remove('hidden');
        modal.classList.remove('hidden');
        currentToolkit = toolType;

        // Setup converter listeners if opening converter
        if (toolType === 'converter') {
            setupConverterListeners();
        }

        // Setup pressure input listeners if opening density altitude
        if (toolType === 'densalt') {
            setupPressureInputs();
        }
    }
}

function closeToolkit() {
    const modal = document.getElementById('toolkit-modal');
    modal.classList.add('hidden');
    currentToolkit = null;
}

// Unit Converter Functions
function switchConverterTab(type) {
    // Update tabs
    document.querySelectorAll('.converter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.converter-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(`${type}-converter`).classList.remove('hidden');
}

function setupConverterListeners() {
    // Fuel converters
    const fuelKg = document.getElementById('fuel-kg');
    const fuelLbs = document.getElementById('fuel-lbs');
    const fuelTons = document.getElementById('fuel-tons');

    if (fuelKg && fuelLbs && fuelTons) {
        fuelKg.addEventListener('input', (e) => {
            const kg = parseFloat(e.target.value) || 0;
            fuelLbs.value = (kg * 2.20462).toFixed(2);
            fuelTons.value = (kg / 1000).toFixed(3);
        });

        fuelLbs.addEventListener('input', (e) => {
            const lbs = parseFloat(e.target.value) || 0;
            fuelKg.value = (lbs / 2.20462).toFixed(2);
            fuelTons.value = (lbs / 2204.62).toFixed(3);
        });

        fuelTons.addEventListener('input', (e) => {
            const tons = parseFloat(e.target.value) || 0;
            fuelKg.value = (tons * 1000).toFixed(2);
            fuelLbs.value = (tons * 2204.62).toFixed(2);
        });
    }

    // Distance converters
    const distNm = document.getElementById('dist-nm');
    const distKm = document.getElementById('dist-km');
    const distSm = document.getElementById('dist-sm');

    if (distNm && distKm && distSm) {
        distNm.addEventListener('input', (e) => {
            const nm = parseFloat(e.target.value) || 0;
            distKm.value = (nm * 1.852).toFixed(2);
            distSm.value = (nm * 1.15078).toFixed(2);
        });

        distKm.addEventListener('input', (e) => {
            const km = parseFloat(e.target.value) || 0;
            distNm.value = (km / 1.852).toFixed(2);
            distSm.value = (km * 0.621371).toFixed(2);
        });

        distSm.addEventListener('input', (e) => {
            const sm = parseFloat(e.target.value) || 0;
            distNm.value = (sm / 1.15078).toFixed(2);
            distKm.value = (sm / 0.621371).toFixed(2);
        });
    }

    // Temperature converters
    const tempC = document.getElementById('temp-c');
    const tempF = document.getElementById('temp-f');

    if (tempC && tempF) {
        tempC.addEventListener('input', (e) => {
            const c = parseFloat(e.target.value) || 0;
            tempF.value = ((c * 9 / 5) + 32).toFixed(1);
        });

        tempF.addEventListener('input', (e) => {
            const f = parseFloat(e.target.value) || 0;
            tempC.value = ((f - 32) * 5 / 9).toFixed(1);
        });
    }
}

// Wind Component Calculator
function calculateWind() {
    const runway = parseFloat(document.getElementById('runway-heading').value);
    const windDir = parseFloat(document.getElementById('wind-direction').value);
    const windSpeed = parseFloat(document.getElementById('wind-speed').value);

    if (isNaN(runway) || isNaN(windDir) || isNaN(windSpeed)) {
        alert('Please enter valid numbers for all fields');
        return;
    }

    // Calculate angle difference
    let angleDiff = windDir - runway;

    // Normalize to -180 to 180
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    // Convert to radians
    const angleRad = angleDiff * (Math.PI / 180);

    // Calculate components
    const headwind = Math.round(windSpeed * Math.cos(angleRad));
    const crosswind = Math.round(Math.abs(windSpeed * Math.sin(angleRad)));

    // Display results
    const headwindText = headwind >= 0 ? `${headwind} kt (Head)` : `${Math.abs(headwind)} kt (Tail)`;
    document.getElementById('headwind-result').textContent = headwindText;
    document.getElementById('crosswind-result').textContent = `${crosswind} kt`;
}

// Rate 1 Turn Calculator
function calculateRate1() {
    const tas = parseFloat(document.getElementById('tas-input').value);

    if (isNaN(tas) || tas <= 0) {
        alert('Please enter a valid True Airspeed');
        return;
    }

    // Rate 1 turn = 3° per second = 360° in 2 minutes
    // Bank angle formula: tan(bank) = (V² / (g × R))
    // For rate 1: bank ≈ (TAS / 10) + 7
    const bankAngle = Math.round((tas / 10) + 7);

    // Turn radius in nautical miles
    // R = V / (ω × 60) where ω = 3°/sec in radians
    const turnRadius = (tas / (3 * (Math.PI / 180) * 60)).toFixed(2);

    // Display results
    document.getElementById('bank-angle-result').textContent = `${bankAngle}°`;
    document.getElementById('turn-radius-result').textContent = `${turnRadius} nm`;
}

// ISA Deviation Calculator
function calculateISA() {
    const altitude = parseFloat(document.getElementById('altitude-input').value);
    const oat = parseFloat(document.getElementById('oat-input').value);

    if (isNaN(altitude) || isNaN(oat)) {
        alert('Please enter valid numbers for both Altitude and OAT');
        return;
    }

    // ISA temperature at given altitude
    // Standard: 15°C at sea level, decreasing 1.98°C per 1000 feet
    const isaTemp = 15 - ((altitude / 1000) * 1.98);

    // ISA deviation (positive = warmer than standard, negative = colder)
    const isaDev = oat - isaTemp;

    // Display results
    document.getElementById('isa-temp-result').textContent = `${isaTemp.toFixed(1)}°C`;

    const devSign = isaDev >= 0 ? '+' : '';
    const devColor = isaDev >= 0 ? '#ef4444' : '#3b82f6'; // Red for warm, blue for cold
    const devResult = document.getElementById('isa-dev-result');
    devResult.textContent = `${devSign}${isaDev.toFixed(1)}°C`;
    devResult.style.color = devColor;
}

// Density Altitude Calculator
function calculateDensityAlt() {
    const fieldElev = parseFloat(document.getElementById('field-elev-input').value) || 0;
    const altimeterInHg = parseFloat(document.getElementById('altimeter-inhg').value);
    const altimeterHpa = parseFloat(document.getElementById('altimeter-hpa').value);
    const oat = parseFloat(document.getElementById('dens-oat-input').value);

    let pressureInHg;

    // Use whichever input has a value
    if (!isNaN(altimeterInHg)) {
        pressureInHg = altimeterInHg;
        // Auto-fill hPa
        document.getElementById('altimeter-hpa').value = (altimeterInHg * 33.8639).toFixed(0);
    } else if (!isNaN(altimeterHpa)) {
        pressureInHg = altimeterHpa / 33.8639;
        // Auto-fill inHg
        document.getElementById('altimeter-inhg').value = pressureInHg.toFixed(2);
    } else {
        alert('Please enter altimeter setting in either inHg or hPa');
        return;
    }

    if (isNaN(oat)) {
        alert('Please enter Outside Air Temperature');
        return;
    }

    // Calculate pressure altitude (simple approximation: 1 inHg ≈ 1000 ft)
    const pressureAlt = Math.round(fieldElev + ((29.92 - pressureInHg) * 1000));

    // Calculate ISA temperature at pressure altitude
    const isaTemp = 15 - ((pressureAlt / 1000) * 1.98);

    // Calculate density altitude
    // DA = PA + (120 × (OAT - ISA_temp))
    const densityAlt = Math.round(pressureAlt + (120 * (oat - isaTemp)));

    // Display results
    document.getElementById('pressure-alt-result').textContent = `${pressureAlt.toLocaleString()} ft`;
    document.getElementById('density-alt-result').textContent = `${densityAlt.toLocaleString()} ft`;
}
// Setup pressure input listeners for auto-conversion
function setupPressureInputs() {
    const inHgInput = document.getElementById('altimeter-inhg');
    const hpaInput = document.getElementById('altimeter-hpa');

    if (inHgInput && hpaInput) {
        // Remove old listeners if any
        const newInHg = inHgInput.cloneNode(true);
        const newHpa = hpaInput.cloneNode(true);
        inHgInput.parentNode.replaceChild(newInHg, inHgInput);
        hpaInput.parentNode.replaceChild(newHpa, hpaInput);

        // Add fresh listeners
        newInHg.addEventListener('input', (e) => {
            const inHg = parseFloat(e.target.value);
            if (!isNaN(inHg)) {
                document.getElementById('altimeter-hpa').value = (inHg * 33.8639).toFixed(0);
            }
        });

        newHpa.addEventListener('input', (e) => {
            const hpa = parseFloat(e.target.value);
            if (!isNaN(hpa)) {
                document.getElementById('altimeter-inhg').value = (hpa / 33.8639).toFixed(2);
            }
        });
    }
}

// Make globally accessible
window.openToolkit = openToolkit;
window.closeToolkit = closeToolkit;
window.switchConverterTab = switchConverterTab;
window.calculateWind = calculateWind;
window.calculateRate1 = calculateRate1;
window.calculateISA = calculateISA;
window.calculateDensityAlt = calculateDensityAlt;

// Reset Checklist Function
function resetChecklist() {
    // Confirm before resetting
    const confirmed = confirm(
        '⚠️ Reset Checklist?\n\n' +
        'This will uncheck all items in the current checklist.\n' +
        'This action cannot be undone.\n\n' +
        'Do you want to continue?'
    );

    if (!confirmed) {
        return;
    }

    // Uncheck all tasks
    tasks.forEach(task => {
        task.completed = false;
    });

    // Save and update UI
    saveTasksToStorage();
    renderTasks();
    updateStats();

    // Show success notification (optional)
    showResetNotification();
}

function showResetNotification() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'reset-notification';
    notification.textContent = '✓ Checklist reset successfully';
    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Make globally accessible
window.resetChecklist = resetChecklist;

// ===========================
// Decision Making Checklist Functions
// ===========================
function openDecisionMakingChecklist() {
    const modal = document.getElementById('decision-making-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeDecisionMakingChecklist() {
    const modal = document.getElementById('decision-making-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Make globally accessible
window.openDecisionMakingChecklist = openDecisionMakingChecklist;
window.closeDecisionMakingChecklist = closeDecisionMakingChecklist;

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
// Auto-Update Feature
// ===========================
let updateAvailable = false;

// Check for updates on load
function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            // Check for updates
            registration.update().then(() => {
                console.log('Checked for updates');
            });

            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker is ready
                        updateAvailable = true;
                        showUpdateNotification();
                    }
                });
            });
        });

        // Listen for controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (updateAvailable) {
                window.location.reload();
            }
        });
    }
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <h3>🎉 Update Available!</h3>
            <p>A new version of A380 Operations is ready.</p>
            <button class="update-btn" onclick="applyUpdate()">Update Now</button>
            <button class="update-dismiss" onclick="dismissUpdate(this)">Later</button>
        </div>
    `;
    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
}

// Apply update
function applyUpdate() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            if (registration.waiting) {
                // Tell the waiting SW to activate
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    }
}

// Dismiss update notification
function dismissUpdate(button) {
    const notification = button.closest('.update-notification');
    notification.style.opacity = '0';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Make globally accessible
window.applyUpdate = applyUpdate;
window.dismissUpdate = dismissUpdate;

// Check for updates every 30 minutes
setInterval(checkForUpdates, 30 * 60 * 1000);

// ===========================
// Initialize on Load
// ===========================
document.addEventListener('DOMContentLoaded', init);

// ===========================
// FDP Calculator Functions
// ===========================

/**
 * Set acclimatisation status and update UI
 */
function setAcclimatisation(acclimatised) {
    isAcclimatised = acclimatised;

    // Update button states
    const yesBtn = document.getElementById('fdp-acclimatised-yes');
    const noBtn = document.getElementById('fdp-acclimatised-no');
    const startTimeGroup = document.getElementById('fdp-start-time-group');
    const restPeriodGroup = document.getElementById('fdp-rest-period-group');

    if (acclimatised) {
        yesBtn.classList.add('active');
        noBtn.classList.remove('active');
        // Show start time for acclimatised (time-based FDP)
        if (startTimeGroup) {
            startTimeGroup.style.display = 'block';
        }
        // Hide rest period selector for acclimatised
        if (restPeriodGroup) {
            restPeriodGroup.style.display = 'none';
        }
    } else {
        yesBtn.classList.remove('active');
        noBtn.classList.add('active');
        // Hide start time for non-acclimatised (rest-based FDP)
        if (startTimeGroup) {
            startTimeGroup.style.display = 'none';
        }
        // Show rest period selector for non-acclimatised
        if (restPeriodGroup) {
            restPeriodGroup.style.display = 'block';
        }
    }
}

/**
 * Get FDP time range based on local start time
 */
function getFDPTimeRange(timeString) {
    // Parse time (HH:MM format)
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    // Define time ranges in minutes from midnight
    const ranges = [
        { start: 6 * 60, end: 7 * 60 + 59, range: "0600-0759" },      // 06:00-07:59
        { start: 8 * 60, end: 12 * 60 + 59, range: "0800-1259" },     // 08:00-12:59
        { start: 13 * 60, end: 17 * 60 + 59, range: "1300-1759" },    // 13:00-17:59
        { start: 18 * 60, end: 21 * 60 + 59, range: "1800-2159" },    // 18:00-21:59
    ];

    // Check which range the time falls into
    for (const r of ranges) {
        if (totalMinutes >= r.start && totalMinutes <= r.end) {
            return r.range;
        }
    }

    // If not in any of the above ranges, it's in the night range (22:00-05:59)
    return "2200-0559";
}

/**
 * Calculate max FDP based on inputs
 */
function calculateFDP() {
    // Get input values
    const startTimeInput = document.getElementById('fdp-start-time');
    const sectorsInput = document.getElementById('fdp-sectors');
    const restPeriodSelect = document.getElementById('fdp-rest-period');
    const resultContainer = document.getElementById('fdp-result-container');
    const resultSpan = document.getElementById('fdp-result');

    if (!startTimeInput || !sectorsInput) {
        console.error('FDP input elements not found');
        return;
    }

    const startTime = startTimeInput.value;
    const sectors = parseInt(sectorsInput.value);

    // Validate inputs
    if (!startTime) {
        alert('Please select a start time');
        return;
    }

    if (isNaN(sectors) || sectors < 1) {
        alert('Please enter a valid number of sectors (minimum 1)');
        return;
    }

    // Look up FDP from table
    let maxFDP = null;

    if (isAcclimatised) {
        // Get time range for the start time
        const timeRange = getFDPTimeRange(startTime);

        // Find the matching time range entry
        const entry = FDP_TABLE_ACCLIMATISED.find(e => e.timeRange === timeRange);

        if (entry) {
            // Get FDP for this number of sectors (cap at 8 or more)
            const sectorKey = Math.min(sectors, 8).toString();
            maxFDP = entry.sectors[sectorKey];
        }
    } else {
        // Non-acclimatised: use rest period category
        if (!restPeriodSelect) {
            console.error('Rest period selector not found');
            return;
        }

        const restCategory = restPeriodSelect.value;

        // Find the matching rest category entry
        const entry = FDP_TABLE_NON_ACCLIMATISED.find(e => e.restCategory === restCategory);

        if (entry) {
            // Get FDP for this number of sectors (cap at 7 or more for non-acclimatised)
            const sectorKey = Math.min(sectors, 7).toString();
            maxFDP = entry.sectors[sectorKey];
        }
    }

    // Display result
    if (maxFDP !== null) {
        // Format FDP (convert decimal hours to hours:minutes)
        const hours = Math.floor(maxFDP);
        const minutes = Math.round((maxFDP - hours) * 60);
        const formattedFDP = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;

        resultSpan.textContent = formattedFDP;
        resultContainer.style.display = 'block';

        // Add animation
        resultContainer.classList.add('result-flash');
        setTimeout(() => {
            resultContainer.classList.remove('result-flash');
        }, 600);
    } else {
        alert('Could not calculate FDP - please check your inputs');
    }
}

/**
 * Toggle FDP extension section visibility
 */
function toggleFDPExtension() {
    const section = document.getElementById('fdp-extension-section');
    const icon = document.getElementById('fdp-ext-toggle-icon');

    if (section.style.display === 'none') {
        section.style.display = 'block';
        icon.textContent = '▼';
    } else {
        section.style.display = 'none';
        icon.textContent = '▶';
    }
}

/**
 * Set rest type for FDP extension and update display
 */
function setRestType(type) {
    restType = type;

    const bunkBtn = document.getElementById('rest-type-bunk');
    const seatBtn = document.getElementById('rest-type-seat');
    const maxDisplay = document.getElementById('fdp-ext-max-display');
    const note = document.getElementById('fdp-ext-note');

    if (type === 'bunk') {
        bunkBtn.classList.add('active');
        seatBtn.classList.remove('active');
        maxDisplay.textContent = '18h';
        note.textContent = 'Extension: 1/2 of total rest taken';
    } else {
        bunkBtn.classList.remove('active');
        seatBtn.classList.add('active');
        maxDisplay.textContent = '15h';
        note.textContent = 'Extension: 1/3 of total rest taken';
    }
}

// Make globally accessible
window.setAcclimatisation = setAcclimatisation;
window.calculateFDP = calculateFDP;
window.toggleFDPExtension = toggleFDPExtension;
window.setRestType = setRestType;

// Cleanup intervals on page unload
window.addEventListener('beforeunload', () => {
    if (clockInterval) clearInterval(clockInterval);
    if (reminderInterval) clearInterval(reminderInterval);
});

// ===========================
// Notepad Functions
// ===========================
let currentNotepadType = '';

function openNotepad(type) {
    currentNotepadType = type;
    const modal = document.getElementById('notepad-modal');
    const title = document.getElementById('notepad-title');
    const textarea = document.getElementById('notepad-textarea');

    // Set title based on type
    if (type === 'nonstandard') {
        title.textContent = '📝 Non Standard';
    } else if (type === 'clearances') {
        title.textContent = '📋 Clearances';
    }

    // Load saved content
    const savedContent = localStorage.getItem(`notepad-${type}`);
    if (savedContent) {
        textarea.value = savedContent;
    } else {
        textarea.value = '';
    }

    modal.classList.remove('hidden');
    textarea.focus();
}

function closeNotepad() {
    const modal = document.getElementById('notepad-modal');
    modal.classList.add('hidden');
    currentNotepadType = '';
}

function saveNotepad() {
    const textarea = document.getElementById('notepad-textarea');
    const content = textarea.value;

    // Save to localStorage
    localStorage.setItem(`notepad-${currentNotepadType}`, content);

    // Show notification
    showNotification('✓ Notes saved!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Make functions globally accessible
window.openNotepad = openNotepad;
window.closeNotepad = closeNotepad;
window.saveNotepad = saveNotepad;

// ===========================
// Calculator Functions
// ===========================
let calcExpression = '';

function openCalculator() {
    const modal = document.getElementById('calculator-modal');
    const display = document.getElementById('calc-display');
    calcExpression = '';
    display.value = '0';
    modal.classList.remove('hidden');
}

function closeCalculator() {
    const modal = document.getElementById('calculator-modal');
    modal.classList.add('hidden');
}

function appendToCalc(value) {
    const display = document.getElementById('calc-display');

    // Handle initial zero
    if (calcExpression === '' || calcExpression === '0') {
        if (value !== '.') {
            calcExpression = value;
        } else {
            calcExpression = '0.';
        }
    } else {
        calcExpression += value;
    }

    display.value = calcExpression;
}

function clearCalculator() {
    const display = document.getElementById('calc-display');
    calcExpression = '';
    display.value = '0';
}

function deleteLastCalc() {
    const display = document.getElementById('calc-display');
    if (calcExpression.length > 0) {
        calcExpression = calcExpression.slice(0, -1);
        display.value = calcExpression || '0';
    }
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        // Replace × with * for eval
        const expression = calcExpression.replace(/×/g, '*');
        const result = eval(expression);

        // Format result
        const formattedResult = Number.isFinite(result)
            ? (Math.abs(result) < 0.000001 && result !== 0 ? result.toExponential(6) : result.toString())
            : 'Error';

        calcExpression = formattedResult;
        display.value = formattedResult;
    } catch (error) {
        display.value = 'Error';
        calcExpression = '';
    }
}

// Make calculator functions globally accessible
window.openCalculator = openCalculator;
window.closeCalculator = closeCalculator;
window.appendToCalc = appendToCalc;
window.clearCalculator = clearCalculator;
window.deleteLastCalc = deleteLastCalc;
window.calculateResult = calculateResult;

// Initialize
init();
