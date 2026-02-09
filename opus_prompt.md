
# Prompt for Reproducing TruckNavPro Landing Page

**Role:** Expert Frontend Developer & UI/UX Designer
**Task:** Create a complete, single-page landing page for a professional truck navigation app ("TruckNavPro").
**Tech Stack:** HTML5, Modern CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (No frameworks).

## 1. Design Aesthetic & Theme
*   **Theme:** "Midnight Future" - A deep, premium dark mode with neon accents.
*   **Color Palette:**
    *   Background: Deep Navy (`#0A1628`) to Dark Blue (`#1a365d`) gradients.
    *   Primary Accent: Neon Cyan (`#00D4FF`) - used for buttons, glows, and key highlights.
    *   Secondary Accent: Electric Blue (`#1E90FF`).
    *   Text: White (`#ffffff`) and Light Gray (`#e2e8f0`).
*   **Visual Style:**
    *   **Glassmorphism:** Use translucent backgrounds (`rgba(255, 255, 255, 0.05)`) with `backdrop-filter: blur(10px)` for cards, navbar, and overlays.
    *   **Glow Effects:** Subtle box-shadow glows on hover (cyan/blue).
    *   **Typography:** 'Inter', sans-serif. Clean, readable, with bold distinct headings.
    *   **Animations:** Smooth fade-in on scroll, floating background orbs, hover scales on cards.

## 2. Layout & Architecture

### A. Navbar (Sticky & Glass)
*   **Logo:** "TruckNavPro" in a futuristic "Tron" style (Uppercase, heavily bold, spaced tracking, neon cyan text-shadow).
*   **Links:** Features, Screenshots, Pricing, FAQ.
*   **CTA:** "Download Free" button (Pill shape, gradient background).
*   **Mobile:** Hamburger menu that slides down/overlays.

### B. Hero Section
*   **Layout:** Centered alignment with a max-width container.
*   **Background:** 3 animated gradient orbs (Blue, Cyan, Purple) floating behind the content to create depth.
*   **Content:**
    *   **Badge:** "Professional Truck Navigation" (Small pill badge).
    *   **Headline:** "Navigate Like a **Pro**. Arrive Like a **Champion**." (Use gradient text for emphasized words).
    *   **Subtext:** "Professional-grade truck navigation with low bridge avoidance..."
    *   **Buttons:**
        1.  "Download on App Store" (Primary, heavy glow, includes Apple icon).
        2.  "Watch Demo" (Secondary, glass style).
    *   **Stats Row:** 3-column stats below buttons (Low Bridge Avoidance, Truck-Specific Routes, iOS App).

### C. Problem/Solution Section
*   **Grid:** 3 Glass Cards highlighting pain points (Low bridge avoidance missing, Weight restrictions ignored).
*   **Icons:** Use large emojis or simple SVGs for visual anchors.

### D. Features Showcase (Zig-Zag Layout)
*   alternating text and image/video content.
*   **Feature 1:** "Truck-Specific Routing" (Text left, Image right).
*   **Feature 2:** "Low Bridge Avoidance" (Text right, Image left).
*   **Styling:** Use `glass-card` styling for the content blocks.

### E. Interactive Media Carousel
*   **Component:** A horizontal scrollable track of "Screenshot Frames".
*   **Items:**
    *   Vertical phone-shaped containers (`aspect-ratio: 9/19.5`).
    *   **Content:** Mix of Images and **Click-to-Play Videos**.
    *   **Video Logic:** Videos must NOT autoplay. Show a poster image with a central "Play" button overlay. Clicking plays the video inline.
*   **UX:** Snap-scrolling CSS (`scroll-snap-type: x mandatory`).

### F. Main Demo Section
*   **Layout:** A central, large "Phone Mockup" frame.
*   **Design:** CSS-styled notch and rounded corners to mimic a modern iPhone.
*   **Video:** A main demo video inside the frame. Must use a Poster image + Play Overlay initially.
*   **Tech:** Ensure `playsinline` and responsive sizing (max-width constraints for mobile).

### G. Testimonials
*   **Grid:** 3-column responsive grid.
*   **Cards:** Glass cards with:
    *   5 Star Icons (⭐⭐⭐⭐⭐).
    *   Quote text ("Saved me from a 12'6 bridge...").
    *   Author info (Avatar circle + Name + Role).

### H. Pricing & FAQ
*   **Pricing:** 2 Cards (Free Trial vs Monthly). Highlight "Free Trial" as the recommended entry point.
*   **FAQ:** Accordion style. Clicking a question expands the answer smoothly.

### I. Footer
*   **Layout:** multi-column (Brand, Legal, Support, Social).
*   **Social Icons:** Only **X (Twitter)** and **TikTok**. Remove others. Use SVGs.
*   **Legal:** Links to Privacy Policy, Terms (standard pages).
*   **Deep Linking:** Script to detect iOS devices and convert App Store links to `itms-apps://` scheme.

## 3. Specific Code Requirements
*   **Responsiveness:** Mobile-first approach. Ensure videos do not overflow screen width (`max-width: 100%`, `box-sizing: border-box`).
*   **Performance:** Lazy load images/videos. Use `preload="none"` for videos.
*   **Scripts:**
    1.  `playVideo(container)`: Function to handle play/pause and toggle overlay visibility.
    2.  `initAppStoreLink()`: Detection script for iOS deep linking.
