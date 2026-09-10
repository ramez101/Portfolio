interface SectionLabelProps {
  text: string
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--blue)]">
      <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {text}
    </p>
  )
}
