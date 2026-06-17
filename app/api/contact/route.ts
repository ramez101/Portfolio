import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatMessage = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br />')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body
    const nameText = String(name || '').trim()
    const emailText = String(email || '').trim()
    const phoneText = String(phone || '').trim()
    const subjectText = String(subject || '').trim()
    const messageText = String(message || '').trim()

    // Basic validation
    if (!nameText || !emailText || !phoneText || !subjectText || !messageText) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailText)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(nameText)
    const safeEmail = escapeHtml(emailText)
    const safePhone = escapeHtml(phoneText)
    const safeSubject = escapeHtml(subjectText)
    const safeMessage = formatMessage(messageText)
    const phoneHref = phoneText.replace(/[^\d+]/g, '')
    const replyHref = `mailto:${encodeURIComponent(emailText)}?subject=${encodeURIComponent(`Re: ${subjectText}`)}`

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'ramez.werfelli9@gmail.com'],
      reply_to: emailText,
      subject: `[Portfolio] ${subjectText}`,
      html: `
        <div style="margin: 0; padding: 32px 16px; background: #eef3f7; font-family: Arial, Helvetica, sans-serif;">
          <div style="max-width: 680px; margin: 0 auto; overflow: hidden; border: 1px solid #dce4ec; border-radius: 16px; background: #ffffff; box-shadow: 0 24px 70px rgba(17, 28, 47, 0.12);">
            <div style="padding: 30px 34px; background: linear-gradient(135deg, #3286f4 0%, #35d4d4 100%); color: #ffffff;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.88;">Portfolio contact</p>
              <h1 style="margin: 0; font-size: 26px; line-height: 1.25;">Nouveau message re&ccedil;u</h1>
              <p style="margin: 12px 0 0; font-size: 15px; line-height: 1.6; opacity: 0.92;">Une personne vient de vous contacter depuis le formulaire du portfolio.</p>
            </div>

            <div style="padding: 30px 34px 34px; color: #111c2f;">
              <div style="margin-bottom: 24px; padding: 20px; border: 1px solid #e3e9ef; border-radius: 12px; background: #f8fbfd;">
                <p style="margin: 0 0 8px; color: #687386; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Sujet</p>
                <p style="margin: 0; color: #111c2f; font-size: 18px; font-weight: 700; line-height: 1.45;">${safeSubject}</p>
              </div>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; color: #687386; font-size: 13px; width: 130px;">Nom</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; color: #111c2f; font-size: 15px; font-weight: 700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; color: #687386; font-size: 13px;">Email</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; font-size: 15px;">
                    <a href="mailto:${safeEmail}" style="color: #2d6eff; font-weight: 700; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; color: #687386; font-size: 13px;">Num Tel</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #e8eef4; font-size: 15px;">
                    <a href="tel:${phoneHref}" style="color: #111c2f; font-weight: 700; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 26px; padding: 22px; border-left: 4px solid #3286f4; border-radius: 12px; background: #111c2f;">
                <p style="margin: 0 0 10px; color: #aeb8ca; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Message</p>
                <p style="margin: 0; color: #f5f8ff; font-size: 15px; line-height: 1.75;">${safeMessage}</p>
              </div>

              <div style="margin-top: 28px; text-align: center;">
                <a href="${replyHref}" style="display: inline-block; padding: 13px 22px; border-radius: 10px; background: #3286f4; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none;">R&eacute;pondre par email</a>
              </div>
            </div>

            <div style="padding: 18px 34px; border-top: 1px solid #e8eef4; background: #f8fbfd; color: #687386; font-size: 12px; line-height: 1.6; text-align: center;">
              Envoy&eacute; depuis portfolio-ramez.vercel.app
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Reessayez plus tard.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur interne.' },
      { status: 500 }
    )
  }
}
