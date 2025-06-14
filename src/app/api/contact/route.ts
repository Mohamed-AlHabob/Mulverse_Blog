import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "alhapopy@gmail.com",
      subject: `New Collaboration Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0b10; color: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #7c14f4; border-bottom: 2px solid #7c14f4; padding-bottom: 10px;">
            🚀 New Collaboration Request
          </h2>
          
          <div style="background-color: rgba(177,177,177,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7c14f4; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7c14f4;">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          </div>
          
          <div style="background-color: rgba(177,177,177,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7c14f4; margin-top: 0;">Project Details</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(177,177,177,0.3);">
            <p style="color: rgba(255,255,255,0.7); font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px;">
              Sent on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
        New Collaboration Request from ${name}
        
        Contact Information:
        Name: ${name}
        Email: ${email}
        ${company ? `Company: ${company}` : ""}
        
        Project Details:
        ${message}
        
        Sent on: ${new Date().toLocaleString()}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
