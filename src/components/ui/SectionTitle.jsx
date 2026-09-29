export function SectionTitle({ tag, title, className = '' }) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {tag && (
        <span className="label-caps text-brand-cyan mb-4 block">
          {tag}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text-base">
        {title}
      </h2>
    </div>
  )
}