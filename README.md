# BMGI Live - Premium Streamer Website

A luxurious, animated webpage for YouTubers and live streamers with a premium green & white theme.

## Features

- ✨ **Glitter particle animations** - Canvas-based particle system with connections
- 🌊 **Smooth scroll animations** - Fade-in, slide effects on scroll
- 📺 **YouTube API integration** - Auto-fetch latest videos from your channel
- 📱 **Fully responsive** - Works on all devices
- 🎨 **Premium design** - Rolex-inspired luxury aesthetics
- ⚡ **Lightweight** - Pure HTML, CSS, JS - no frameworks needed

## Quick Start

1. Open `index.html` in your browser, or
2. Use VS Code Live Server for best experience

## Customization

### Update Your Information

Edit `index.html` to change:
- **Streamer name**: Search for "BMGI" and replace with your name
- **Social links**: Search for "YourChannel", "YourProfile", "YourPage" and update URLs
- **Bio content**: Update the About section text
- **Schedule**: Modify the streaming schedule section
- **Email**: Update contact information

### YouTube API Setup

To show your actual YouTube videos:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create API credentials (API Key)
5. Open `scripts.js` and replace:
   ```javascript
   const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
   const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE';
   ```

**Find your Channel ID:**
- Go to your YouTube channel
- Look at the URL: `youtube.com/channel/UC...` (the part after `/channel/` is your ID)
- Or use [this tool](https://www.youtube.com/account_advanced) when logged in

### Color Customization

Edit `styles.css` and change the CSS variables at the top:

```css
:root {
    --primary: #00A859;        /* Main green */
    --primary-dark: #008847;   /* Darker green */
    --primary-light: #00C96A;  /* Lighter green */
    /* ... other colors */
}
```

## File Structure

```
Saran Web page/
├── index.html    # Main HTML structure
├── styles.css    # All styles and animations
├── scripts.js    # JavaScript functionality
└── README.md     # This file
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Dependencies

- Google Fonts (Playfair Display, Inter) - loaded via CDN
- No other external dependencies!

## License

Free to use for personal and commercial projects.

---

Made with ❤️ for content creators
