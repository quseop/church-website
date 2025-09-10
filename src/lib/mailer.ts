import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
    fullName: string;
    email: string;
    message: string;
}

export async function sendContactFormEmail(formData: ContactFormData) {
    try {
        const { fullName, email, message } = formData;
        
        const emailHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf0e6;">
                <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #222; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px;">Original Seed Ministries</h1>
                        <p style="color: #777; margin: 5px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; font-weight: normal;">Contact Details</h2>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
                            <p style="margin: 0 0 10px 0; color: #333;"><strong>Name:</strong> ${fullName}</p>
                            <p style="margin: 0; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; font-weight: normal;">Message</h2>
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
                        <p style="color: #777; font-size: 12px; margin: 0;">
                            This email was sent from the OASES contact form at ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}
                        </p>
                    </div>
                </div>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: 'OSM Contact Form <noreply@originalseedministries.co.za>',
            to: ['blessing@originalseedministries.co.za'],
            replyTo: email, // This allows easy reply to the customer
            subject: `New Contact Form Submission from ${fullName}`,
            html: emailHtml,
        });

        if (error) {
            console.error('❌ Resend error:', error);
            throw new Error('Failed to send notification email');
        }

        console.log('✅ Email sent successfully:', data?.id);
        return { success: true, emailId: data?.id };

    } catch (error) {
        console.error('❌ Error in sendContactFormEmail:', error);
        throw error;
    }
}

// Optional: Send confirmation email to the customer
export async function sendCustomerConfirmationEmail(customerEmail: string, customerName: string) {
    try {
        const confirmationHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf0e6;">
                <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #222; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">OSM</h1>
                        <p style="color: #777; margin: 5px 0 0 0; font-size: 16px;">Thank you for being in touch!</p>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Shalom ${customerName},</h2>
                        <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                            Thank you for reaching out to us through our contact form. We've received your message, and we will be in touch.
                        </p>
                       
                    </div>
                    
                    
                    
                    <div style="text-align: center; border-top: 1px solid #e9ecef; padding-top: 20px;">
                        <p style="color: #333; margin: 0 0 10px 0; font-weight: 500;">Bro Blessing Mapatha</p>
                        <p style="color: #777; font-size: 14px; margin: 0;">
                            blessingtshego@yahoo.com | 078 272 8442 <br>
                            Brooklyn, Pretoria, South Africa
                        </p>
                        <p style="color: #777; font-size: 12px; margin: 15px 0 0 0;">
                            Going an octave higher.
                        </p>
                    </div>
                </div>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: 'Original Seed Ministries <noreply@originalseedministries.co.za>',
            to: [customerEmail],
            subject: 'Shalom beloved!, Thank you for contacting - We\'ll be in touch soon!',
            html: confirmationHtml,
        });

        if (error) {
            console.error('❌ Resend confirmation error:', error);
            // Don't throw here - customer confirmation is nice-to-have, not critical
            return { success: false, error };
        }

        console.log('✅ Confirmation email sent:', data?.id);
        return { success: true, emailId: data?.id };

    } catch (error) {
        console.error('❌ Error in sendCustomerConfirmationEmail:', error);
        return { success: false, error };
    }
}
