import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // Let's rename 'from' to 'visitorEmail' for clarity
    const {
      from: visitorEmail,
      to,
      subject,
      templateName,
      templateData,
    } = await request.json();

    // The 'from' address must come from your authenticated user.
    const fromAddress = process.env.EMAIL_FROM;
    if (!fromAddress) {
      throw new Error('EMAIL_FROM environment variable is not set.');
    }

    // 1. Construct the absolute path to the email template
    const templatesPath = path.join(process.cwd(), 'emails');
    const filePath = path.join(templatesPath, `${templateName}.hbs`);

    // 2. Read the template file
    let source: string;
    try {
      source = fs.readFileSync(filePath, 'utf-8').toString();
    } catch (error) {
      console.error('Error reading email template:', error);
      return NextResponse.json(
        { error: `Template "${templateName}" not found.` },
        { status: 404 }
      );
    }

    // 3. Compile the template with Handlebars
    const compiledTemplate = handlebars.compile(source);
    const html = compiledTemplate(templateData);

    // 4. Set up the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // For STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. Define the email options with the 'replyTo' header
    const mailOptions = {
      // IMPORTANT: The 'from' address MUST be your authenticated email.
      from: `"EmptyAd" <${fromAddress}>`,

      // The 'replyTo' header is set to the visitor's email address.
      replyTo: visitorEmail,

      to: to, // This is you, e.g., 'contact@emptyad.com'
      subject: subject,
      html: html, // Use the rendered HTML from the template
    };

    // 6. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send email.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
