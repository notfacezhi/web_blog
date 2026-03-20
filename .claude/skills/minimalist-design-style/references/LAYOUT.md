# Layout & Grid System

## Container

```css
.container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 4vw;
    gap: 100px;
}
```

## Grid System

### 12-Column Base

```css
.grid {
    display: grid;
}
```

### Hairline Grid Pattern

For bordered card grids (Essence, Spec):

```css
.essence-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--theme-border);
    background-color: var(--theme-border);
    gap: 1px;
}

.essence-card {
    background-color: var(--theme-bg);
}
```

The 1px gap with border color creates perfect hairlines between cards.

## Layout Patterns

### Hero Section

```css
.hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1.5fr 1fr;  /* Asymmetric split */
    align-items: center;
    padding-top: 80px;  /* Account for fixed nav */
    gap: 4vw;
}
```

### Concept Grid

```css
.concept-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4vw;
    align-items: start;
}

.concept-img-wide {
    grid-column: span 2;  /* Full width image */
    height: 50vh;
    margin-top: 4rem;
}
```

### Archive List Item

```css
.archive-item {
    display: grid;
    grid-template-columns: 80px 100px 1.5fr 1fr 1fr;
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--theme-border);
}
```

### Essence Grid (3-column)

```css
.essence-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background-color: var(--theme-border);
}
```

### Spec Grid (4-column)

```css
.spec-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background-color: var(--theme-border);
}
```

### Footer Grid

```css
.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4vw;
}
```

## Spacing System

| Value | Usage |
|-------|-------|
| `4vw` | Section gaps, grid gaps |
| `100px` | Container gaps |
| `10rem` | Section padding (vertical) |
| `4rem` | Card padding, bottom margins |
| `3rem` | Spec box padding |
| `2rem` | Archive item padding |
| `1.5rem` | Section header padding-top |

## Section Spacing

```css
.section-padding {
    padding: 10rem 0;
}
```

## Fixed Navigation

```css
.nav-header {
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid var(--theme-border);
}
```

## Responsive Breakpoint

```css
@media (max-width: 1024px) {
    .hero,
    .concept-grid,
    .essence-grid,
    .spec-grid,
    .footer-grid {
        grid-template-columns: 1fr;  /* Stack to single column */
    }

    .hero-visual,
    .hero-meta {
        display: none;  /* Hide secondary elements */
    }
}
```
