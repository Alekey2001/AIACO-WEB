export function Card({ children, className = '' }) {
  return (
    <div className={`card-glass ${className}`}>
      {children}
    </div>
  )
}