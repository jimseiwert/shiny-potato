export const DownloadTemplate = async (id: number) => {
    try {
        const response = await fetch('/api/template/' + id);
        if (response.ok) {
            return await response.json();
        }
        alert("Template error!");
    } catch (error) {
        console.error('Error deleting template:', error);
    }
}

export const DownloadBase = async (id: number) => {
    try {
        const response = await fetch('/api/template/base?id=' + id);
        return response.json();
    } catch (error) {
        console.error('Error deleting template:', error);
    }
};


export const DeleteTemplate = async (id: number) => {
    try {
        await fetch('/api/template/' + id, {
            method: 'DELETE'
        })

        return;
    } catch (error) {
        console.error('Error deleting template:', error);
    }
}

export const SaveTemplate = async (id: number, template: string) => {
    try {
        await fetch('/api/template/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: template
        })

        return;
    } catch (error) {
        console.error('Error deleting template:', error);
    }
}


export const UploadNewBase = async (filename: string, type: string, content: string) => {
    try {
        return await fetch('/api/template/base', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: filename, type: type, template: content })
        });
    } catch (error) {
        // Handle error
        console.error('Error uploading template:', error);
    }
}