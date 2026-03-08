# Navbar Visual Guide

## Desktop View (1280px+)

```
┌────────────────────────────────────────────────────────────────────────┐
│  [☰] [✨] ChatMate AI          (center space)        [☀️] [👤▼] Demo  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
     ↑    ↑      ↑                                        ↑    ↑
  Hidden Logo  Brand                                   Theme User+Name
  on LG+  Icon  Name                                   Toggle Dropdown
```

### When Dropdown is Open:
```
┌────────────────────────────────────────────────────────────────────────┐
│  [☰] [✨] ChatMate AI          (center space)        [☀️] [👤▲] Demo  │
│                                                              │          │
│                                                              ▼          │
│                                                    ┌──────────────────┐ │
│                                                    │  [👤] Demo User  │ │
│                                                    │  demo@gmail.com  │ │
│                                                    │  [Google Badge]  │ │
│                                                    ├──────────────────┤ │
│                                                    │  ⚙️ Settings     │ │
│                                                    │  🚪 Logout       │ │
│                                                    └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

## Tablet View (768px - 1023px)

```
┌──────────────────────────────────────────────────────────────┐
│  [☰] [✨] ChatMate AI    (center)      [☀️] [👤▼]           │
└──────────────────────────────────────────────────────────────┘
     ↑    ↑      ↑                          ↑    ↑
  Visible Logo Brand                     Theme Avatar
  on MD+  Icon  Name                     Toggle Only
```

## Mobile View (320px - 767px)

```
┌────────────────────────────────────────────────┐
│  [☰] [✨]              [☀️] [👤]  [Sign up]   │
└────────────────────────────────────────────────┘
     ↑    ↑                ↑    ↑      ↑
  Visible Logo            Theme Avatar Short
  on SM-  Only            Toggle Only   Text
```

## Component Breakdown

### Left Section
```
┌─────────────────────────┐
│ [☰]  [✨]  ChatMate AI  │
│  ↑     ↑        ↑       │
│  │     │        └─ Brand name (hidden on xs)
│  │     └─ Logo with gradient background
│  └─ Hamburger (hidden on lg+)
└─────────────────────────┘
```

### Theme Toggle
```
Dark Mode:        Light Mode:
┌──────┐         ┌──────┐
│  ☀️  │         │  🌙  │
└──────┘         └──────┘
  ↑                ↑
Hover: Rotate    Hover: Rotate
+12 degrees      -12 degrees
```

### User Avatar (Logged In)
```
Desktop:                Mobile:
┌────────────────┐     ┌──────┐
│ [👤] Demo User │     │ [👤] │
│      via Google│     └──────┘
│            [▼] │
└────────────────┘
```

### Dropdown Menu Structure
```
┌─────────────────────────────┐
│  User Info Section          │
│  ┌─────────────────────┐    │
│  │ [👤] Demo User      │    │
│  │ demo.user@gmail.com │    │
│  │ [Logged in with...] │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│  Menu Items                 │
│  ┌─────────────────────┐    │
│  │ ⚙️  Profile Settings│    │
│  │ 🚪  Logout          │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

### Login Buttons (Not Logged In)
```
Desktop:                    Mobile:
┌──────────────────────┐   ┌─────────────┐
│ [Log in] [Sign up ▶] │   │ [Log in] [▶]│
└──────────────────────┘   └─────────────┘
```

## Responsive Behavior

### 320px (Extra Small Mobile)
- Hamburger: ✅ Visible
- Logo: ✅ Icon only
- Brand: ❌ Hidden
- Center: ❌ Hidden
- Theme: ✅ Visible
- Avatar: ✅ Icon only
- User Name: ❌ Hidden
- Chevron: ❌ Hidden
- Sign up text: "Sign up"

### 640px (Small Mobile)
- Hamburger: ✅ Visible
- Logo: ✅ Icon only
- Brand: ✅ Visible
- Center: ❌ Hidden
- Theme: ✅ Visible
- Avatar: ✅ Icon only
- User Name: ❌ Hidden
- Chevron: ❌ Hidden
- Sign up text: "Sign up for free"

### 768px (Tablet)
- Hamburger: ✅ Visible
- Logo: ✅ Icon + gradient
- Brand: ✅ Visible
- Center: ✅ Visible (empty)
- Theme: ✅ Visible
- Avatar: ✅ Icon only
- User Name: ❌ Hidden
- Chevron: ✅ Visible
- Height: 64px (increased)

