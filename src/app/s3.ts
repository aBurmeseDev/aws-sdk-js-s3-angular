import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AwsS3Service {
  private s3Client: S3Client;

  constructor() {
    // Initialize S3 client
    this.s3Client = new S3Client({
      region: 'us-west-1',
      //   credentials: {
      //     accessKeyId: 'YOUR_ACCESS_KEY_ID',
      //     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
      //   }
    });
  }

  async uploadFile(file: File, bucketName: string): Promise<void> {
    try {
      //   const fileBuffer = Buffer.from(await file.arrayBuffer());

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.name,
        // Body: fileBuffer,
        ContentType: file.type,
      });

      const response = await this.s3Client.send(command);
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
