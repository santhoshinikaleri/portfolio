# 💻 Creative Profile Image - Code Reference

## HTML Code Added (index.html)

### Complete Profile Image Section
**Location:** Lines 107-188 in index.html
**Replaces:** Old code-block-wrapper section

```html
<div class="hero-visual">
    <!-- Creative Profile Image Container -->
    <div class="profile-image-wrapper">
        <!-- Animated Light Rays Background -->
        <div class="light-rays">
            <div class="ray ray-1"></div>
            <div class="ray ray-2"></div>
            <div class="ray ray-3"></div>
        </div>

        <!-- Floating Gradient Ring -->
        <div class="gradient-ring"></div>

        <!-- Halo Glow Effect -->
        <div class="halo-glow"></div>

        <!-- Main Profile Container -->
        <div class="profile-circle-container">
            <!-- Animated Border Ring -->
            <div class="animated-border-ring"></div>

            <!-- Glassmorphism Background Card -->
            <div class="profile-glass-background"></div>

            <!-- Profile Image -->
            <div class="profile-image-holder">
                <!-- Since we don't have an actual image, we'll use SVG with gradient -->
                <svg class="profile-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#0EA5E9;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#22D3EE;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Background Circle -->
                    <circle cx="100" cy="100" r="100" fill="url(#profileGradient)" opacity="0.1"/>
                    
                    <!-- Avatar Base -->
                    <circle cx="100" cy="85" r="35" fill="url(#profileGradient)"/>
                    
                    <!-- Head Shape -->
                    <ellipse cx="100" cy="75" rx="30" ry="35" fill="rgba(255,255,255,0.9)"/>
                    
                    <!-- Body Shape -->
                    <path d="M 70 120 Q 70 110 100 110 Q 130 110 130 120 L 130 160 Q 100 175 70 160 Z" fill="rgba(14, 165, 233, 0.15)"/>
                </svg>

                <!-- Initials Fallback -->
                <div class="profile-initials">KS</div>
            </div>

            <!-- Floating Tech Icons Around Profile -->
            <div class="floating-tech-icon floating-icon-1">
                <i data-lucide="react" class="icon icon-md"></i>
            </div>
            <div class="floating-tech-icon floating-icon-2">
                <i data-lucide="code-2" class="icon icon-md"></i>
            </div>
            <div class="floating-tech-icon floating-icon-3">
                <i data-lucide="zap" class="icon icon-md"></i>
            </div>
        </div>

        <!-- Subtle Particle Background -->
        <div class="profile-particle-bg">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>

        <!-- Wave Divider Below Profile -->
        <svg class="wave-divider-mini" viewBox="0 0 300 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgba(14, 165, 233, 0.2);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgba(34, 211, 238, 0.05);stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M0,20 Q75,0 150,20 T300,20 L300,60 L0,60 Z" fill="url(#waveGradient)" opacity="0.6"/>
        </svg>
    </div>
</div>
```

---

## CSS Code Added (style.css)

### 1. Hero Visual Container
```css
.hero-visual {
  animation: slideInRight 0.8s ease forwards;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 2. Light Rays Animation
```css
.light-rays {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}

.ray {
  position: absolute;
  opacity: 0;
  animation: rayFloat 6s ease-in-out infinite;
}

.ray-1 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.ray-2 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%);
  bottom: 20%;
  left: 5%;
  animation-delay: 2s;
}

.ray-3 {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%);
  top: 30%;
  left: 15%;
  animation-delay: 4s;
}

@keyframes rayFloat {
  0%, 100% { opacity: 0; transform: translate(0, 0); }
  50% { opacity: 0.6; transform: translate(10px, 15px); }
}
```

### 3. Gradient Ring
```css
.gradient-ring {
  position: absolute;
  width: 360px;
  height: 360px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: linear-gradient(45deg, #6366F1, #0EA5E9, #22D3EE, #6366F1);
  background-size: 300% 300%;
  animation: gradientRotate 8s ease infinite, ringFloat 4s ease-in-out infinite;
  opacity: 0.6;
  z-index: 0;
  filter: blur(20px);
  pointer-events: none;
}

@keyframes gradientRotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes ringFloat {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
}
```

### 4. Halo Glow Effect
```css
.halo-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 70%);
  filter: blur(40px);
  animation: haloPulse 3s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes haloPulse {
  0%, 100% { 
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.15);
  }
}
```

### 5. Profile Circle Container
```css
.profile-circle-container {
  position: relative;
  width: 280px;
  height: 280px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: profileScaleIn 0.8s ease forwards;
}

@keyframes profileScaleIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 6. Animated Border Ring
```css
.animated-border-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
  background: 
    linear-gradient(45deg, #6366F1, #0EA5E9, #22D3EE, #6366F1) border-box,
    linear-gradient(rgba(240, 249, 255, 0.7), rgba(240, 249, 255, 0.7)) border-box;
  background-size: 300% 300%, 100% 100%;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradientRotate 6s ease infinite;
  z-index: 1;
}
```

### 7. Glassmorphism Background
```css
.profile-glass-background {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: rgba(240, 249, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(14, 165, 233, 0.2);
  z-index: 2;
}
```

### 8. Profile Image Holder
```css
.profile-image-holder {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  background: linear-gradient(135deg, rgba(245, 248, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 100%);
  box-shadow: 
    0 0 40px rgba(99, 102, 241, 0.3),
    0 0 80px rgba(14, 165, 233, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -30px 60px rgba(14, 165, 233, 0.1);
  transition: var(--transition);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image-holder:hover {
  transform: scale(1.05);
  box-shadow: 
    0 0 60px rgba(99, 102, 241, 0.4),
    0 0 120px rgba(14, 165, 233, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -30px 60px rgba(14, 165, 233, 0.15);
}
```

