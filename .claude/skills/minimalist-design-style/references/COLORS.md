# Color System

## CSS Variables

```css
:root {
    --theme-bg: #ffffff;
    --theme-bg-alt: #fbfbfb;
    --theme-text: #000000;
    --theme-text-muted: #888888;
    --theme-border: #e0e0e0;
    --theme-border-dark: #000000;
}
```

## Usage Guidelines

| Variable | Purpose | Usage |
|----------|---------|-------|
| `--theme-bg` | Primary background | Body background, card backgrounds |
| `--theme-bg-alt` | Secondary background | Hover states, alternate sections |
| `--theme-text` | Primary text | Headings, body text, links |
| `--theme-text-muted` | Muted text | Descriptions, secondary information |
| `--theme-border` | Standard borders | Dividers, grid lines |
| `--theme-border-dark` | Emphasis borders | Section headers, active states |

## Opacity Levels

```css
opacity: 0.3;  /* Footer copyright */
opacity: 0.4;  /* Archive year, section header info */
opacity: 0.5;  /* Footer links, descriptions */
opacity: 0.6;  /* Concept secondary text */
```

## Selection Style

```css
::selection {
    background-color: var(--theme-text);
    color: var(--theme-bg);
}
```

## Grid Hairline Pattern

```css
.essence-grid {
    display: grid;
    gap: 1px;
    background-color: var(--theme-border); /* Creates hairlines */
    border: 1px solid var(--theme-border);
}

.essence-card {
    background-color: var(--theme-bg); /* Covers hairlines */
}
```

## Backdrop Filter

```css
.nav-header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(180%) blur(20px);
}
```
