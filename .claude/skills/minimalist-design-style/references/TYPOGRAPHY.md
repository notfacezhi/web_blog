# Typography System

## Font Family

```css
:root {
    --font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## Import Inter Font

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;700;900&display=swap" rel="stylesheet"/>
```

## Font Weights

| Weight | Usage | Example |
|--------|-------|---------|
| 100 | Extra Light | Rare, emphasis |
| 200 | Light | Body text, descriptions |
| 300 | Semi Light | Secondary text |
| 400 | Regular | Default |
| 500 | Medium | Navigation links |
| 700 | Bold | Archive titles |
| 900 | Black | Hero headings, emphasis |

## Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| `.tracking-tight` | -0.06em | Hero h1, archive titles |
| `.tracking-wide` | 0.15em | Navigation, labels, uppercase text |

## Font Sizes (with clamp())

```css
/* Hero heading - massive scale */
font-size: clamp(4rem, 12vw, 12rem);  /* 64px - 192px */

/* Concept text - large scale */
font-size: clamp(2rem, 4vw, 3.5rem);  /* 32px - 56px */

/* Spec value */
font-size: 2rem;

/* Essence card heading */
font-size: 1.75rem;

/* Archive title */
font-size: 1.5rem;

/* Card body */
font-size: 0.9rem;

/* Brand logo, footer links */
font-size: 1.25rem;  /* logo */
font-size: 0.8rem;   /* footer links */

/* Navigation */
font-size: 0.7rem;

/* Section labels */
font-size: 0.65rem;

/* Smallest - location, copyright */
font-size: 0.6rem;
```

## Line Heights

```css
line-height: 0.85;  /* Hero h1 - tight */
line-height: 1.1;   /* Concept text */
line-height: 1.5;   /* Body default */
line-height: 1.8;   /* Description text */
```

## Text Transform

```css
.uppercase { text-transform: uppercase; }
```

Used for:
- Navigation links
- Section labels
- Archive categories
- Footer titles
- Hero main heading
- Essence card headings
- Spec labels

## Font Rendering

```css
-webkit-font-smoothing: antialiased;
```

## Typography Examples

```css
/* Hero Heading */
.hero-text-content h1 {
    font-size: clamp(4rem, 12vw, 12rem);
    font-weight: 900;
    line-height: 0.85;
    letter-spacing: -0.06em;
}

/* Concept Text */
.concept-text {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 200;
    line-height: 1.1;
    letter-spacing: -0.06em;
}

/* Navigation */
.nav-links a {
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

/* Section Label */
.section-label {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

/* Archive Title */
.archive-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.06em;
}
```