### 9. Profile SVG and Initials
```css
.profile-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeInUp 1s ease 0.3s forwards;
  opacity: 0;
}

.profile-initials {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #22D3EE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-display);
  z-index: 4;
  animation: fadeInUp 0.8s ease forwards;
}
```

### 10. Floating Tech Icons
```css
.floating-tech-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(240, 249, 255, 0.9);
  border: 2px solid rgba(14, 165, 233, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 
    0 8px 16px rgba(14, 165, 233, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  animation: iconFloat 4s ease-in-out infinite;
  z-index: 4;
  transition: var(--transition);
  cursor: grab;
}

.floating-tech-icon:hover {
  transform: scale(1.15);
  border-color: var(--primary);
  box-shadow: 
    0 12px 24px rgba(14, 165, 233, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.floating-icon-1 {
  top: -20px;
  right: 30px;
  animation-delay: 0s;
}

.floating-icon-2 {
  top: 60px;
  right: -20px;
  animation-delay: 1.3s;
}

.floating-icon-3 {
  bottom: 40px;
  right: 10px;
  animation-delay: 2.6s;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-15px) translateX(-5px); }
  75% { transform: translateY(-5px) translateX(10px); }
}
```

### 11. Particle Background
```css
.profile-particle-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 8s ease-in-out infinite;
}

.particle-1 {
  width: 4px;
  height: 4px;
  background: rgba(99, 102, 241, 0.6);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  width: 3px;
  height: 3px;
  background: rgba(14, 165, 233, 0.5);
  top: 60%;
  right: 25%;
  animation-delay: 2s;
}

.particle-3 {
  width: 5px;
  height: 5px;
  background: rgba(34, 211, 238, 0.4);
  bottom: 25%;
  left: 30%;
  animation-delay: 4s;
}

.particle-4 {
  width: 3px;
  height: 3px;
  background: rgba(99, 102, 241, 0.5);
  top: 40%;
  right: 35%;
  animation-delay: 1s;
}

@keyframes particleFloat {
  0%, 100% { 
    opacity: 0;
    transform: translate(0, 0);
  }
  50% { 
    opacity: 1;
    transform: translate(30px, -30px) scale(1.2);
  }
}
```

### 12. Wave Divider
```css
.wave-divider-mini {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 60px;
  z-index: 2;
  animation: waveFloat 3s ease-in-out infinite;
}

@keyframes waveFloat {
  0%, 100% { 
    opacity: 0.4;
    transform: translateX(-50%) translateY(0);
  }
  50% { 
    opacity: 0.7;
    transform: translateX(-50%) translateY(-10px);
  }
}
```

### 13. Responsive Design (768px)
```css
@media (max-width: 768px) {
  .profile-circle-container {
    width: 200px;
    height: 200px;
    margin-top: var(--space-2xl);
  }
  
  .gradient-ring {
    width: 260px;
    height: 260px;
  }
  
  .halo-glow {
    width: 230px;
    height: 230px;
  }
  
  .profile-image-holder {
    width: 180px;
    height: 180px;
  }
  
  .profile-initials {
    font-size: 3rem;
  }
  
  .floating-tech-icon {
    width: 50px;
    height: 50px;
  }
  
  .floating-icon-1 {
    top: -15px;
    right: 20px;
  }
  
  .floating-icon-2 {
    top: 50px;
    right: -15px;
  }
  
  .floating-icon-3 {
    bottom: 30px;
    right: 5px;
  }
  
  .wave-divider-mini {
    width: 250px;
    height: 50px;
  }
  
  .hero-visual {
    margin-top: var(--space-2xl);
  }
}
```

### 14. Responsive Design (480px)
```css
@media (max-width: 480px) {
  .profile-circle-container {
    width: 160px;
    height: 160px;
  }
  
  .gradient-ring {
    width: 200px;
    height: 200px;
  }
  
  .halo-glow {
    width: 180px;
    height: 180px;
  }
  
  .profile-image-holder {
    width: 140px;
    height: 140px;
  }
  
  .profile-initials {
    font-size: 2.5rem;
  }
  
  .floating-tech-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .floating-icon-1 {
    top: -10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }
  
  .floating-icon-2 {
    top: 40px;
    right: -10px;
  }
  
  .floating-icon-3 {
    bottom: 20px;
    right: 0;
  }
  
  .light-rays {
    display: none;
  }
  
  .wave-divider-mini {
    display: none;
  }
}
```

---

## SVG Gradient Definition

The profile avatar uses an inline SVG with a gradient:

```svg
<svg class="profile-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#0EA5E9;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#22D3EE;stop-opacity:1" />
        </linearGradient>
    </defs>
    <!-- Avatar shapes -->
</svg>
```

---

## Key CSS Properties Used

```css
/* Positioning */
position: absolute/relative
inset: shorthand for all offsets
z-index: layer stacking

/* Layout */
display: flex
align-items: center
justify-content: center

/* Animation */
animation: name duration timing infinite
@keyframes: animation definitions

/* Styling */
background: gradients
box-shadow: multiple shadows
border-radius: 50% (circles)
filter: blur, opacity
backdrop-filter: blur

/* Transforms */
transform: translate, scale, rotate
opacity: 0-1 range

/* Effects */
gradients: linear and radial
shadows: glow effects
blur: soft appearance