### 1024px (Desktop)
- Hamburger: ❌ Hidden
- Logo: ✅ Icon + gradient
- Brand: ✅ Visible
- Center: ✅ Visible
- Theme: ✅ Visible
- Avatar: ✅ Icon + name
- User Name: ✅ Visible
- Chevron: ✅ Visible
- Height: 64px

## Color Scheme

### Dark Mode
```
Background: Semi-transparent dark with blur
Border: Subtle dark border (40% opacity)
Text: Light gray
Icons: Muted gray → White on hover
Logo: Blue gradient
Avatar: Blue gradient
Dropdown: Dark card with border
```

### Light Mode
```
Background: Semi-transparent white with blur
Border: Subtle light border (40% opacity)
Text: Dark gray
Icons: Muted gray → Black on hover
Logo: Blue gradient (same)
Avatar: Blue gradient (same)
Dropdown: White card with border
```

## Animations

### Theme Toggle
```
Hover:
  Dark Mode (Sun): Rotate +12°
  Light Mode (Moon): Rotate -12°
  Duration: 200ms
  Easing: ease-in-out
```

### Dropdown
```
Open:
  Fade in: 0 → 1 opacity
  Slide down: -8px → 0
  Duration: 200ms
  
Close:
  Instant (on outside click)
```

### Chevron
```
Closed: 0°
Open: 180°
Duration: 200ms
Easing: ease-in-out
```

### Buttons
```
Hover:
  Background: Muted color
  Shadow: Increase intensity
  Duration: 200ms
```

## Spacing Guide

### Padding
```
Container:
  Mobile: 12px (px-3)
  Tablet: 16px (px-4)
  Desktop: 24px (px-6)

Buttons:
  Mobile: 6px 12px
  Desktop: 8px 16px
```

### Gaps
```
Left Section: 8px (gap-2) → 12px (gap-3) on md
Right Section: 4px (gap-1) → 8px (gap-2) on md
```

### Heights
```
Navbar:
  Mobile: 56px (h-14)
  Desktop: 64px (h-16)

Avatar:
  Mobile: 32px (w-8 h-8)
  Desktop: 36px (w-9 h-9)
  Dropdown: 40px (w-10 h-10)

Logo:
  Mobile: 32px (w-8 h-8)
  Desktop: 36px (w-9 h-9)
```

## Touch Targets

All interactive elements meet minimum touch target size:

```
Minimum: 44x44px (Apple HIG)
Recommended: 48x48px (Material Design)

Our Implementation:
  Hamburger: 44x44px ✅
  Logo: 44x44px ✅
  Theme Toggle: 44x44px ✅
  Avatar: 44x44px ✅
  Buttons: 44x44px ✅
```

## Z-Index Layers

```
Layer 50: Navbar (sticky)
Layer 40: Sidebar overlay
Layer 30: Modals
Layer 20: Dropdowns (relative to navbar)
Layer 10: Tooltips
Layer 0: Content
```

## Accessibility Features

### Keyboard Navigation
```
Tab Order:
1. Hamburger menu (if visible)
2. Logo (not focusable)
3. Theme toggle
4. Avatar/Login button
5. Sign up button (if not logged in)

Dropdown:
6. Profile Settings
7. Logout
```

### Screen Reader Announcements
```
Hamburger: "Toggle sidebar"
Theme Toggle: "Switch to light mode" / "Switch to dark mode"
Avatar: "User menu"
Profile Settings: "Profile Settings"
Logout: "Logout"
```

### Focus Indicators
```
All interactive elements have visible focus rings
Color: Primary color
Width: 2px
Offset: 2px
```

## Quick Reference

### Classes Used
```
Sticky: sticky top-0 z-50
Blur: backdrop-blur bg-background/95
Border: border-b border-border/40
Gradient: bg-gradient-to-br from-primary to-primary/80
Shadow: shadow-sm hover:shadow-md
Transition: transition-all duration-200
Hover: hover:bg-muted/80
```

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Icons
```
Menu: Hamburger (3 lines)
Sparkles: Logo icon
Sun: Light mode
Moon: Dark mode
User: Avatar fallback
Settings: Gear icon
LogOut: Door with arrow
ChevronDown: Dropdown arrow
```

---

**This visual guide helps understand the navbar layout and behavior across different screen sizes.**
