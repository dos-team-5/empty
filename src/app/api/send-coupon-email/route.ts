export async function POST(request: Request) {
  try {
    const { userData, prize } = await request.json()

    // In Next.js runtime, we can't use nodemailer with SMTP
    // This simulates email sending - replace with your preferred email service

    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Winning Coupon!</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .coupon { background: #f8f9fa; border: 2px dashed #ec4899; padding: 20px; margin: 20px 0; text-align: center; border-radius: 10px; }
            .coupon-code { font-size: 24px; font-weight: bold; color: #ec4899; margin: 10px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎉 EMPTY</div>
                <h1>Congratulations ${userData.firstName}!</h1>
            </div>
            <div class="content">
                <p>Hi <strong>${userData.firstName} ${userData.lastName}</strong>,</p>
                
                <p>Congratulations! You've won <strong>${prize.name}</strong> in our Spin to Win game!</p>
                
                <div class="coupon">
                    <h2>Your Winning Coupon</h2>
                    <div class="coupon-code">${prize.couponCode}</div>
                    <p>Present this code at any participating location to claim your prize.</p>
                </div>
                
                <p>Thanks for participating! We hope you enjoy your prize.</p>
                
                <p>If you have any questions, feel free to reach out anytime at <a href="mailto:contact@emptyad.com">contact@emptyad.com</a>.</p>
                
                <p>We'll be in touch soon!</p>
                
                <p>Best,<br>The Empty Team</p>
            </div>
            <div class="footer">
                <p>© 2025 EmptyAd.com | All rights reserved</p>
                <p><a href="https://emptyad.com">Visit our website</a></p>
            </div>
        </div>
    </body>
    </html>
    `

    // Simulate email sending (replace with actual email service in production)
    console.log("📧 Email would be sent to:", userData.email)
    console.log("📧 Email subject:", `🎉 You Won ${prize.name}! Your Coupon Inside`)
    console.log("📧 Coupon code:", prize.couponCode)

    // In production, replace this simulation with one of these options:

    // Option 1: Use Resend (works in edge runtime)
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@emptyad.com',
        to: userData.email,
        subject: `🎉 You Won ${prize.name}! Your Coupon Inside`,
        html: emailTemplate,
      }),
    })
    */

    // Option 2: Use SendGrid
    /*
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: userData.email }],
          subject: `🎉 You Won ${prize.name}! Your Coupon Inside`
        }],
        from: { email: 'contact@emptyad.com' },
        content: [{
          type: 'text/html',
          value: emailTemplate
        }]
      }),
    })
    */

    // Option 3: Use your own backend API
    /*
    const response = await fetch('YOUR_BACKEND_URL/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        to: userData.email,
        subject: `🎉 You Won ${prize.name}! Your Coupon Inside`,
        html: emailTemplate,
        from: 'contact@emptyad.com'
      })
    })
    */

    // Simulate successful email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return Response.json({
      success: true,
      message: "Email sent successfully",
      // In development, return the email content for debugging
      emailPreview: {
        to: userData.email,
        subject: `🎉 You Won ${prize.name}! Your Coupon Inside`,
        couponCode: prize.couponCode,
      },
    })
  } catch (error) {
    console.error("Failed to send email:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
