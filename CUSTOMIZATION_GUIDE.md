# 🎨 Portfolio Customization Guide

Step-by-step instructions to personalize your portfolio.

## 📌 Table of Contents

1. [Quick Edits](#-quick-edits-5-minutes)
2. [Content Updates](#-content-updates)
3. [Design Customization](#-design-customization)
4. [Advanced Changes](#-advanced-changes)

---

## ⚡ Quick Edits (5 Minutes)

### Edit Your Name

**File:** `index.html`  
**Location:** Line ~75, Hero Section

Find:
```html
<h1 class="hero-title">Hi, I'm <span class="accent">Kaleri Santhoshini</span></h1>
```

Replace with:
```html
<h1 class="hero-title">Hi, I'm <span class="accent">YOUR NAME</span></h1>
```

### Edit Your Title

**File:** `index.html`  
**Location:** Line ~76

Find:
```html
<p class="hero-subtitle">Full-Stack Developer | Problem Solver</p>
```

Replace with:
```html
<p class="hero-subtitle">Your Role | Your Specialty</p>
```

### Edit Your Email

**File:** `index.html`

Search for `kalerisanthoshini20@gmail.com` and replace all occurrences with your email:
```html
<a href="mailto:youremail@example.com">youremail@example.com</a>
```

### Edit Your Phone

**File:** `index.html`

Search for `+91 9121353729` and replace with your phone:
```html
<span class="contact-link"><i data-lucide="phone" class="icon icon-sm"></i> +91 XXXXXXXXXX</span>
```

### Edit Your Location

**File:** `index.html`

Search for `India` and replace with your location:
```html
<span class="location"><i data-lucide="map-pin" class="icon icon-sm"></i> Your City, Country</span>
```

---

## 📝 Content Updates

### Update GitHub Link

**File:** `index.html`

Replace all:
```
https://github.com/santhoshinikaleri
```

With:
```
https://github.com/yourusername
```

**Locations:**
- Hero section
- Social links
- Project card links
- Footer

### Update LinkedIn Link

**File:** `index.html`

Replace:
```
https://www.linkedin.com/in/santhoshini-kaleri-7a2326379
```

With:
```
https://www.linkedin.com/in/yourprofile
```

### Update Projects Section

#### Project 1: EchoVerse

**Find this section:**
```html
<article class="project-card featured">
    <div class="project-header">
        <div class="project-icon-wrapper">
            <i data-lucide="headphones" class="icon icon-xl icon-primary icon-hover-lift"></i>
        </div>
```

**Update these fields:**
```html
<!-- Change project title -->
<h3 class="project-title">Your Project Name</h3>

<!-- Change date -->
<p class="project-date">Month YYYY</p>

<!-- Change description -->
<p class="project-description">
    Your project description here...
</p>

<!-- Change tech stack -->
<span class="tech-badge">Technology1</span>
<span class="tech-badge">Technology2</span>

<!-- Change GitHub link -->
<a href="https://github.com/yourname/projectname">
```

**Change project icon:**
```html
<!-- List of Lucide icons: 
     headphones, shield-check, brain, layout-dashboard, 
     cloud-sun, zap, database, atom, etc. -->
<i data-lucide="YOUR_ICON_NAME"></i>
```

### Update Education

**Find Education Section:**
```html
<!-- Education Card 1 -->
<div class="exp-card">
    <h3>Bachelor of Technology</h3>
    <p class="org-name">TKR College of Engineering and Technology</p>
    <p class="exp-duration">2023 – 2027</p>
```

**Update with your details:**
```html
<h3>Your Degree Name</h3>
<p class="org-name">Your College Name</p>
<p class="exp-duration">Your Dates</p>
<p class="exp-detail"><strong>Specialization:</strong> Your Major</p>
<p class="exp-detail"><strong>CGPA:</strong> Your Score</p>
```

### Update Skills

**Find Skills Section:**
```html
<div class="skill-card">
    <div class="skill-card-header">
        <i data-lucide="code" class="icon icon-lg icon-primary"></i>
        <h3>Programming Languages</h3>
    </div>
    <div class="skill-items">
        <span class="skill-badge">Java</span>
        <span class="skill-badge">JavaScript</span>
    </div>
</div>
```

**Edit skill items:**
```html
<span class="skill-badge">Your Skill</span>
```

### Update Certifications

**Find each certification card:**
```html
<div class="cert-card">
    <h3>Salesforce Certified Agentforce Specialist</h3>
    <p class="cert-date">December 2025</p>
```

**Update with your certifications:**
```html
<h3>Your Certification Name</h3>
<p class="cert-issuer">Organization Name</p>
<p class="cert-date">Month Year</p>
<p class="cert-description">Your certification description</p>
```

---

## 🎨 Design Customization

### Change Primary Color

**File:** `style.css`  
**Location:** Top of file, `:root` section (~Line 5)

```css
:root {
  /* Current Indigo color scheme */
  --primary: #4F46E5;        /* ← Change this */
  --primary-dark: #4338CA;   /* ← Change this */
  --primary-light: #6366F1;  /* ← Change this */
  
  /* Accent color */
  --accent: #F59E0B;         /* ← Change this */
  --accent-dark: #D97706;    /* ← Change this */
  --accent-light: #FBBF24;   /* ← Change this */
}
```

### Popular Color Palettes

**Option 1: Slate + Cyan (Modern Tech)**
```css
--primary: #0F172A;
--primary-dark: #020617;
--primary-light: #1E293B;
--accent: #06B6D4;
--accent-dark: #0891B2;
--accent-light: #22D3EE;
```

**Option 2: Rose + Amber (Warm & Professional)**
```css
--primary: #E11D48;
--primary-dark: #BE123C;
--primary-light: #F43F5E;
--accent: #F59E0B;
--accent-dark: #D97706;
--accent-light: #FBBF24;
```

**Option 3: Purple + Pink (Creative)**
```css
--primary: #A855F7;
--primary-dark: #9333EA;
--primary-light: #C084FC;
--accent: #EC4899;
--accent-dark: #DB2777;
--accent-light: #F472B6;
```

**Option 4: Blue + Green (Nature)**
```css
--primary: #2563EB;
--primary-dark: #1D4ED8;
--primary-light: #3B82F6;
--accent: #10B981;
--accent-dark: #059669;
--accent-light: #34D399;
```

### Change Fonts

**File:** `index.html`  
**Location:** `<head>` section, Google Fonts link

Current fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**From [fonts.google.com](https://fonts.google.com):**

1. Find fonts you like
2. Get the import link (e.g., Roboto, Open Sans, etc.)
3. Replace the link in HTML
4. Update CSS:

```css
:root {
  --font-primary: 'Your Font Name', sans-serif;
  --font-display: 'Your Display Font', sans-serif;
}
```

### Adjust Spacing

**File:** `style.css` - `:root` section

```css
/* Spacing System (8px base) */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
```

Increase all values to add more breathing room:
```css
--space-xl: 2.5rem;     /* More space */
--space-2xl: 3.5rem;    /* More space */
```

### Change Border Radius (Roundness)

**File:** `style.css` - `:root` section

```css
--radius-sm: 0.375rem;    /* Minimal rounding */
--radius-md: 0.5rem;      
--radius-lg: 0.75rem;
--radius-xl: 1rem;        /* More rounded */
--radius-2xl: 1.5rem;     /* Very rounded */
```

For more rounded boxes:
```css
--radius-xl: 1.5rem;      /* ← Increase this */
--radius-2xl: 2rem;       /* ← Increase this */
```

### Change Shadow Intensity

**File:** `style.css` - `:root` section

```css
/* Current shadows */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

For stronger shadows:
```css
--shadow-md: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 15px 25px -5px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 25px 40px -8px rgba(0, 0, 0, 0.15);
```

---

## 🔧 Advanced Changes

### Add New Projects

Find the projects grid:
```html
<div class="projects-grid">
    <!-- Existing projects -->
</div>
```

Add new project card:
```html
<article class="project-card">
    <div class="project-header">
        <div class="project-icon-wrapper">
            <i data-lucide="YOUR_ICON" class="icon icon-xl icon-primary"></i>
        </div>
        <a href="YOUR_GITHUB_LINK" class="project-link-icon">
            <i data-lucide="github" class="icon"></i>
        </a>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Description here</p>
        <div class="tech-stack">
            <span class="tech-badge">Tech1</span>
            <span class="tech-badge">Tech2</span>
        </div>
        <div class="project-links">
            <a href="GITHUB_LINK" class="project-link">
                <i data-lucide="github" class="icon"></i>
                Code
            </a>
            <a href="LIVE_LINK" class="project-link">
                <i data-lucide="external-link" class="icon"></i>
                Demo
            </a>
        </div>
    </div>
</article>
```

### Add New Skill Category

Find skills container:
```html
<div class="skills-container">
    <!-- Existing skills -->
</div>
```

Add new card:
```html
<div class="skill-card">
    <div class="skill-card-header">
        <i data-lucide="YOUR_ICON" class="icon icon-lg icon-primary"></i>
        <h3>Category Name</h3>
    </div>
    <div class="skill-items">
        <span class="skill-badge">Skill1</span>
        <span class="skill-badge">Skill2</span>
        <span class="skill-badge">Skill3</span>
    </div>
</div>
```

### Add Custom Sections

Create new section:
```html
<section id="your-section" class="your-section">
    <div class="container">
        <div class="section-header">
            <h2>Section Title</h2>
            <p>Section description</p>
        </div>
        <!-- Your content -->
    </div>
</section>
```

Add styles in CSS:
```css
.your-section {
    padding: var(--space-4xl) 0;
    background: var(--bg-secondary);
}
```

Add navigation link:
```html
<li><a href="#your-section" class="nav-link">Your Section</a></li>
```

### Modify Animation Speed

**File:** `style.css` - `:root` section

```css
--transition: all 0.3s ease;       /* Change 0.3s */
--transition-fast: all 0.15s ease; /* Change 0.15s */
--transition-slow: all 0.5s ease;  /* Change 0.5s */
```

For faster animations:
```css
--transition: all 0.2s ease;       /* Faster */
--transition-slow: all 0.3s ease;  /* Faster */
```

### Change Background Colors

**File:** `style.css`

Light mode (default):
```css
body {
  --bg-primary: #ffffff;      /* Main background */
  --bg-secondary: #F9FAFB;    /* Card background */
  --bg-tertiary: #F3F4F6;     /* Subtle background */
}
```

Dark mode:
```css
[data-theme="dark"] {
  --bg-primary: #0B1120;      /* Main background */
  --bg-secondary: #111827;    /* Card background */
  --bg-tertiary: #1F2937;     /* Subtle background */
}
```

---

## ✅ Testing Your Changes

After each edit:

1. **Save the file** (Ctrl+S or Cmd+S)
2. **Refresh browser** (F5 or Cmd+R)
3. **Check mobile** view (F12 → Toggle device toolbar)
4. **Test functionality**:
   - Dark/light mode toggle
   - All links work
   - Contact form validates
   - Smooth scrolling works

### Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Colors not updating | Clear browser cache (Ctrl+Shift+Delete) |
| Page looks broken | Check HTML syntax (no missing `>` or `<`) |
| Icon doesn't show | Verify correct Lucide icon name |
| Spacing looks off | Check CSS variable names match |
| Mobile looks wrong | Test responsive design in DevTools |

---

## 🎯 Final Checklist

Before deploying changes:

- [ ] All personal information updated
- [ ] No typos or grammatical errors
- [ ] All links tested and working
- [ ] Colors look professional
- [ ] Mobile view looks good
- [ ] Dark mode tested
- [ ] Contact form tested
- [ ] Page loads fast
- [ ] No console errors (F12)

---

## 📚 Resources

- **Lucide Icons:** [lucide.dev](https://lucide.dev)
- **Google Fonts:** [fonts.google.com](https://fonts.google.com)
- **Color Palette Generator:** [coolors.co](https://coolors.co)
- **CSS Validator:** [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator)
- **Responsive Test:** [responsivedesignchecker.com](https://responsivedesignchecker.com)

---

**You've got this! 🚀 Your portfolio is unique now!**