const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
  ]
  
export default function MemberStats() {
    return (
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    )
}