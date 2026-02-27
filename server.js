/**
 * Portfolio Contact Form Backend
 * Express.js Server with Contact Form API
 * 
 * Features:
 * - CORS enabled for frontend communication
 * - Contact form submission endpoint
 * - Email validation and error handling
 * - Console logging for debugging
 * - Production-ready error handling
 */

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====

// CORS Configuration - Allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== SERVE STATIC FILES =====
// Serve frontend files (HTML, CSS, JS)
app.use(express.static('.'));
app.use(express.static('./public'));

// Root path serves index.html
app.get('/', (req, res) => {
  res.sendFile(new URL('../index.html', import.meta.url).pathname);
});

// ===== LOGGING MIDDLEWARE =====
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ===== EMAIL CONFIGURATION =====
// Configure your email service here
// Options:
// 1. Gmail (requires App Password)
// 2. SendGrid
// 3. Mailgun
// 4. Custom SMTP

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_APP_PASSWORD
  }
});

// Alternative: Custom SMTP configuration
// Uncomment below to use custom SMTP instead
/*
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});
*/

// ===== UTILITY FUNCTIONS =====

/**
 * Validate contact form data
 * @param {Object} data - Form data to validate
 * @returns {Object} - Validation result with errors array
 */
function validateContactData(data) {
  const errors = [];

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  // Validate subject
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters');
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Send email notification to admin
 * @param {Object} formData - Contact form data
 */
async function sendAdminNotification(formData) {
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact Form Submission: ${formData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(formData.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Received at: ${new Date().toLocaleString()}</small></p>
    `
  };

  return transporter.sendMail(adminMailOptions);
}

/**
 * Send auto-reply email to user
 * @param {Object} formData - Contact form data
 */
async function sendUserConfirmation(formData) {
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: formData.email,
    subject: 'We received your message!',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${escapeHtml(formData.name)},</p>
      <p>We have received your message and will get back to you as soon as possible.</p>
      <hr>
      <p><strong>Your Message:</strong></p>
      <p><strong>Subject:</strong> ${escapeHtml(formData.subject)}</p>
      <p>${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p>Best regards,<br>Kaleri Santhoshini</p>
    `
  };

  return transporter.sendMail(userMailOptions);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ===== ROUTES =====

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  console.log('✓ Health check passed');
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Contact form submission endpoint
 * POST /api/contact/send
 */
app.post('/api/contact/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log('📨 Contact form submission received:');
    console.log(`   - Name: ${name}`);
    console.log(`   - Email: ${email}`);
    console.log(`   - Subject: ${subject}`);

    // ===== VALIDATION =====
    const validation = validateContactData({ name, email, subject, message });
    if (!validation.isValid) {
      console.warn('❌ Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    console.log('✓ Validation passed');

    // ===== SEND EMAILS =====
    try {
      console.log('📧 Sending admin notification...');
      await sendAdminNotification({ name, email, subject, message });
      console.log('✓ Admin notification sent');

      console.log('📧 Sending user confirmation...');
      await sendUserConfirmation({ name, email, subject, message });
      console.log('✓ User confirmation sent');
    } catch (emailError) {
      console.error('⚠️ Email sending error:', emailError.message);
      // Don't fail the request if email fails
      // You might want to log this to a database or service
    }

    // ===== SUCCESS RESPONSE =====
    console.log('✅ Contact form processed successfully');
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.',
      data: {
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Server error:', error.message);
    console.error('Stack:', error.stack);

    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   PORTFOLIO BACKEND SERVER STARTED         ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📬 Contact API: POST http://localhost:${PORT}/api/contact/send`);
  console.log(`❤️  Health check: GET http://localhost:${PORT}/api/health`);
  console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`📧 Email Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\nWaiting for requests...\n');
});

export default app;
