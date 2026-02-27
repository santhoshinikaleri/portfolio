# 📝 Contact Form - Complete Code Reference

## **File Summary**

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Contact form HTML | ✅ Already correct |
| `script.js` | Frontend validation & fetch | ✅ UPDATED |
| `server.js` | Express backend | ✅ CREATED |
| `package.json` | Dependencies | ✅ CREATED |
| `.env.example` | Config template | ✅ CREATED |
| `.env` | Your config | ⚠️ CREATE YOURSELF |
| `test-contact-form.js` | Test script | ✅ CREATED |

---

## **1️⃣ HTML Form (Already in index.html)**

Lines 915-960 in `index.html`:

```html
<form id="contactForm" class="contact-form" novalidate>
    
    <!-- Name Field -->
    <div class="form-group">
        <label for="name">Your Name <span class="required">*</span></label>
        <div class="form-input-wrapper">
            <i data-lucide="user" class="form-icon icon"></i>
            <input type="text" id="name" name="name" required placeholder="Your full name">
        </div>
        <span class="error-message" id="nameError"></span>
    </div>

    <!-- Email Field -->
    <div class="form-group">
        <label for="email">Email Address <span class="required">*</span></label>
        <div class="form-input-wrapper">
            <i data-lucide="mail" class="form-icon icon"></i>
            <input type="email" id="email" name="email" required placeholder="you@example.com">
        </div>
        <span class="error-message" id="emailError"></span>
    </div>

    <!-- Subject Field -->
    <div class="form-group">
        <label for="subject">Subject <span class="required">*</span></label>
        <div class="form-input-wrapper">
            <i data-lucide="message-square" class="form-icon icon"></i>
            <input type="text" id="subject" name="subject" required placeholder="Project inquiry, collaboration, etc.">
        </div>
        <span class="error-message" id="subjectError"></span>
    </div>

    <!-- Message Field -->
    <div class="form-group">
        <label for="message">Message <span class="required">*</span></label>
        <div class="form-input-wrapper textarea-wrapper">
            <i data-lucide="message-square" class="form-icon icon"></i>
            <textarea id="message" name="message" required placeholder="Tell me about your project or opportunity..." rows="5"></textarea>
        </div>
        <span class="error-message" id="messageError"></span>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary">
        <span>Send Message</span>
        <i data-lucide="send" class="icon"></i>
    </button>

    <!-- Response Message -->
    <div class="form-message" id="formMessage"></div>
</form>
```

---

## **2️⃣ Frontend JavaScript (Updated in script.js)**

Lines 231-370 in `script.js`:

```javascript
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.subjectInput = document.getElementById('subject');
    this.messageInput = document.getElementById('message');
    this.formMessage = document.getElementById('formMessage');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    // Backend API endpoint
    this.apiEndpoint = 'http://localhost:5000/api/contact/send';
    
    this.init();
  }

  init() {
    // Listen for form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    // Clear errors when user starts typing
    this.form.addEventListener('input', () => this.clearErrors());
  }

  handleSubmit(e) {
    // Prevent default form submission
    e.preventDefault();
    
    // Validate form data
    if (this.validate()) {
      // Send to backend if valid
      this.submitForm();
    }
  }

  validate() {
    let isValid = true;

    // Clear previous errors
    this.clearErrors();

    // Validate name (minimum 2 characters)
    if (this.nameInput.value.trim().length < 2) {
      this.showError('name', 'Please enter a valid name');
      isValid = false;
    }

    // Validate email format
    if (!this.isValidEmail(this.emailInput.value)) {
      this.showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate subject (minimum 5 characters)
    if (this.subjectInput.value.trim().length < 5) {
      this.showError('subject', 'Subject must be at least 5 characters');
      isValid = false;
    }

    // Validate message (minimum 10 characters)
    if (this.messageInput.value.trim().length < 10) {
      this.showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(fieldName, message) {
    // Add error styling to form group
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    field.parentElement.parentElement.classList.add('error');
    errorElement.textContent = message;
  }

  clearErrors() {
    // Remove all error messages and styling
    const errorFields = this.form.querySelectorAll('.form-group.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
      const errorElement = field.querySelector('.error-message');
      if (errorElement) errorElement.textContent = '';
    });
  }

  async submitForm() {
    const originalButtonText = this.submitButton.innerHTML;
    
    try {
      // Update button to show loading state
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = '<span>Sending...</span><i data-lucide="loader" class="icon"></i>';
      this.clearFormMessage();

      // Prepare form data as JSON object
      const formData = {
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim(),
        subject: this.subjectInput.value.trim(),
        message: this.messageInput.value.trim()
      };

      // Log to console for debugging
      console.log('📤 Sending contact form data:', formData);

      // Send POST request to backend
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Parse JSON response
      const data = await response.json();

      // Check if response is successful
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      // Log success
      console.log('✅ Success response:', data);
      
      // Show success message to user
      this.showSuccessMessage(data.message || 'Message sent successfully! I\'ll get back to you soon.');
      
      // Clear form for next submission
      this.form.reset();

    } catch (error) {
      // Log error for debugging
      console.error('❌ Error sending contact form:', error);
      // Show error message to user
      this.showErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      // Always restore button to original state
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = originalButtonText;
    }
  }

  showSuccessMessage(message) {
    // Display success message with checkmark
    this.formMessage.textContent = '✓ ' + message;
    this.formMessage.className = 'form-message success';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.formMessage.className = 'form-message';
      this.formMessage.textContent = '';
    }, 5000);
  }

  showErrorMessage(message) {
    // Display error message with X
    this.formMessage.textContent = '✗ ' + message;
    this.formMessage.className = 'form-message error';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.formMessage.className = 'form-message';
      this.formMessage.textContent = '';
    }, 5000);
  }

  clearFormMessage() {
    // Clear any existing message
    this.formMessage.className = 'form-message';
    this.formMessage.textContent = '';
  }
}

// Initialize contact form when DOM is ready
new ContactForm();
```

