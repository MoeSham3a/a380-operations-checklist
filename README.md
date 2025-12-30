# ✈️ A380 Operations Checklist

A professional, offline-first Progressive Web App (PWA) designed for Airbus A380 pilots to manage pre-flight and in-flight checklists with integrated aviation tools, timeline management, and flight preparation.

![Version](https://img.shields.io/badge/version-1.1.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PWA](https://img.shields.io/badge/PWA-enabled-purple)

## 🌟 Features

### ✅ Interactive Checklists
- **Preflight Checklist**: Comprehensive 20-item checklist across two columns
- **Cruise Checklist**: 8-item checklist for in-flight operations
- **Seamless Navigation**: Switch between checklists with a single button
- **Custom Tasks**: Add your own checklist items on the fly
- **Persistent Storage**: All checklist states saved locally
- **Info Popups**: Quick reference guides with images for key procedures
- **Reset Functionality**: Clear all checkboxes while preserving custom items

### 📄 Flight Preparation
Complete flight briefing page accessible from the main menu:
- **Documents Check**: Essential crew documents checklist (Passport, Visa, License, Medical, etc.)
- **Operational Flight Plan (OFP)**: Track flight number, registration, fuel planning, alternates
- **MEL/CDL**: Log aircraft maintenance deferrals
- **AIRAC/ERM**: Navigation database cycle tracking
- **NOTAMs/Weather**: Briefing documentation
- **Company Notices**: FCI, FCN, ACI, SCB, Network reports
- **Threat Assessment**: Identify operational risks
- **Rest Strategy**: Crew rest planning for long-haul operations
- **Auto-Save**: Automatically saves every 30 seconds
- **Persistent Data**: All entries saved to localStorage

### ⏰ Time Management
- **Dual Clock Display**: Real-time UTC and Local time
- **STD Input**: Scheduled Time of Departure (UTC) with persistence
- **UTC/Local Toggle**: Switch timeline between UTC and local timezone
- **APU Start Reminder**: Automatic notification 20 minutes before departure with audio alert
- **Visual Timeline**: Interactive pre-flight timeline showing all critical milestones

### 📊 Pre-Flight Timeline
Dynamic timeline visualization with 9 key milestones:
- **STD-1:25** - Report Time
- **STD-1:23** - Flight Briefing
- **STD-1:10** - In The Bus
- **STD-1:00** - Check ATC
- **STD-0:40** - Start Walking
- **STD-0:20** - At the Gate
- **STD-0:15** - Boarding Starts
- **STD-0:10** - Push Back
- **STD** - Departure

Features:
- Real-time progress bar tracking current position
- Completed milestone indicators (visual feedback)
- **UTC/Local Time Toggle**: View milestone times in UTC or local timezone
- Absolute time display (HH:MM format)
- Milestone positioning spread across timeline
- Fully responsive design

### 🧮 Flight Duty Period (FDP) Calculator
Emirates OMA Chapter 7 compliant calculator:
- **Base FDP Calculation**: Automatic calculation based on reporting time and number of sectors
- **Acclimatisation Status**: Toggle between acclimatised/non-acclimatised crew
- **FDP Extension**: Calculate extended FDP with in-flight rest
  - Bunk rest: Max 18 hours (extension = ½ of rest taken)
  - Seat rest: Max 15 hours (extension = ⅓ of rest taken)
- **Time-Based Tables**: Accurate FDP limits based on local reporting time
- **Visual Results**: Color-coded display showing base FDP and allowed extension

### 🛠️ Aviation Toolkit

#### Unit Converters
- **Fuel**: kg ↔ lbs ↔ tons
- **Distance**: nm ↔ km ↔ sm
- **Temperature**: °C ↔ °F
- Quick Reference rules of thumb included

#### Performance Calculators
- **Wind Component Calculator**: Headwind/tailwind and crosswind components
- **Rate 1 Turn Calculator**: Bank angle and turn radius
- **ISA Deviation Calculator**: Temperature deviation from standard atmosphere
- **Density Altitude Calculator**: Performance altitude accounting for temperature

### 📝 Decision Making Tools
- **Decision Making Checklist**: FOR-DEC structured decision-making framework
  - **F**acts
  - **O**ptions
  - **R**isks and Benefits
  - **D**ecision
  - **E**xecution
  - **C**heck
- Integrated into footer for quick access during critical phases

### 📋 Productivity Tools
- **Scratchpad**: Quick notes for general use
- **OFP Notes**: Dedicated notepad for flight plan annotations
- **Calculator**: Built-in calculator for quick computations
  - Basic arithmetic operations
  - Decimal support
  - Keyboard accessible

### 🎨 User Experience
- **Dark/Light Theme Toggle**: Eye-friendly interface for day and night operations
- **Offline Capability**: Full functionality without internet connection
- **Auto-Update System**: Automatic detection and installation of new versions
- **Network Status Indicator**: Visual feedback for online/offline status
- **Responsive Design**: Optimized for desktop, tablet (iPad 11"), and mobile devices
- **Progressive Web App**: Install on home screen for app-like experience
- **Smooth Animations**: Polished transitions and micro-interactions

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MoeSham3a/a380-operations-checklist.git
   cd a380-operations-checklist
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Install as PWA

#### Desktop (Chrome/Edge)
1. Open the application in your browser
2. Click the install icon (⊕) in the address bar
3. Click "Install"

#### Mobile (iOS Safari)
1. Open the application in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

#### Mobile (Android Chrome)
1. Open the application in Chrome
2. Tap the menu (⋮)
3. Tap "Install App" or "Add to Home Screen"

## 📱 Usage

### Managing Checklists

**Check Items**
- Click the checkbox to mark items as complete
- Progress automatically updates in the header

**Add Custom Items**
- Type your task in the input field
- Press Enter or click the + button
- Custom items are added to the bottom of the left column

**Delete Items**
- Hover over an item
- Click the trash icon (🗑️)

**Filter View**
- **All**: Show all items
- **Active**: Show only unchecked items
- **Completed**: Show only checked items

**Switch Checklists**
- Click "Next →" to go to Cruise checklist
- Click "← Back" to return to Preflight

**Reset Checklist**
- Click the "Reset" button in the footer
- Confirm to uncheck all items in the current checklist

### Using the Timeline

1. **Set Departure Time**
   - Enter STD in UTC format (HH:MM) in the header
   - Timeline automatically appears and starts tracking

2. **Toggle Between UTC and Local Time**
   - Click the "UTC" or "LOCAL" button in the timeline header
   - Milestone times instantly update to selected timezone
   - Preference is saved and restored on next visit

3. **Monitor Progress**
   - Progress bar shows current position
   - Completed milestones turn purple
   - Milestone times show absolute clock times (not relative)

4. **Automatic Reminders**
   - APU start reminder appears at STD-20 minutes
   - Audio alert plays (if available)
   - Click "ACKNOWLEDGE" to dismiss

### Using Flight Preparation

1. **Access Flight Prep**
   - Click "Flight Prep" button in the footer
   - Opens dedicated flight preparation page

2. **Documents Check**
   - Check off documents as you verify them
   - Passport, Visa, Company ID, License, Medical, Vaccination Card

3. **Fill Out Sections**
   - Complete OFP details, MEL/CDL items, NOTAMS, weather, etc.
   - All fields auto-save every 30 seconds

4. **Manual Save**
   - Click "Save Flight Preparation" button at bottom
   - Confirmation notification appears

### Using the FDP Calculator

1. **Access Calculator**
   - Click "FDP Calc" in the toolkit footer

2. **Set Parameters**
   - Toggle acclimatisation status (Acclimatised/Non-Acclimatised)
   - Enter reporting time in local time (HH:MM)
   - Enter number of sectors (1-8)

3. **Calculate Extension (Optional)**
   - Click "Calculate FDP Extension"
   - Select rest type (Bunk/Seat)
   - Enter total rest minutes
   - View extended FDP limit

### Using the Toolkit

**Access Tools**
- Click any toolkit button in the footer
- Modal opens with the selected tool

**Unit Converter**
- Select tab (Fuel/Distance/Temp)
- Enter value in any field
- Other fields auto-update
- Quick reference tips shown below

**Calculators**
- Enter required values
- Click "Calculate"
- Results displayed with color coding where applicable

## 🏗️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS variables, flexbox, grid
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Progressive Web App**: Service Worker, Web App Manifest

### Data Storage
- **localStorage**: Client-side persistence for all data
- **Service Worker Cache**: Offline resource caching (Cache-First strategy)

### APIs Used
- Date/Time API
- Web Audio API (for reminders)
- Service Worker API (for PWA functionality)
- Notification API (for alerts)

## 📂 Project Structure

```
A380_Emirates_Operations/
├── index.html              # Main application HTML
├── flight-prep.html        # Flight preparation page
├── styles.css              # Complete styling and responsive design
├── script.js               # Application logic and functionality
├── manifest.json           # PWA configuration
├── service-worker.js       # Offline caching and auto-update
├── icon-192.png           # PWA icon (192x192)
├── icon-512.png           # PWA icon (512x512)
├── Brake-cooling-table.JPG # Reference image
├── ERG.JPG                # Emergency Response Guide
├── Departure-briefing.JPG  # Departure briefing reference
├── Fuel-difference-table.JPG # Fuel discrepancy table
├── Pre-departure-PA.JPG    # PA announcement script
├── USA-PA.JPG             # USA-specific PA script
└── README.md              # This file
```

## 🎯 Responsive Breakpoints

- **Desktop**: > 1024px - Full two-column layout
- **iPad 11"**: 769px - 1400px - Optimized for cockpit tablets
- **Tablet**: 481px - 768px - Compact single column
- **Mobile**: < 480px - Touch-optimized minimal view

## 🔄 Version Control & Updates

### Current Version: 1.1.2

### Update Process
1. Make changes to application files
2. Increment `APP_VERSION` in `service-worker.js`
3. Commit and push to repository
4. Deploy to GitHub Pages
5. Users receive automatic update notification

### Changelog
- **v1.1.2**: Added documents checklist to flight prep, fixed timeline positioning
- **v1.1.1**: Added UTC/Local timeline toggle, absolute time display
- **v1.1.0**: Added FDP calculator with extension, flight prep page, notepad, calculator
- **v1.0.1**: Added converter rules of thumb, UTC label for STD
- **v1.0.0**: Initial release with full feature set

## 🌐 Deployment

### GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update application"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select branch: `main`
   - Click Save

3. **Access Live Site**
   ```
   https://moesham3a.github.io/a380-operations-checklist/
   ```

### Custom Domain (Optional)
1. Add `CNAME` file with your domain
2. Configure DNS settings at your registrar
3. Enable HTTPS in GitHub Pages settings

## 🔧 Development

### Running Locally
```bash
# Start development server
python -m http.server 8000

# Access at
http://localhost:8000
```

### Making Changes

**CSS Modifications**
- Edit `styles.css`
- Use CSS custom properties (variables) for consistency
- Test across all breakpoints

**JavaScript Functionality**
- Edit `script.js`
- Maintain global window exports for onclick handlers
- Update service worker version after significant changes

**Adding Images**
- Place images in root directory
- Update `checklistInfo` object in `script.js`
- Add to cache in `service-worker.js`

## 📋 Checklists

### Preflight Checklist (20 items)
**Column 1:**
- Brake Temp
- GPU
- FUEL QTY
- Fuel Figures
- ADIRS
- Fire Test
- Oxygen
- CVR Test
- Documents

**Column 2:**
- NOTOC
- Briefing
- Weather
- PA (USA spec)
- Performance
- Load
- FMS Init
- T/O config
- Catering
- Exterior
- PAX/Cargo

### Cruise Checklist (8 items)
- Weather Update
- Fuel Check
- Position Report
- Flight Plan Review
- ETOPS Check
- System Monitor
- Cabin Check
- Approach Brief

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍✈️ Author

**Mohamed Shama**
- GitHub: [@MoeSham3a](https://github.com/MoeSham3a)
- Project: [A380 Operations Checklist](https://github.com/MoeSham3a/a380-operations-checklist)

## 🙏 Acknowledgments

- Airbus A380 operating procedures
- Emirates Airlines operational standards (OMA Chapter 7)
- Aviation community feedback
- Modern PWA best practices

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via repository discussions

## 🔐 Security

- No sensitive data transmitted or stored on external servers
- All data stored locally in browser
- No external API calls
- Input sanitization implemented
- Offline-first architecture for data privacy

## 🚧 Roadmap

Future enhancements under consideration:
- Additional checklists (Landing, Shutdown, Emergency)
- Enhanced METAR/TAF weather integration
- Flight time logger with duty tracking
- Multiple aircraft type support
- Export/import flight preparation data
- Shared checklist templates

---

**Made with ❤️ for professional pilots**

*Fly safe, fly smart!* ✈️
