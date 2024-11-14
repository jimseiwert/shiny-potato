import { UpdatePicture } from '@/server/db/queries/member/picture';
import { put } from '@vercel/blob';

export async function TransferAvatar(auth0: string, imageUrl: string) {
    const response = await fetch(imageUrl);
  
    if (!response.ok) {
      return null;
    }

    let filename = response.headers.get('content-disposition').split('filename=')[1];
    //remove quotes from filename
    filename = filename.replace(/['"]+/g, '');

    console.log(filename)
    const blob = await put(filename, response.body, { access: 'public' });

    await UpdatePicture(auth0, blob.url);
    return blob.url;
  }