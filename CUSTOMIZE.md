# 🎯 Portfolio Customization Quick Guide

## Step-by-Step Personalization

### 1️⃣ Update Your Information (5 minutes)

**In `index.html`, find and update these sections:**

#### Hero Section (Line ~70)
```html
<!-- BEFORE -->
<h1 class="hero-title">Hi, I'm <span class="accent">Your Name</span></h1>
<p class="hero-subtitle">Full-Stack Developer | Web Developer | Problem Solver</p>
<p class="hero-description">I create beautiful, functional websites...</p>

<!-- AFTER - Example -->
<h1 class="hero-title">Hi, I'm <span class="accent">Sarah Anderson</span></h1>
<p class="hero-subtitle">React Developer | UI/UX Enthusiast</p>
<p class="hero-description">I create beautiful, interactive web applications...</p>
```

#### Browser Tab Title (Line ~20)
```html
<!-- Update both places -->
<title>Portfolio | Your Name</title>
<meta property="og:title" content="Portfolio | Your Name">
<meta name="twitter:title" content="Portfolio | Your Name">
```

#### Contact Information (Line ~450-475)
```html
<!-- Email -->
<p><a href="mailto:your.email@example.com">your.email@example.com</a></p>

<!-- Phone -->
<p><a href="tel:+1234567890">+1 (234) 567-890</a></p>

<!-- Location -->
<p>Your City, Country</p>
```

#### Footer (Line ~520)
```html
<p>&copy; 2026 Your Name. All rights reserved.</p>
```

---

### 2️⃣ Customize Projects (10 minutes)

**In `index.html`, update each project card (Lines 140-230):**

```html
<article class="project-card">
    <div class="project-image-placeholder">
        <span>Your Project Name</span>  <!-- Update this -->
    </div>
    <div class="project-content">
        <h3 class="project-title">E-Commerce Platform</h3>  <!-- Your project title -->
        
        <p class="project-description">
            Your project description here. Explain what it does, 
            why you built it, and what problems it solves.
        </p>
        
        <div class="tech-stack">
            <span class="tech-badge">React</span>
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">MongoDB</span>
            <!-- Add/remove technologies you used -->
        </div>
        
        <div class="project-links">
            <!-- Update with your GitHub and Live URLs -->
            <a href="https://github.com/yourusername/your-project" class="project-link">Code</a>
            <a href="https://your-project-demo.com" class="project-link">Live</a>
        </div>
    </div>
</article>
```

