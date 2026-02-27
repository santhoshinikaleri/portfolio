# Quick Start - Backend Contact Form Server

## 🚀 Start the Server (Choose One)

### Option 1: Using npm (Recommended)
```bash
npm start
```

### Option 2: Direct Node
```bash
node server.js
```

---

## ✅ Server Status

**Current Status**: ✅ **RUNNING**

```
Server: http://localhost:5000
Contact API: POST http://localhost:5000/api/contact/send
Health Check: GET http://localhost:5000/api/health
```

---

## 🧪 Test the Server

### Test using PowerShell:
```powershell
# Health Check
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -UseBasicParsing

# Send Test Message
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test Subject"
    message = "This is a test message with more than 10 characters."
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/contact/send" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" `
  -UseBasicParsing
```

### Test using Node:
```bash
node test-contact-form.js
```

---

## 📝 Configuration

**File**: `.env`

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

## 🔌 Frontend Integration

Your frontend is already configured to send contact forms to:
**`http://localhost:5000/api/contact/send`**

Just submit the form from your portfolio website - the backend will handle it!

---

## ⚠️ Troubleshooting

**Error: `EADDRINUSE: address already in use :::5000`**
- Port 5000 is already taken
- Solution: `Get-Process node | Stop-Process` or use `PORT=5001` in `.env`

**Error: Cannot send emails**
- Check Gmail app password in `.env`
- Verify email credentials at https://myaccount.google.com/apppasswords

**Error: CORS errors**
- Verify `FRONTEND_URL` in `.env` matches your actual URL

---

## 📚 Full Documentation

See `BACKEND_CONTACT_FORM_SETUP.md` for:
- Complete setup instructions
- API endpoint details
- Email configuration options
- Deployment guide
- Form validation rules
- Production checklist

---

**Status**: ✅ Setup Complete & Server Running
