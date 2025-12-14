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

// Checklist item information database
const checklistInfo = {
    'Brake Temp': {
        title: 'Brake Temperature Cooling Chart',
        content: `
            <img src="brake-cooling-table.JPG" alt="Brake Cooling Table" style="width: 100%; max-width: 600px; border-radius: 8px;">
        `
    },
    'NOTOC': {
        title: 'Emergnecy Response Guide for Dangerous Goods',
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
        title: 'Fuel discripancy table',
        content: `
            <img src="Fuel-difference-table.JPG" alt="Fuel discripancy table" style="width: 100%; max-width: 600px; border-radius: 8px;">
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
    setupDepartureTimeListener();

    // Start reminder checker
    startReminderChecker();

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

    // Play audio alert if available
    try {
        const audio = new Audio('data:audio/wav;base64,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');
        audio.play();
    } catch (error) {
        console.log('Audio not available');
    }
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

// Cleanup intervals on page unload
window.addEventListener('beforeunload', () => {
    if (clockInterval) clearInterval(clockInterval);
    if (reminderInterval) clearInterval(reminderInterval);
});