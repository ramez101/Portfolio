interface SectionLabelProps {
  text: string
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="font-mono text-[0.72rem] text-[var(--blue)] uppercase mb-3">
      {text}
    </p>
  )
}
