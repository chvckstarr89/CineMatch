# CineMatch

App inspired by Tinder for finding your videography style match

## Local Prototype Setup

Follow these steps to get the app running on your machine.

### Prerequisites
- Ensure you have Node.js installed (https://nodejs.org/).

### Project Setup

1. **Add Video Files**
   - Place your 5 `.mp4` video files in the `public/videos/` folder:
     - `clip1.mp4`
     - `clip2.mp4`
     - `clip3.mp4`
     - `clip4.mp4`
     - `clip5.mp4`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Click the "Local" link that appears (usually http://localhost:5173)

### Project Structure

```
cinema-match/
├── public/
│   └── videos/          <-- Put your 5 .mp4 files here
│       ├── clip1.mp4
│       ├── clip2.mp4
│       ├── clip3.mp4
│       ├── clip4.mp4
│       └── clip5.mp4
├── src/
│   ├── App.jsx          <-- Main React component
│   ├── main.jsx         <-- Entry point
│   └── index.css        <-- Styles
├── index.html           <-- HTML template
├── package.json         <-- Dependencies
├── tailwind.config.js   <-- Tailwind configuration
└── vite.config.js       <-- Vite configuration
```

### Features

- Video player with play/pause controls
- Navigate between clips
- Progress bar with click-to-seek
- Mute/unmute audio
- Responsive design with modern UI
