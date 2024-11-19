

export const validateEntries = (toBeInserted: any[], existing: any[]) => {

    for (const entry of toBeInserted) {
        const duplicateIDCheck = toBeInserted.filter((x) => x.id === entry.id);

        if (!duplicateIDCheck || duplicateIDCheck.length !=  1) {
             throw new Error(`Error/Duplicate member type id: ${entry}`);
        }

        const duplicateNameCheck = toBeInserted.filter((x) => x.name === entry.name);

        if (!duplicateNameCheck || duplicateNameCheck.length !=  1) {
             throw new Error(`Error/Duplicate member type name: ${entry}`);
        }
    }

    for (const entry of existing) {
        const entryCheck = toBeInserted.find((x) => x.id === entry.id);

        if (!entryCheck) {
             throw new Error(`Entry exist in database but not in enum: ${entry}`);
        }
    }

}