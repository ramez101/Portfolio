import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est obligatoire.').max(120),
  email: z.string().trim().email('Adresse email invalide.').max(254),
  phone: z.string().trim().min(1, 'Le téléphone est obligatoire.').max(32),
  subject: z.string().trim().min(1, 'Le sujet est obligatoire.').max(160),
  message: z.string().trim().min(1, 'Le message est obligatoire.').max(4000),
  website: z.string().max(0).optional(),
})