**Quick Tips:**
- Keep descriptions 2-3 sentences
- Use accurate tech stack (remove what you didn't use)
- Ensure links are correct and working
- You can have 4+ projects or just 2-3

---

### 3️⃣ Update Skills Section (5 minutes)

**In `index.html`, modify lines 294-350:**

#### About Text
```html
<h3>Who I Am</h3>
<p>Replace this with your story. Include:</p>
<ul>
    <li>Years of experience</li>
    <li>What you're passionate about</li>
    <li>Your specializations</li>
</ul>
```

#### Skill Progress Bars
```html
<!-- Update skill name and width percentage -->
<div class="skill-item">
    <span class="skill-name">React</span>
    <div class="progress-bar">
        <div class="progress-fill" style="width: 90%"></div>  <!-- 0-100% -->
    </div>
</div>
```

#### Skill Categories
- **Frontend**: HTML, CSS, JS, React, Vue, etc.
- **Backend**: Node.js, Express, Python, Django, etc.
- **Databases**: MongoDB, PostgreSQL, MySQL, Firebase, etc.
- **Tools**: Git, Docker, AWS, Figma, etc.

#### Skill Badges
```html
<div class="skill-badges">
    <span class="badge">Git & GitHub</span>
    <span class="badge">Docker</span>
    <!-- Add your tools/skills -->
</div>
```

---

### 4️⃣ Customize Colors (Optional - 5 minutes)

**In `style.css`, find the `:root` section (Lines 7-16):**

```css
:root {
    --primary-color: #0f172a;        /* Main dark color */
    --secondary-color: #1e293b;      /* Secondary dark */
    --accent-color: #3b82f6;         /* Button/Link color */
    --accent-dark: #2563eb;          /* Hover state */
    --text-light: #f1f5f9;           /* Light text */
    --text-dark: #0f172a;            /* Dark text */
    --text-muted: #64748b;           /* Gray text */
    --border-color: #e2e8f0;         /* Border color */
    --success-color: #10b981;        /* Success green */
    --error-color: #ef4444;          /* Error red */
}
```

**Color Palette Ideas:**

**Tech Blue (Current)**
```css
--accent-color: #3b82f6;
--accent-dark: #2563eb;
```

**Professional Indigo**
```css
--accent-color: #6366f1;
--accent-dark: #4f46e5;
```

**Modern Purple**
```css
--accent-color: #8b5cf6;
--accent-dark: #7c3aed;
```

**Vibrant Red**
```css
--accent-color: #ef4444;
--accent-dark: #dc2626;
```

**Teal Green**
```css
--accent-color: #06b6d4;
--accent-dark: #0891b2;
```

---

### 5️⃣ Set Up Contact Form (10 minutes)

**Option A: Using Formspree (Easiest)**

1. Go to https://formspree.io
2. Sign up (free)
3. Create new form
4. Copy your form ID: `f/xxxxxxxxx`
5. In `script.js`, find line ~165 and update:

```javascript
// OLD (this logs to console)
console.log('Form Data Submitted:', formData);

// NEW (sends to Formspree)
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});
```

**Option B: Using EmailJS (No Backend)**

1. Go to https://emailjs.com
2. Sign up (free tier available)
3. Create email service
4. Add template
5. Get your Public Key
6. In `script.js`, add at the top:

```javascript
import emailjs from '@emailjs/browser';
emailjs.init('YOUR_PUBLIC_KEY');
```

7. Update form submission:

```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message
});
```

---

### 6️⃣ Deploy Your Portfolio (15 minutes)

**Easiest: GitHub Pages**

```bash
# 1. Create repository on github.com
#    Name: yourusername.github.io

# 2. Initialize git
cd portfolio
git init
git add .
git commit -m "Initial commit"

# 3. Push to GitHub
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git branch -M main
git push -u origin main
```

**Result:** Your site is live at `https://yourusername.github.io` ✨

**Update after changes:**
```bash
git add .
git commit -m "Update portfolio"
git push
```

---

## 📋 Customization Checklist

- [ ] Update hero section with your name
- [ ] Change tagline to your specialty
- [ ] Update browser tab title
- [ ] Add your contact email
- [ ] Add your phone number
- [ ] Update footer with your name
- [ ] Replace all 4 project examples
- [ ] Update skills and progress bars
- [ ] Change accent color (optional)
- [ ] Set up contact form
- [ ] Deploy to GitHub Pages / Netlify
- [ ] Test on mobile
- [ ] Share with recruiters! 🎉

---

## 🎨 Design Tweaks (Optional)

### Change Font

In `index.html` line 17, change Google Fonts import:

```html
<!-- Current -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

<!-- Alternative 1: Modern -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">

<!-- Alternative 2: Elegant -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
```

Then update in `style.css`:
```css
body {
    font-family: 'Your New Font', sans-serif;
}

.logo {
    font-family: 'Your Mono Font', monospace;
}
```

### Adjust Spacing

In `style.css`, modify padding values:
```css
.hero {
    padding: 80px 0;  /* Change 80 to 60 for compact, 100 for spacious */
}

.projects {
    padding: 100px 0;  /* Same here */
}
```

### Add More Projects

In `index.html`, copy the entire `.project-card` block and paste below the last project. Update all content.

---

## 💡 Tips for Best Results

1. **Photography**: Use high-quality project screenshots
2. **Descriptions**: Write clear, benefit-focused descriptions
3. **Links**: Double-check all GitHub and live URLs work
4. **Mobile**: Test on actual phone (not just browser)
5. **Updates**: Keep portfolio fresh with new projects quarterly

---

## 🆘 Need Help?

- Check main README.md for troubleshooting
- Review code comments in HTML/CSS/JS
- Test in Chrome DevTools (F12)
- Ask on Stack Overflow with code snippets

---

**Your portfolio is ready to impress! Good luck! 🚀**