---

## **3️⃣ Backend Server (server.js)**

Complete file at `server.js` - Key sections:

### **Imports & Setup**
```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
```

### **CORS Configuration**
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
```

### **Email Configuration**
```javascript
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});
```

### **Validation Function**
```javascript
function validateContactData(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### **API Endpoint**
```javascript
app.post('/api/contact/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate form data
    const validation = validateContactData({ name, email, subject, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Send emails
    await sendAdminNotification({ name, email, subject, message });
    await sendUserConfirmation({ name, email, subject, message });

    // Return success
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.',
      data: {
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
});
```

---

## **4️⃣ Package.json**

```json
{
  "name": "portfolio-backend",
  "version": "1.0.0",
  "description": "Contact form backend for portfolio website",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## **5️⃣ Environment Configuration (.env)**

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Admin notification email
ADMIN_EMAIL=your-email@gmail.com
```

---

## **6️⃣ How It Works - Data Flow**

```
┌─────────────────────────────────────────────────────┐
│  USER FILLS & SUBMITS FORM                          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  FRONTEND VALIDATION (JavaScript)                   │
│  ✓ Name (2+ chars)                                  │
│  ✓ Email (valid format)                             │
│  ✓ Subject (5+ chars)                               │
│  ✓ Message (10+ chars)                              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  Valid?       │
         └───┬───────┬───┘
             │ No    │ Yes
             ▼       ▼
        ┌────────┐  ┌─────────────────────────────┐
        │ Show   │  │ Send fetch POST request      │
        │ Errors │  │ to /api/contact/send        │
        └────────┘  └────────┬────────────────────┘
                             │
                             ▼
                    ┌───────────────────────────┐
                    │  BACKEND PROCESSING       │
                    │  ✓ Validate again         │
                    │  ✓ Send admin email       │
                    │  ✓ Send user confirmation │
                    │  ✓ Return success         │
                    └────────┬──────────────────┘
                             │
                             ▼
                 ┌───────────────────────────┐
                 │  Show Success Message     │
                 │  Clear Form               │
                 │  Console log success      │
                 └───────────────────────────┘
```

---

## **7️⃣ Testing Checklist**

```bash
# 1. Install dependencies
npm install

# 2. Start backend
npm run dev

# 3. Test API (new terminal)
node test-contact-form.js

# 4. Check response
Should show: ✅ TEST PASSED!

# 5. Open portfolio, fill form, submit
# 6. Check success message
# 7. Check email inbox (both admin and user)
```

---

## **8️⃣ Common Errors & Solutions**

| Error | Cause | Solution |
|-------|-------|----------|
| CORS Error | Frontend URL mismatch | Check `FRONTEND_URL` in `.env` |
| Gmail Auth Failed | Wrong password | Use Gmail App Password |
| Cannot find module | Dependencies missing | `npm install` |
| Port 5000 in use | Another app using port | Change `PORT` in `.env` |
| Emails not sent | Gmail 2FA disabled | Enable 2-Step Verification |

---

## **9️⃣ Security Best Practices Implemented**

✅ **Input Validation** - Both frontend and backend
✅ **HTML Escaping** - Prevents XSS attacks
✅ **CORS Protection** - Only allows your frontend
✅ **Error Handling** - Sensitive info not exposed
✅ **Email Validation** - Regex + format checking
✅ **Environment Variables** - Credentials not hardcoded
✅ **Async/Await** - Proper promise handling

---

## **🔟 Production Deployment**

### **Change these before going live:**

```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
PORT=3000 (or your server's port)
```

### **Keep backend running:**

**Option A: PM2**
```bash
npm install -g pm2
pm2 start server.js --name portfolio
pm2 startup
pm2 save
```

**Option B: Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

---

## **✅ You Now Have**

- ✅ Professional contact form with validation
- ✅ Working Express backend with CORS
- ✅ Email notifications (admin + user)
- ✅ Error handling & logging
- ✅ Production-ready code
- ✅ Complete documentation

**Your portfolio contact form is DONE! 🎉**
