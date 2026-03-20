---
name: minimalist-design-style
description: Refined minimalist design system for web_blog. Use when creating or modifying pages to ensure consistent styling. Contains complete style specifications: colors, typography, grid system, spacing, components, animations, and responsive rules. Reference this skill before making any visual changes to maintain design consistency.
---

# Aether Minimalist Design System

Refined minimalist design system for the web_blog project. All visual changes must follow these specifications.

## Quick Reference

When modifying pages, always consult the detailed references:

- **Color system**: See [COLORS.md](references/COLORS.md)
- **Typography**: See [TYPOGRAPHY.md](references/TYPOGRAPHY.md)
- **Grid & Layout**: See [LAYOUT.md](references/LAYOUT.md)
- **Components**: See [COMPONENTS.md](references/COMPONENTS.md)
- **Animations**: See [ANIMATIONS.md](references/ANIMATIONS.md)

## Core Principles

1. **Strict black & white** - Only #000 and #fff, with grayscale for muted states
2. **Hairline borders** - 1px with #e0e0e0, darker #000 for emphasis
3. **No border radius** - `border-radius: 0 !important`
4. **Antialiased rendering** - `-webkit-font-smoothing: antialiased`
5. **Massive type scale** - clamp() for fluid responsive sizing
6. **High contrast** - font-weight 900 for headers, 200 for body
7. **Generous white space** - 100px+ gaps between sections

## CSS Variables (Root)

```css
:root {
    --theme-bg: #ffffff;
    --theme-bg-alt: #fbfbfb;
    --theme-text: #000000;
    --theme-text-muted: #888888;
    --theme-border: #e0e0e0;
    --theme-border-dark: #000000;
    --font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --space-unit: 1rem;
}
```

## Base Resets

All pages must include these base styles:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 0 !important;
    -webkit-font-smoothing: antialiased;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    background-color: var(--theme-bg);
    color: var(--theme-text);
    font-family: var(--font-main);
    line-height: 1.5;
}

::selection {
    background-color: var(--theme-text);
    color: var(--theme-bg);
}
```

## Container System

```css
.container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 4vw;
    gap: 100px;
}
```

## Utility Classes (Required)

```css
/* Display */
.flex { display: flex; }
.grid { display: grid; }

/* Justify */
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }

/* Align */
.items-center { align-items: center; }

/* Text Transform */
.uppercase { text-transform: uppercase; }

/* Letter Spacing */
.tracking-tight { letter-spacing: -0.06em; }
.tracking-wide { letter-spacing: 0.15em; }

/* Font Weight */
.font-light { font-weight: 200; }
.font-bold { font-weight: 700; }
```

## Image Interaction Pattern

All images use grayscale-to-color with scale:

```css
.minimal-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.img-container { overflow: hidden; background-color: var(--theme-bg-alt); }

.img-container:hover .minimal-img {
    filter: grayscale(0%);
    transform: scale(1.05);
}
```

## Responsive Breakpoint

```css
@media (max-width: 1024px) {
    /* Stack grids to single column */
    /* Hide secondary visual elements */
    /* Simplify navigation */
}
```

## Scrollbar

```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--theme-bg); }
::-webkit-scrollbar-thumb { background: var(--theme-text); }
```

## Implementation Checklist

When creating new pages:

- [ ] Import Inter font (weights 100-900)
- [ ] Include all CSS variables
- [ ] Apply base resets
- [ ] Use utility classes for consistency
- [ ] Set container max-width to 1600px
- [ ] Apply image grayscale hover effect
- [ ] Include scrollbar customization
- [ ] Test at 1024px breakpoint
- [ ] Verify no border-radius anywhere
