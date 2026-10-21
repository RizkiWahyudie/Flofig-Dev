export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] cursor-pointer'

  const variants = {
    primary: 'bg-[#315CF5] hover:bg-[#2045D8] text-white shadow-md shadow-[#315CF5]/25 focus:ring-[#315CF5]',
    secondary: 'bg-white hover:bg-[#F0F4FF] text-[#111A2E] border border-[#E5E8F0] shadow-sm hover:border-[#315CF5]/40 focus:ring-[#315CF5]',
    dark: 'bg-[#111A2E] hover:bg-[#1A2642] text-white border border-white/10 shadow-lg shadow-black/30 focus:ring-white/40',
    mint: 'bg-[#7EF0D0] hover:bg-[#68DEBE] text-[#111A2E] font-semibold shadow-md shadow-[#7EF0D0]/20 focus:ring-[#7EF0D0]',
    outline: 'bg-transparent border border-[#E5E8F0] hover:bg-slate-100 text-[#101828] focus:ring-[#315CF5]',
    ghost: 'bg-transparent hover:bg-slate-100 text-[#475467] hover:text-[#101828] focus:ring-[#315CF5]'
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </button>
  )
}
