# Backend Server Setup Guide - Contact Form

## ✅ Status: Server Running Successfully

Your backend server is now fully configured and running on **http://localhost:5000**

---

## 📋 What's Configured

### Server Features
- **Express.js** backend with CORS enabled
- **Contact form endpoint**: `POST http://localhost:5000/api/contact/send`
- **Health check**: `GET http://localhost:5000/api/health`
- **Email notifications** to admin and auto-reply to users
- **Form validation** on both frontend and backend
- **Error handling** and detailed logging

### Email Configuration
- Uses **Gmail** with app passwords
- Sends notifications to: `kalerisanthoshini20@gmail.com`
- Provides automatic confirmation emails to users

---

## 🚀 How to Run the Server

### Option 1: Using npm start (Recommended)
```bash
cd c:\Users\santh\OneDrive\Desktop\portfolio
npm start
```

### Option 2: Running directly with Node
```bash
cd c:\Users\santh\OneDrive\Desktop\portfolio
node server.js
```

### Option 3: Development mode with auto-reload (requires nodemon)
```bash
npm install -D nodemon
npm run dev
```

---

## 📁 Project Structure

```
portfolio/
├── server.js                    # Backend server (Express.js)
├── script.js                    # Frontend form handling
├── index.html                   # Contact form HTML
├── package.json                 # Dependencies
├── .env                        # Environment variables (CREATED)
├── .env.example                # Example configuration
└── node_modules/               # Dependencies (INSTALLED)
```

---

## 🔧 Configuration Files

### .env File
Located at: `c:\Users\santh\OneDrive\Desktop\portfolio\.env`

**Current Configuration:**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=kalerisanthoshini20@gmail.com
EMAIL_APP_PASSWORD=peyb jkvm kyxg cgtu
ADMIN_EMAIL=kalerisanthoshini20@gmail.com
```

---

## 📨 Email Setup Details

### How It Works:
1. User submits contact form on portfolio website
2. Frontend validates form and sends POST request to backend
3. Backend validates form data again
4. Two emails are sent:
   - **Admin notification** → Your email with form details
   - **User confirmation** → User's email acknowledging receipt

### Current Email Service:
- **Service**: Gmail
- **From**: kalerisanthoshini20@gmail.com
- **App Password**: Used for authentication

### Required Changes for Production:
If you want to change the email configuration, update the `.env` file with:

#### Option 1: Different Gmail Account
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

#### Option 2: SendGrid
```env
EMAIL_SERVICE=SendGrid
EMAIL_USER=apikey
EMAIL_APP_PASSWORD=SG.xxxxxxxxxxxx
```

#### Option 3: Custom SMTP
```env
EMAIL_SERVICE=custom
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

---

## 🧪 Testing the Contact Form

### Test Using PowerShell Script:
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test Subject"
    message = "This is a test message with at least 10 characters."
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/contact/send" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" `
  -UseBasicParsing | Select-Object Content
```

### Test Using cURL:
```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "subject": "Test Subject",
    "message": "This is a test message with more than 10 characters."
  }'
```

### Test Using Frontend:
1. Open http://localhost:3000 (or your frontend URL)
2. Fill out the contact form
3. Click "Send Message"
4. Check your email for confirmation

---

## ✅ API Endpoints

### Health Check
```
GET http://localhost:5000/api/health

Response (200):
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2026-02-27T17:19:58.692Z"
}
```

### Contact Form Submission
```
POST http://localhost:5000/api/contact/send

Request Body:
{
  "name": "Your Name",
  "email": "your@email.com",
  "subject": "Subject (min 5 chars)",
  "message": "Message (min 10 chars)"
}

Success Response (200):
{
  "success": true,
  "message": "Your message has been sent successfully! I will get back to you soon.",
  "data": {
    "timestamp": "2026-02-27T17:19:58.692Z"
  }
}

Error Response (400):
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters",
    "Please provide a valid email address"
  ]
}
```

---

## 📝 Form Validation Rules

Both frontend and backend validate the following:

| Field | Rule | Error Message |
|-------|------|---------------|
| **Name** | Min 2 characters | "Name must be at least 2 characters" |
| **Email** | Valid email format | "Please provide a valid email address" |
| **Subject** | Min 5 characters | "Subject must be at least 5 characters" |
| **Message** | Min 10 characters | "Message must be at least 10 characters" |

---

## 🔍 Troubleshooting

### Issue: Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: 
- Kill the existing process: `Get-Process node | Stop-Process`
- Or change PORT in `.env`: `PORT=5001`

### Issue: Cannot send emails
**Possible Causes**:
- Gmail account doesn't allow less secure apps
- App password is incorrect
- Email credentials not set in `.env`

**Solution**:
- Go to https://myaccount.google.com/apppasswords
- Generate a new app password for "Mail" and "Windows Computer"
- Copy the 16-character password and update `.env`

### Issue: CORS error on frontend
**Check**: Ensure `FRONTEND_URL` in `.env` matches your actual frontend URL

### Issue: Form submission fails
1. Check browser console for error messages
2. Check server logs for validation errors
3. Verify `.env` file has correct email configuration

---

## 📋 Dependencies Installed

```json
{
  "express": "^4.18.2",       // Web framework
  "cors": "^2.8.5",          // Cross-origin requests
  "dotenv": "^16.3.1",       // Environment variables
  "nodemailer": "^6.9.7"     // Email sending
}
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `.env` with production email credentials
- [ ] Change `NODE_ENV=production` in `.env`
- [ ] Update `FRONTEND_URL` to your domain
- [ ] Update `ADMIN_EMAIL` if needed
- [ ] Test contact form thoroughly
- [ ] Set up error logging/monitoring
- [ ] Configure firewall/security for port 5000
- [ ] Use environment variables on hosting platform (never commit `.env`)

---

## 📞 Support

**Current Setup:**
- Server Status: ✅ Running
- Port: 5000
- Email Service: Gmail
- Frontend Endpoint: `http://localhost:5000/api/contact/send`

---

**Last Updated:** February 27, 2026
**Server Version:** 1.0.0
