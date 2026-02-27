# 🚀 Portfolio Contact Form - Backend Setup Guide

## **Quick Start (5 minutes)**

### **1. Install Dependencies**

Navigate to your portfolio directory and run:

```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - Enable cross-origin requests
- `nodemailer` - Send emails
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server during development

### **2. Configure Environment Variables**

Create a `.env` file in your portfolio directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

ADMIN_EMAIL=your-email@gmail.com
```

### **3. Gmail Setup (Recommended)**

#### **Method A: Using Gmail App Password (Secure & Recommended)**

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go to "App passwords" (search in Security)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password to your `.env` file as `EMAIL_APP_PASSWORD`

**Example:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

#### **Method B: Using Gmail Password (Less Secure)**

If you don't want to use App Passwords:
1. Enable "Less secure app access" in Gmail settings
2. Use your regular Gmail password in `.env`

### **4. Start the Server**

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   PORTFOLIO BACKEND SERVER STARTED         ║
╚════════════════════════════════════════════╝
🚀 Server running on: http://localhost:5000
📬 Contact API: POST http://localhost:5000/api/contact/send
```

---

## **📁 File Structure**

```
portfolio/
├── index.html          # Main portfolio page (already updated)
├── script.js           # Frontend JavaScript (already updated with fetch)
├── style.css           # Styles
├── server.js           # Backend Express server (NEW)
├── package.json        # Node dependencies (NEW)
├── .env.example        # Environment variables template (NEW)
├── .env                # Your actual env variables (CREATE YOURSELF)
└── .gitignore          # Add .env to ignore list
```

**Important:** Add `.env` to `.gitignore` so passwords aren't committed:

```bash
# .gitignore
node_modules/
.env
.env.local
.DS_Store
```

---

## **🧪 Testing the Contact Form**

### **1. Verify Health Check**

Open browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-02-26T10:30:00.000Z"
}
```

### **2. Test Contact Form Submission**

Fill out the contact form on your portfolio page and click "Send Message".

#### **Console Should Show:**

**Frontend Console (Browser F12):**
```
📤 Sending contact form data: {name: "...", email: "...", ...}
✅ Success response: {success: true, ...}
```

**Backend Console (Terminal):**
```
[2024-02-26T10:30:00.000Z] POST /api/contact/send
📨 Contact form submission received:
   - Name: John Doe
   - Email: john@example.com
   - Subject: Project Inquiry
✓ Validation passed
📧 Sending admin notification...
✓ Admin notification sent
📧 Sending user confirmation...
✓ User confirmation sent
✅ Contact form processed successfully
```

### **3. Test with cURL**

```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message for the contact form"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I will get back to you soon.",
  "data": {
    "timestamp": "2024-02-26T10:30:00.000Z"
  }
}
```

---

## **🔍 Troubleshooting**

### **Issue: "CORS error" in browser console**

**Solution:** Make sure `FRONTEND_URL` in `.env` matches your frontend URL:
```env
FRONTEND_URL=http://localhost:3000
```

### **Issue: "Gmail authentication failed"**

**Solutions:**
1. Double-check your email and app password in `.env`
2. Use the exact app password (16 characters with spaces)
3. Make sure 2-Step Verification is enabled on your Gmail account
4. Try "Less secure app access" if issues persist

### **Issue: "Cannot POST /api/contact/send"**

**Solutions:**
1. Check that server is running on port 5000
2. Make sure `FRONTEND_URL` in `.env` is correct
3. Check browser console for CORS errors
4. Verify `submitForm()` is being called in browser

### **Issue: Emails not being sent but form shows success**

**Solutions:**
1. Check backend console for email sending errors
2. Verify `EMAIL_USER` and `EMAIL_APP_PASSWORD` are correct
3. Check if emails are in your Gmail spam folder
4. Make sure 2-Step Verification is enabled

### **Issue: "Cannot find module express"**

**Solution:** Run `npm install` to install all dependencies

---

## **📊 Email Flow**

```
User submits form
    ↓
Frontend validates data
    ↓
Frontend sends fetch POST to http://localhost:5000/api/contact/send
    ↓
Backend receives request
    ↓
Backend validates data
    ↓
Backend sends 2 emails:
  - Admin notification (to: ADMIN_EMAIL)
  - User confirmation (to: user's email)
    ↓
Backend sends success response
    ↓
Frontend shows "Message sent successfully!"
    ↓
Frontend clears form
```

---

## **🔐 Security Features**

✅ **Input Validation** - All fields validated on backend
✅ **HTML Escaping** - Prevents XSS attacks
✅ **CORS Protection** - Only allows requests from frontend URL
✅ **Error Handling** - Sensitive errors not exposed in production
✅ **Email Validation** - Regex validation for email format
✅ **Environment Variables** - Credentials not hardcoded

---

## **📧 Customizing Email Templates**

Edit the email HTML in `server.js`:

**Admin notification:** Lines 100-120
**User confirmation:** Lines 130-145

Examples:
```javascript
// Add custom branding
// Add company logo
// Change colors
// Add footer with social links
// Add contact information
```

---

## **🌐 Deploying to Production**

### **Option 1: Heroku (Free)**

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set EMAIL_USER=your-email@gmail.com`
5. Deploy: `git push heroku main`

### **Option 2: Render (Free)**

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service
4. Set environment variables in Render dashboard
5. Deploy automatically

### **Option 3: Railway (Free)**

1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Deploy server.js
4. Configure environment variables

---

## **📞 Support**

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review backend console logs
3. Check browser console (F12) for CORS/network errors
4. Verify all environment variables are set correctly
5. Make sure Node.js version >= 14.0.0: `node --version`

---

## **✅ Checklist Before Going Live**

- [ ] `.env` file created and filled with actual values
- [ ] `.env` added to `.gitignore`
- [ ] Dependencies installed: `npm install`
- [ ] Server starts successfully: `npm start`
- [ ] Health check works: GET `/api/health`
- [ ] Contact form submits without CORS errors
- [ ] Emails are being received
- [ ] Error messages display properly
- [ ] Form clears after successful submission
- [ ] "Loading" state works with spinner
- [ ] Success message displays for 5 seconds

---

## **🎉 Success!**

Your contact form should now be fully functional with:
- ✅ Frontend validation
- ✅ Backend validation
- ✅ Email notifications
- ✅ Error handling
- ✅ CORS configured
- ✅ Console logging for debugging

Happy coding! 🚀
