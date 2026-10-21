export function FlovigLogo({
  variant = 'full', // 'full' | 'icon'
  className = '',
  size = 'md',
  dark = false
}) {
  const heights = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12'
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/flovig_logo.webp"
          alt="Flovig Icon"
          className={`${iconSizes[size] || iconSizes.md} object-contain transition-transform hover:scale-105`}
        />
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {dark ? (
        <div className="flex items-center gap-2.5">
          <img
            src="/flovig_logo.webp"
            alt="Flovig Icon"
            className={`${iconSizes[size] || iconSizes.md} object-contain`}
          />
          <span className="font-extrabold text-xl tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] flex items-baseline">
            flovig
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] ml-0.5 inline-block"></span>
          </span>
        </div>
      ) : (
        <img
          src="/flovig_logo.png"
          alt="Flovig Logo"
          className={`${heights[size] || heights.md} w-auto object-contain transition-transform hover:scale-[1.02]`}
        />
      )}
    </div>
  )
}
