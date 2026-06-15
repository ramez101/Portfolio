export interface Project {
  id: string
  title: string
  description: string
  emoji: string
  badge: string
  badgeColor: 'blue' | 'green' | 'orange'
  tags: string[]
  featured?: boolean
  period?: string
}

export interface Experience {
  period: string
  title: string
  company: string
  location: string
  bullets: string[]
}

export interface Skill {
  name: string
  level: number
}

export interface TechCard {
  icon: string
  name: string
  category: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
