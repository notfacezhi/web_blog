# Animations & Interactions

## Transition Easing

Use the signature cubic-bezier for all premium-feeling animations:

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

This creates an "ease-out-quart" feel with a slight overshoot - smooth start, fast middle, smooth finish.

## Image Hover Effect

**Pattern**: Grayscale to color + scale

```css
.minimal-img {
    filter: grayscale(100%);
    transform: scale(1);
    transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.img-container:hover .minimal-img {
    filter: grayscale(0%);
    transform: scale(1.05);
}
```

- Filter duration: 0.8s
- Transform duration: 1.2s (slightly longer for more fluid feel)

## Link Opacity Transition

```css
.nav-links a {
    opacity: 0.4;
    transition: opacity 0.4s ease;
}

.nav-links a:hover {
    opacity: 1;
}
```

## Archive Item Hover

**Pattern**: Background fill + padding shift

```css
.archive-item {
    transition: all 0.4s ease;
    padding-left: 0;
}

.archive-item:hover {
    background-color: var(--theme-bg-alt);
    padding-left: 1rem;
}
```

## Page Reveal Animation

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.reveal {
    animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

## Scroll Behavior

```css
html {
    scroll-behavior: smooth;
}
```

## Animation Duration Guide

| Duration | Usage |
|----------|-------|
| 0.4s | Quick interactions (opacity, simple hovers) |
| 0.8s | Medium transitions (image filter) |
| 1.2s | Slow, premium feel (image scale, reveal) |

## Timing Function Guide

| Function | Usage |
|----------|-------|
| `cubic-bezier(0.16, 1, 0.3, 1)` | Signature easing (image, reveal) |
| `ease` | Simple transitions (opacity) |

## Common Animation Patterns

### Fade In + Slide Up

```css
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Staggered Reveal

```css
.reveal:nth-child(1) { animation-delay: 0s; }
.reveal:nth-child(2) { animation-delay: 0.1s; }
.reveal:nth-child(3) { animation-delay: 0.2s; }
```

### No Animation (for performance-critical)

```css
.no-transition {
    transition: none !important;
}
```
