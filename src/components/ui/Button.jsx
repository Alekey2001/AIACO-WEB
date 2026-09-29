import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-[0.97] disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:    'bg-gradient-to-r from-purple to-cyan text-bg rounded-full hover:shadow-[0_8px_30px_rgba(157,92,255,0.4)] hover:-translate-y-0.5',
        ghost:      'border border-bdr text-foreground rounded-full hover:border-purple/50 hover:bg-purple/5',
        navCta:     'bg-nav-button text-foreground rounded-lg hover:bg-nav-button/80',
        outline:    'border border-purple/40 text-purple rounded-full hover:bg-purple/10',
        spline:     'bg-primary text-primary-foreground rounded-sm hover:brightness-110',
        splineWhite:'bg-white text-background rounded-sm hover:brightness-90',
      },
      size: {
        sm:  'px-4 py-2 text-xs',
        md:  'px-6 py-3 text-xs',
        lg:  'px-8 py-4 text-sm',
        nav: 'px-6 py-2.5 text-xs',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export function Button({ children, variant, size, className = '', onClick, type = 'button', style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`${buttonVariants({ variant, size })} ${className}`}
    >
      {children}
    </button>
  )
}