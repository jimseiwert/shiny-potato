'use client';
import { useState } from "react";

interface Dependant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    personType: {
        name: string;
    };
    editing: boolean;
}

function DependantRecord({ memberDependant }: { memberDependant: Dependant }) {
    const [dependant, setDependant] = useState<Dependant>(memberDependant);

    return (
        dependant.editing ? (
            <div key={"dependant_editing_" + dependant.id} className="flex justify-between gap-x-6 py-6">
                <div className="font-medium text-gray-900 w-full">
                    <div className="flex">
                    <input
                        type="text"
                        value={dependant.firstName}
                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={(e) => setDependant({ ...dependant, firstName: e.target.value })}
                    />
                     <input
                        type="text"
                        value={dependant.lastName}
                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={(e) => setDependant({ ...dependant, lastName: e.target.value })}
                        />
                    </div>
                    </div>
                <div className="font-medium text-gray-900 w-full">
                <input
                        type="text"
                        value={dependant.email}
                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={(e) => setDependant({ ...dependant, email: e.target.value })}
                        />
                </div>
                <div className="font-medium text-gray-900 w-full">
                <input
                        type="text"
                        value={dependant.personType.name}
                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={(e) => setDependant({ ...dependant, personType: { name: e.target.value } })}
                        />
                    </div>
                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setDependant({ ...dependant, editing: false })}>
                    Update
                </button>
            </div>
            ) :(
            <li key={"dependant_" + dependant.id} className="flex justify-between gap-x-6 py-6">
                <div className="font-medium text-gray-900">{dependant.firstName} {dependant.lastName}</div>
                <div className="font-medium text-gray-900">{dependant.email}</div>
                <div className="font-medium text-gray-900">{dependant.personType.name}</div>
                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setDependant({ ...dependant, editing: true })}>
                    Update
                </button>
            </li>
        )
    )
}
export default function Dependants({ memberDependants }: { memberDependants: Dependant[] }) {
    const [dependants, setDependants] = useState<Dependant[]>(memberDependants);
    return (
        <div>
            <h2 className="text-base/7 font-semibold text-gray-900">Dependants</h2>
            <p className="mt-1 text-sm/6 text-gray-500">Spouse, Kids, etc.</p>

            <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                {dependants.map((dependant, index) => (
                    <DependantRecord key={"dependant_" + index} memberDependant={dependant}/>
                )
                )}
            </ul>

            <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => {
                        setDependants([...dependants, {
                            id: 0,
                            firstName: '',
                            lastName: '',
                            email: '',
                            personType: {
                                name: ''
                            },
                            editing: true
                        }])
                    }}>
                    <span aria-hidden="true">+</span> Add another dependant
                </button>
            </div>
        </div>
    );
}