'use client';

import { SetStateAction, useState } from "react";

export default function InputUpdate({ title, initialValue }: { title: string, initialValue: string }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [value, setValue] = useState(initialValue);
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <>

            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{title}</dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    {isEditing ? (
                        <input
                            type="text"
                            value={value}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 sm:text-sm/6">{value}</div>
                    )}


                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={handleEditClick}>
                        {isEditing ? 'Save' : 'Update'}
                    </button>
                </dd>
            </div>
        </>
    );
}