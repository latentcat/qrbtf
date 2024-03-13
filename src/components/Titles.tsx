

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle(props: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{props.title}</h2>
      {props.subtitle && (
        <p className="mt-2 mb-4 opacity-50">{props.subtitle}</p>
      )}
    </div>
  )
}