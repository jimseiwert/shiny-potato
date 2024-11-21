'use client';
import ShowDialog from '@/components/dialog';
import withAuth from '@/lib/withAuth/page/client';
import { Claim } from '@/server/enums/claims';
import { toast } from "sonner"


const projects = [
  {
    id: 1,
    name: 'Migrate Members Data',
    action: () => migrateMembers('members'),
  },
  {
    id: 9,
    name: 'Migrate Sponsor Data',
    action: () => migrateMembers('sponsors'),
  },
  {
    id: 2,
    name: 'Migrate Memos',
    action: () => migrateMembers('memos'),
  },
  {
    id: 3,
    name: 'Migrate statements',
    action: () => migrateMembers('statements'),
  },
  {
    id: 4,
    name: 'Migrate work',
    action: () => migrateMembers('work'),
  },
  {
    id: 5,
    name: 'Migrate applications',
    action: () => migrateMembers('applications'),
  },
  {
    id: 6,
    name: 'Migrate dinner',
    action: () => migrateMembers('dinner'),
  },
  {
    id: 7,
    name: 'Migrate fishing',
    action: () => migrateMembers('fishing'),
  },
  {
    id: 8,
    name: 'Migrate forum',
    action: () => migrateMembers('forum'),
  },
  {
    id: 10,
    name: 'Migrate Status Changes',
    action: () => migrateMembers('statucChanges'),
  },
  {
    id: 11,
    name: 'Link Auth0 Accounts',
    action: () => migrateMembers('auth0'),
  },
  {
    id: 12,
    name: 'Link Stripe Accounts',
    action: () => migrateMembers('stripe'),
  },
  {
    id: 13,
    name: 'Link OpenPath Accounts',
    action: () => migrateMembers('openPath'),
  },
  {
    id: 14,
    name: 'Link Click Send Accounts',
    action: () => migrateMembers('clicksend'),
  },
]

function migrateMembers(type: string) {
  toast("Migration Started",
   {
    description: "Running migration for " + type,
    id: "upload-begin",
    duration: 100000,
  })


  fetch(`/api/conversion/migrate/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).then((response) => {
    toast.dismiss("upload-begin");
    if (response.ok) {
      
      response.json().then((data) => {
        toast(data.msg);
      });
    } else {
      toast.error("Migration Failed " + response.statusText);
    }
  })
}

function Conversion() {
  return (

    <ul role="list" className="divide-y divide-gray-100 px-2 w-full">
      {projects.map((project) => (
        <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm/6 font-semibold">{project.name}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <ShowDialog buttonText='Run Now' title="Run Migration" description={"This will run the " + project.name + " migration"} onCancel={()=>{console.log('cancel')}} onConfirm={() => {project.action()}}/>
          </div>

      
        </li>
      ))}
    </ul>
  )
}

export default withAuth(Conversion,Claim.ConversionRun);
