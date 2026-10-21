export function ProductWindow({
  title = 'Flovig Workspace — Redesign E-Commerce Platform',
  children,
  className = '',
  headerAction = null,
  dark = false
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
        dark
          ? 'bg-[#0B0F19] border-white/10 shadow-2xl text-white'
          : 'bg-white border-[#E5E8F0] shadow-flovig-lg text-[#101828]'
      } ${className}`}
    >
      {/* Window Title Bar */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between select-none ${
          dark
            ? 'bg-[#111A2E]/80 border-white/10 text-white/70'
            : 'bg-[#F8FAFC] border-[#E5E8F0] text-[#64748B]'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block hover:opacity-100 transition-opacity"></span>
          </div>
          <span className="text-xs font-medium ml-3 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs">
            <span className="w-2 h-2 rounded-xs bg-[#315CF5]"></span>
            {title}
          </span>
        </div>

        {headerAction ? (
          <div>{headerAction}</div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[11px] font-mono">
              ⌘K Cari
            </span>
          </div>
        )}
      </div>

      {/* Main Window Body */}
      <div className="relative overflow-hidden">{children}</div>
    </div>
  )
}
