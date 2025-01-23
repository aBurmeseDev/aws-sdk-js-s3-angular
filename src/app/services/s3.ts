import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AwsS3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'us-west-1',
      // credentials: {
      //   accessKeyId: '',
      //   secretAccessKey: '',
      // },
    });
  }

  async uploadFile(file: File): Promise<void> {
    try {
      // const fileArrayBuffer = await file.arrayBuffer();  // Convert File to ArrayBuffer

      const command = new PutObjectCommand({
        Bucket: 's3-upload-repro',
        Key: file.name,
        Body: Buffer.from(await file.arrayBuffer()), // Convert file to Buffer,
        // Body: new Uint8Array(fileArrayBuffer), // Convert ArrayBuffer to Uint8Array
        ContentType: file.type,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}
