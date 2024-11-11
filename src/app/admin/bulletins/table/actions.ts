import { toast } from "sonner"

export const deleteBulletin = async (id: number): Promise<boolean> => {
    toast(`Deleting Bulletin`);
    const response = await fetch(`/api/bulletin?id=${id}`, {
        method: 'DELETE'
    })
    if(response.ok) {
        toast('Bulletin Deleted');
        return true;
    }else {
        toast.error('Failed to delete bulletin');
        return false;
    }
}


export const editBulletin = async (id: number, month: number, year: number): Promise<boolean> => {
    toast(`Deleting Bulletin`);
    const response = await fetch(`/api/bulletin`, {
        method: 'PATCH',
        body: JSON.stringify({id, month, year}),
    })
    if(response.ok) {
        toast('Bulletin Edited');
        return true;
    }else {
        toast.error('Failed to edit bulletin');
        return false;
    }
}


export const publishBulletin = async (id: number): Promise<boolean> => {
    toast(`Publishing Bulletin`);
    const response = await fetch(`/api/bulletin/publish`, {
        method: 'POST',
        body: JSON.stringify({id}),
    })
    if(response.ok) {
        toast('Bulletin Published');
        return true;
    }else {
        toast.error('Failed to publish bulletin');
        return false;
    }
}