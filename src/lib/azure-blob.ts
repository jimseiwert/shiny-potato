
import { BlobServiceClient, BlockBlobClient, BlobDownloadResponseParsed } from '@azure/storage-blob';
import { Readable } from 'stream';

export class AzureBlob {
  container: string
  blobServiceClient: BlobServiceClient;

  constructor(container: string) {
    this.container = container;

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
    if (!connectionString) { throw Error('Azure Storage connectionString not found'); }

    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    console.log('Azure Blob storage v12 - TypeScript quickstart sample');
  }

  async uploadBlob( filename: string, blob: ReadableStream<Uint8Array>) {
  const containerClient = this.blobServiceClient.getContainerClient(this.container);
  await containerClient.createIfNotExists();
  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);

  const stream = this.convertReadableStreamToReadable(blob);

  await blockBlobClient.uploadStream(stream);
  return true;
}

async  listBlobs() {
  const containerClient = this.blobServiceClient.getContainerClient(this.container);
  const listBlobsResponse = containerClient.listBlobsFlat();
  for await (const blob of listBlobsResponse) {
    console.log(`Blob: ${blob.name}`);
  }
}

async  downloadBlob(filename: string) {
  const offset = 0;         // start at beginning
  const length = undefined; // read all

  const containerClient = this.blobServiceClient.getContainerClient(this.container);
  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);
  const downloadBlockBlobResponse: BlobDownloadResponseParsed = await blockBlobClient.download(offset, length);

  return downloadBlockBlobResponse.readableStreamBody as NodeJS.ReadableStream
}

async deleteBlob(filename: string) {
  const containerClient = this.blobServiceClient.getContainerClient(this.container);
  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(filename);

  await blockBlobClient.deleteIfExists();
}

convertReadableStreamToReadable(webReadableStream: ReadableStream<Uint8Array>): Readable {
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

}