import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'ramez.werfelli9@gmail.com'],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0E1628; color: #F0F4FF; border-radius: 12px; overflow: hidden;">
          <div style="background: #2D6EFF; padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 1.5rem; color: white;">Nouveau message — Portfolio</h1>
          </div>
          <div style="padding: 36px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #8B95B0; font-size: 0.85rem; width: 100px;">Nom</td>
                <td style="padding: 12px 0; color: #F0F4FF; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid rgba(240,244,255,0.08);">
                <td style="padding: 12px 0; color: #8B95B0; font-size: 0.85rem;">Email</td>
                <td style="padding: 12px 0; color: #2D6EFF;">${email}</td>
              </tr>
              <tr style="border-top: 1px solid rgba(240,244,255,0.08);">
                <td style="padding: 12px 0; color: #8B95B0; font-size: 0.85rem;">Sujet</td>
                <td style="padding: 12px 0; color: #F0F4FF;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: rgba(19,28,53,0.7); border-radius: 8px; border-left: 3px solid #2D6EFF;">
              <p style="margin: 0; color: #8B95B0; font-size: 0.8rem; margin-bottom: 8px;">Message</p>
              <p style="margin: 0; color: #F0F4FF; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="padding: 20px 36px; background: rgba(10,15,30,0.5); border-top: 1px solid rgba(240,244,255,0.06); text-align: center; color: #8B95B0; font-size: 0.75rem;">
            Envoyé depuis portfolio-ramez.vercel.app
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Réessayez plus tard.' },
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
