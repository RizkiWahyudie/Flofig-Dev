export function Badge({
  children,
  variant = 'blue',
  size = 'sm',
  dot = false,
  className = ''
}) {
  const variants = {
    blue: 'bg-[#EAF0FF] text-[#2045D8] border-[#315CF5]/20',
    mint: 'bg-[#E6FBF5] text-[#0E7A5A] border-[#7EF0D0]/40',
    purple: 'bg-[#F4EBFF] text-[#6927DA] border-[#D8B4FE]/30',
    amber: 'bg-[#FEF6EE] text-[#B54708] border-[#FEDF89]/40',
    rose: 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]/40',
    dark: 'bg-[#1E293B] text-white border-white/10',
    neutral: 'bg-[#F2F4F7] text-[#344054] border-[#E4E7EC]'
  }

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-1 font-semibold',
    md: 'text-sm px-3 py-1.5 font-semibold'
  }

  const dotColors = {
    blue: 'bg-[#315CF5]',
    mint: 'bg-[#10B981]',
    purple: 'bg-[#8B5CF6]',
    amber: 'bg-[#F59E0B]',
    rose: 'bg-[#EF4444]',
    dark: 'bg-[#7EF0D0]',
    neutral: 'bg-[#64748B]'
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.blue} ${sizes[size] || sizes.sm} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || 'bg-[#315CF5]'} animate-pulse`} />
      )}
      {children}
    </span>
  )
}
