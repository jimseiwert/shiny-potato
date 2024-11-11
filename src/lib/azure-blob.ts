
import { BlobServiceClient, BlockBlobClient, BlobDownloadResponseParsed } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string; 
if (!connectionString) throw Error('Azure Storage connectionString not found');
const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  );
  console.log('Azure Blob storage v12 - TypeScript quickstart sample');



export async function uploadBlob(containerName: string, filename: string, blob: ReadableStream<Uint8Array>) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);

    const stream = convertReadableStreamToReadable(blob);

    await blockBlobClient.uploadStream(stream);
    return true;
}

export async function listBlobs(containerName: string) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const listBlobsResponse = containerClient.listBlobsFlat();
    for await (const blob of listBlobsResponse) {
      console.log(`Blob: ${blob.name}`);
    }
}

export async function downloadBlob(containerName: string, filename: string) {
    const offset = 0;         // start at beginning
    const length = undefined; // read all

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse: BlobDownloadResponseParsed = await blockBlobClient.download(offset, length);

    return downloadBlockBlobResponse.readableStreamBody as NodeJS.ReadableStream
}

export async function deleteBlob(containerName: string, filename: string) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);
    
    await blockBlobClient.deleteIfExists();
}

function convertReadableStreamToReadable(webReadableStream: ReadableStream<Uint8Array>): Readable {
    const reader = webReadableStream.getReader();  // Get the reader once
  
    const nodeReadable = new Readable({
      read(size) {
        reader.read().then(({ done, value }) => {
          if (done) {
            this.push(null); // End of stream
          } else {
            this.push(value); // Push the chunk to the Node.js stream
          }
        }).catch(err => {
          this.destroy(err); // Handle any errors
        });
      }
    });
  
    return nodeReadable;
  }