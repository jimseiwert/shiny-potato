'use client';

const projects = [
  {
    id: 1,
    name: 'Migrate Members Data',
    action: () => migrateMembers(),
  },
  
]

function migrateMembers() {
  fetch('/api/conversion/migrate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).then((response) => {
    if (response.ok) {
      console.log('Member Data')
    } else {
      console.log('Error')
    }
  })
}

export default function Conversion() {
  return (
    <ul role="list" className="divide-y divide-gray-100 px-2 w-full">
      {projects.map((project) => (
        <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm/6 font-semibold text-gray-900">{project.name}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <button
              onClick={() => {project.action()}}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              Run now <span className="sr-only">, {project.name}</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
