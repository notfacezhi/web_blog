# Component Library

## Navigation

### Fixed Header with Backdrop

```html
<nav class="nav-header">
    <div class="container flex justify-between items-center">
        <a href="#" class="brand-logo tracking-tight">BRAND®</a>
        <ul class="nav-links uppercase">
            <li><a href="#" class="tracking-wide">Link</a></li>
        </ul>
        <div class="nav-location uppercase tracking-wide">Location</div>
    </div>
</nav>
```

```css
.nav-header {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid var(--theme-border);
    position: fixed;
    top: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(180%) blur(20px);
    z-index: 1000;
    display: flex;
    align-items: center;
}

.brand-logo {
    font-weight: 900;
    font-size: 1.25rem;
    text-decoration: none;
    color: var(--theme-text);
    flex-shrink: 0;
}

.nav-links {
    list-style: none;
    gap: 3rem;
    flex: 1;
    display: flex;
    justify-content: center;
}

.nav-links a {
    text-decoration: none;
    color: var(--theme-text);
    font-size: 0.7rem;
    font-weight: 500;
    opacity: 0.4;
    transition: opacity 0.4s ease;
}

.nav-links a:hover { opacity: 1; }

.nav-location {
    font-size: 0.6rem;
    font-weight: 800;
    flex-shrink: 0;
}
```

## Section Header

```html
<div class="section-header">
    <span class="section-label uppercase tracking-wide">01 / Section</span>
    <span style="font-size: 0.65rem; opacity: 0.4;">Description</span>
</div>
```

```css
.section-header {
    border-top: 1px solid var(--theme-text);
    padding-top: 1.5rem;
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-between;
}

.section-label {
    font-size: 0.65rem;
    font-weight: 800;
}
```

## Image Container

```html
<div class="img-container">
    <img src="..." alt="..." class="minimal-img">
</div>
```

```css
.img-container {
    overflow: hidden;
    background-color: var(--theme-bg-alt);
}

.minimal-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.img-container:hover .minimal-img {
    filter: grayscale(0%);
    transform: scale(1.05);
}
```

## Archive Item

```html
<a href="#" class="archive-item">
    <span class="archive-year">2024</span>
    <div class="img-container archive-thumb">
        <img src="..." alt="..." class="minimal-img">
    </div>
    <span class="archive-title tracking-tight">Project Title</span>
    <span class="archive-cat">Category</span>
    <span style="text-align: right;">→</span>
</a>
```

```css
.archive-item {
    display: grid;
    grid-template-columns: 80px 100px 1.5fr 1fr 1fr;
    padding: 2rem 0;
    border-bottom: 1px solid var(--theme-border);
    text-decoration: none;
    color: var(--theme-text);
    transition: all 0.4s ease;
    align-items: center;
    gap: 2rem;
}

.archive-item:hover {
    background-color: var(--theme-bg-alt);
    padding-left: 1rem;
}

.archive-thumb {
    width: 100px;
    height: 60px;
    background-color: #eee;
}

.archive-year { font-size: 0.7rem; opacity: 0.4; }
.archive-title { font-size: 1.5rem; font-weight: 700; }
.archive-cat { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; }
```

## Essence Card

```html
<div class="essence-card">
    <div class="img-container" style="height: 120px; width: 100%;">
        <img src="..." alt="..." class="minimal-img">
    </div>
    <div>
        <h3 class="uppercase tracking-tight">Title</h3>
        <p>Description text</p>
    </div>
</div>
```

```css
.essence-card {
    background-color: var(--theme-bg);
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.essence-card h3 {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.essence-card p {
    font-size: 0.9rem;
    opacity: 0.6;
    font-weight: 300;
}
```

## Spec Box

```html
<div class="spec-box">
    <span class="spec-label uppercase tracking-wide">Label</span>
    <span class="spec-value">Value</span>
</div>
```

```css
.spec-box {
    background-color: var(--theme-bg);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.spec-label { font-size: 0.6rem; font-weight: 800; opacity: 0.4; }
.spec-value { font-size: 2rem; font-weight: 200; }
```

## Footer

```html
<footer>
    <div class="footer-grid">
        <div>
            <h4 class="footer-title uppercase tracking-wide">BRAND</h4>
            <p style="font-size: 0.8rem; opacity: 0.5; font-weight: 300;">Tagline</p>
        </div>
        <div>
            <h4 class="footer-title uppercase tracking-wide">Nav</h4>
            <ul class="footer-links">
                <li><a href="#">Link</a></li>
            </ul>
        </div>
    </div>
</footer>
```

```css
footer {
    padding: 8rem 0 4rem;
    border-top: 1px solid var(--theme-border);
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4vw;
    padding-bottom: 4rem;
}

.footer-title {
    font-size: 0.65rem;
    font-weight: 900;
    margin-bottom: 2rem;
}

.footer-links { list-style: none; }
.footer-links li { margin-bottom: 0.5rem; }
.footer-links a {
    text-decoration: none;
    color: var(--theme-text);
    font-size: 0.8rem;
    opacity: 0.5;
}
```

## Scrollbar

```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--theme-bg); }
::-webkit-scrollbar-thumb { background: var(--theme-text); }
```
