import InputUpdate from "../components/inputUpdate";

export default function Profile({firstName, lastName, email, occupation}: {firstName: string, lastName: string, email: string, occupation: string}) {
    return (
    <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
              <InputUpdate title="Full name" initialValue={`${firstName} ${lastName}`} />
              <InputUpdate title="Email Address" initialValue={email} />
              <InputUpdate title="Occupation" initialValue={occupation} />
              </dl>
            </div>
    )
}