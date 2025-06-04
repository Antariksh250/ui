import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface EmailService {
  sendEmail(options: EmailOptions): Promise<boolean>;
  sendConfirmationEmail(to: string, name: string): Promise<boolean>;
  sendNotificationEmail(formData: ContactFormData): Promise<boolean>;
}

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  query?: string;
}

class NodemailerService implements EmailService {
  private transporter: nodemailer.Transporter;
  private companyEmail: string;

  constructor() {
    // Initialize the email transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Boolean(process.env.EMAIL_SERVER_SECURE), // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    this.companyEmail =
      process.env.COMPANY_EMAIL || "support@antarikshinfotech.com";
  }

  /**
   * Send an email using the configured transporter
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"Antariksh" <${this.companyEmail}>`,
        ...options,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  /**
   * Send a confirmation email to the customer
   */
  async sendConfirmationEmail(to: string, name: string): Promise<boolean> {
    const subject = "Thank You for Contacting Antariksh";
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
            border-radius: 5px;
          }
          .header {
            background-color: #3B82F6;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Antariksh. We have received your inquiry and appreciate your interest in our services.</p>
            <p>Our team is reviewing your message and will get back to you as soon as possible. We typically respond within 1-2 business days.</p>
            <p>If your matter is urgent, please feel free to call us directly.</p>
            <p>Best regards,</p>
            <p>The Antariksh Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Antariksh. All rights reserved.</p>
            <p>Sree Nagar, Dispur, Guwahati-781005, Assam</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, html });
  }

  /**
   * Send a notification email to the company
   */
  async sendNotificationEmail(formData: ContactFormData): Promise<boolean> {
    const subject = `New Contact Form Submission from ${formData.fullName}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
          }
          .header {
            background-color: #3B82F6;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 0 0 5px 5px;
          }
          .details {
            margin: 20px 0;
          }
          .detail-row {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            width: 140px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <p>A new inquiry has been submitted through the contact form.</p>
            
            <div class="details">
              <div class="detail-row">
                <span class="label">Name:</span> ${formData.fullName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${formData.email}
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span> ${formData.phoneNumber}
              </div>
              <div class="detail-row">
                <span class="label">Company:</span> ${formData.companyName}
              </div>
              ${
                formData.query
                  ? `
              <div class="detail-row">
                <span class="label">Query:</span> ${formData.query}
              </div>
              `
                  : ""
              }
              <div class="detail-row">
                <span class="label">Submitted at:</span> ${new Date().toLocaleString()}
              </div>
            </div>
            
            <p>Please respond to this inquiry at your earliest convenience.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ to: this.companyEmail, subject, html });
  }
}

/**
 * Alternative implementation using Resend email service
 * Uncomment and install the package to use: npm install resend
 */
/*
import { Resend } from 'resend';

class ResendEmailService implements EmailService {
  private resend: Resend;
  private companyEmail: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.companyEmail = process.env.COMPANY_EMAIL || 'support@antarikshinfotech.com';
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const { to, subject, html, text } = options;
      
      const { data, error } = await this.resend.emails.send({
        from: `Antariksh <${this.companyEmail}>`,
        to,
        subject,
        html: html || undefined,
        text: text || undefined,
      });

      if (error) {
        console.error('Error sending email with Resend:', error);
        return false;
      }

      console.log('Email sent with Resend:', data);
      return true;
    } catch (error) {
      console.error('Error sending email with Resend:', error);
      return false;
    }
  }

  async sendConfirmationEmail(to: string, name: string): Promise<boolean> {
    const subject = 'Thank You for Contacting Antariksh';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
            border-radius: 5px;
          }
          .header {
            background-color: #3B82F6;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Antariksh. We have received your inquiry and appreciate your interest in our services.</p>
            <p>Our team is reviewing your message and will get back to you as soon as possible. We typically respond within 1-2 business days.</p>
            <p>If your matter is urgent, please feel free to call us directly.</p>
            <p>Best regards,</p>
            <p>The Antariksh Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Antariksh. All rights reserved.</p>
            <p>Sree Nagar, Dispur, Guwahati-781005, Assam</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ to, subject, html });
  }

  async sendNotificationEmail(formData: ContactFormData): Promise<boolean> {
    const subject = `New Contact Form Submission from ${formData.fullName}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            padding: 20px;
          }
          .header {
            background-color: #3B82F6;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 0 0 5px 5px;
          }
          .details {
            margin: 20px 0;
          }
          .detail-row {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            width: 140px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <p>A new inquiry has been submitted through the contact form.</p>
            
            <div class="details">
              <div class="detail-row">
                <span class="label">Name:</span> ${formData.fullName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${formData.email}
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span> ${formData.phoneNumber}
              </div>
              <div class="detail-row">
                <span class="label">Company:</span> ${formData.companyName}
              </div>
              ${formData.query ? `
              <div class="detail-row">
                <span class="label">Query:</span> ${formData.query}
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="label">Submitted at:</span> ${new Date().toLocaleString()}
              </div>
            </div>
            
            <p>Please respond to this inquiry at your earliest convenience.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({ to: this.companyEmail, subject, html });
  }
}
*/

// Export the email service
const emailService = new NodemailerService();
// Uncomment below to use Resend instead
// const emailService = new ResendEmailService();

export default emailService;
