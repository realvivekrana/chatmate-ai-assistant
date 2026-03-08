# Theme Toggle - User Guide

## Quick Start

### Switching Between Dark and Light Mode

**Step 1: Find the Theme Toggle**
- Look at the top right of your screen
- You'll see a sun ☀️ or moon 🌙 icon
- It's next to the login/user section

**Step 2: Click to Toggle**
- In **Dark Mode**: Click the sun icon ☀️ to switch to light
- In **Light Mode**: Click the moon icon 🌙 to switch to dark

**Step 3: Enjoy!**
- Theme changes instantly
- Your preference is saved automatically
- Works on all devices

## Theme Comparison

### Dark Mode (Default)
```
✨ Best for:
- Low-light environments
- Night-time use
- Reducing eye strain
- Saving battery (OLED screens)

🎨 Colors:
- Dark backgrounds
- Light text
- Easy on the eyes
```

### Light Mode
```
✨ Best for:
- Bright environments
- Daytime use
- High contrast reading
- Traditional look

🎨 Colors:
- White backgrounds
- Dark text
- Clean and crisp
```

## Features

### Automatic Saving
- Your theme choice is remembered
- Works across browser sessions
- No need to set it again

### Instant Switching
- No page reload needed
- Smooth transition
- All elements update together

### Works Everywhere
- Sidebar
- Chat messages
- Input fields
- Modals and popups
- All buttons and menus

### Mobile Friendly
- Same button on mobile
- Touch-friendly size
- Works on all devices
- Saves on mobile too

## Keyboard Shortcut

Currently, theme toggle is click-only. Future versions may include:
- `Ctrl+Shift+T` - Toggle theme
- `Ctrl+Shift+D` - Force dark mode
- `Ctrl+Shift+L` - Force light mode

## Tips & Tricks

### Best Practices
1. **Use dark mode at night** - Easier on your eyes
2. **Use light mode in bright rooms** - Better visibility
3. **Try both modes** - See which you prefer
4. **Switch anytime** - No limits on how often

### Troubleshooting

**Q: Theme doesn't change?**
- Try refreshing the page
- Clear browser cache
- Check if JavaScript is enabled

**Q: Theme resets after closing browser?**
- Check browser privacy settings
- Make sure cookies/localStorage is enabled
- Try a different browser

**Q: Some elements don't change color?**
- This is a bug - please report it
- Try refreshing the page
- Check browser console for errors

**Q: Can I set a custom theme?**
- Not yet, but it's planned for future updates
- Currently only dark and light modes available

## Visual Guide

```
┌─────────────────────────────────────────┐
│  ChatMate    [☀️] [👤] [Logout]        │  ← Theme toggle here
├─────────────────────────────────────────┤
│                                         │
│  Your chat messages appear here...     │
│                                         │
└─────────────────────────────────────────┘
```

### Dark Mode Preview
```
┌─────────────────────────────────────────┐
│  🌑 Dark Background                     │
│  💬 Light text on dark                  │
│  🔵 Blue accents                        │
│  ⚫ Dark sidebar                        │
└─────────────────────────────────────────┘
```

### Light Mode Preview
```
┌─────────────────────────────────────────┐
│  ☀️ White Background                    │
│  💬 Dark text on light                  │
│  🔵 Blue accents                        │
│  ⚪ Light sidebar                       │
└─────────────────────────────────────────┘
```

## Technical Details

### Storage
- **Location**: Browser localStorage
- **Key**: `chatmate_theme`
- **Values**: `"dark"` or `"light"`
- **Size**: < 100 bytes

### Privacy
- Theme preference stored locally only
- No data sent to servers
- Completely private
- You control your data

### Performance
- Instant switching (< 10ms)
- No page reload needed
- Minimal memory usage
- Battery efficient

## Accessibility

### Screen Readers
- Theme toggle has proper labels
- Announces current theme
- Announces when theme changes

### Keyboard Navigation
- Tab to reach theme toggle
- Enter or Space to activate
- Focus indicator visible

### High Contrast
- Both themes support high contrast
- Clear visual differences
- Easy to distinguish elements

## FAQ

**Q: Which theme is better?**
A: It depends on your environment and preference. Try both!

**Q: Does theme affect performance?**
A: No, both themes perform identically.

**Q: Can I schedule theme changes?**
A: Not yet, but it's a planned feature.

**Q: Will my theme sync across devices?**
A: Not currently - each device saves independently.

**Q: Can I customize colors?**
A: Not yet, but custom themes are planned.

**Q: Does theme affect printing?**
A: Printing typically uses light mode regardless of setting.

## Support

If you have issues with the theme toggle:
1. Check this guide first
2. Try refreshing the page
3. Clear browser cache
4. Report bugs on GitHub
5. Contact support

---

**Enjoy your personalized ChatMate experience!** 🎨
