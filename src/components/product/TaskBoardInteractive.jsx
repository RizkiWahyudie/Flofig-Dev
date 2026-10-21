import { useState } from 'react'
import { initialTasks } from '../../data/mockData'
import { 
  Kanban, 
  ListFilter, 
  Clock,
  MessageSquare,
  Filter,
  Check
} from 'lucide-react'

export function TaskBoardInteractive() {
  const [viewMode, setViewMode] = useState('board') // 'board' | 'list'
  const [filterCategory, setFilterCategory] = useState('all') // 'all' | 'Frontend' | 'Design System' | 'Backend'
  const [tasks] = useState(initialTasks)

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'all') return true
    return t.tags.includes(filterCategory) || t.category.includes(filterCategory)
  })

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Urgent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">Urgent</span>
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Tinggi</span>
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Sedang</span>
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">Rendah</span>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'done':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800"><Check className="w-3 h-3" /> Selesai</span>
      case 'review':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">Review Klien</span>
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">In Progress</span>
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">Backlog</span>
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-flovig overflow-hidden">
      {/* Control Bar: View Switcher & Filters */}
      <div className="p-4 bg-[#F8FAFC] border-b border-[#E5E8F0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Switcher Buttons */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-[#E5E8F0] shadow-xs">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-[#315CF5] text-white shadow-xs'
                  : 'text-[#475467] hover:text-[#101828]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#315CF5] text-white shadow-xs'
                  : 'text-[#475467] hover:text-[#101828]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List View Terstruktur</span>
            </button>
          </div>

          <span className="hidden sm:inline text-xs text-[#94A3B8] ml-2">
            {filteredTasks.length} Task Ditampilkan
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-[#64748B] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['all', 'Design System', 'Frontend', 'Backend'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#111A2E] text-white'
                  : 'bg-white border border-[#E5E8F0] text-[#475467] hover:border-[#315CF5]/50'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode: BOARD */}
      {viewMode === 'board' && (
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#F8FAFC]/50 min-h-[420px]">
          {['backlog', 'in_progress', 'review', 'done'].map((statusKey) => {
            const colTasks = filteredTasks.filter((t) => t.status === statusKey)
            const titleMap = {
              backlog: { label: 'Backlog', color: 'bg-slate-400' },
              in_progress: { label: 'In Progress', color: 'bg-[#315CF5]' },
              review: { label: 'Review Klien', color: 'bg-amber-500' },
              done: { label: 'Selesai', color: 'bg-emerald-500' }
            }
            const col = titleMap[statusKey]

            return (
              <div key={statusKey} className="bg-[#F1F4F9] rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#1E293B]">
                    <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                    <span>{col.label}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white rounded-md text-[#64748B]">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] rounded-lg">
                      Tidak ada task
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-3.5 rounded-xl border border-[#E5E8F0] shadow-2xs hover:shadow-md hover:border-[#315CF5]/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-[#94A3B8]">{task.id}</span>
                          {getPriorityBadge(task.priority)}
                        </div>

                        <h5 className="font-semibold text-xs text-[#101828] group-hover:text-[#315CF5] transition-colors leading-relaxed">
                          {task.title}
                        </h5>

                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {task.tags.map((tg) => (
                            <span key={tg} className="text-[10px] font-medium bg-[#F1F5F9] text-[#475467] px-1.5 py-0.5 rounded">
                              #{tg}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                          <span className="flex items-center gap-1 text-[11px] text-[#64748B]">
                            <Clock className="w-3 h-3 text-[#94A3B8]" />
                            {task.dueDate}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments}
                            </span>
                            <div className={`w-5 h-5 rounded-full ${task.assignee.color} text-white font-bold text-[8px] flex items-center justify-center`}>
                              {task.assignee.avatar}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* View Mode: LIST */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E8F0] text-[#64748B] font-semibold">
                <th className="py-3 px-4">Kode & Judul Task</th>
                <th className="py-3 px-4">Status Alur</th>
                <th className="py-3 px-4">Prioritas</th>
                <th className="py-3 px-4">Penanggung Jawab</th>
                <th className="py-3 px-4">Tenggat Waktu</th>
                <th className="py-3 px-4">Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F4F9]">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#94A3B8] font-medium">{task.id}</span>
                      <span className="font-semibold text-[#101828]">{task.title}</span>
                    </div>
                    <div className="text-[10px] text-[#64748B] mt-0.5 flex items-center gap-2">
                      <span>{task.category}</span>
                      <span>•</span>
                      <span>Checklist: {task.subtasks}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(task.status)}</td>
                  <td className="py-3.5 px-4">{getPriorityBadge(task.priority)}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${task.assignee.color} text-white font-bold text-[9px] flex items-center justify-center`}>
                        {task.assignee.avatar}
                      </div>
                      <span className="font-medium text-[#344054]">{task.assignee.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#475467] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 w-32">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#315CF5] h-full rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#64748B]">{task.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
