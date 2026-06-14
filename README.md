# YourLifeOS Template

Welcome to **YourLifeOS**, a premium, glassmorphism-styled personal dashboard and productivity system. This template provides a single-page application (SPA) experience to track your career pipeline, daily habits, networking events, and business ventures.

## Features
- **✨ Premium Aesthetic:** Built with modern glassmorphism design, smooth animations, and a curated dark/light color palette.
- **📊 Data-Driven:** No need to edit complex HTML. All your personal data is configured in a simple `data.js` file.
- **📱 Fully Responsive:** Works beautifully on desktop and mobile browsers.
- **💼 Modular Systems:** Job pipeline tracker, habit checklist, event timeline, and more.

---

## 🚀 Quick Start Guide

### 1. Installation
Simply download or clone the project folder. No build tools or backend servers are required!

### 2. Configure Your Data
Open the `data.js` file in any text editor. This file controls the content of your dashboard.

Update your **Profile**:
```javascript
profile: {
    name: "Your Name",
    role: "Your Title",
    avatarInitials: "YN"
}
```

Add your **Job Applications** to the `jobs` array. Set the `category` to one of the following to determine where it appears on the dashboard:
- `open`
- `submitted`
- `secondary`
- `backup`
- `closed`

Set `priority: "high"` to pin a job to the top of your pipeline!

Update your **Habits** and **Events** by editing the respective arrays in `data.js`.

### 3. Launch
Open `index.html` in your favorite web browser (Chrome, Safari, Firefox, Edge).

---

## 🎨 Advanced Customization

### Changing Theme Colors
The template is powered by Tailwind CSS. To change the primary accent colors (Teal, Emerald, Amber, Indigo, Rose):
1. Make sure you have Node.js installed.
2. Edit `tailwind.config.js` to modify the hex values under `theme.extend.colors.cyber`.
3. Open your terminal in the project directory and run:
   ```bash
   npm run build
   ```
   This will recompile `tailwind.css` with your new brand colors.

### Extending the UI
If you know a bit of HTML/JS, you can easily add new tabs!
- Add a new button in the `<nav id="sidebar">` section of `index.html`.
- Create a new `<section id="your-new-tab" class="tab-section hidden">`.
- The existing `app.js` navigation logic will automatically wire it up!

---

*Built for professionals who want to own their data and operate at peak efficiency.*
