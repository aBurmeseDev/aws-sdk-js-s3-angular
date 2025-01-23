import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwsS3Service } from './services/s3';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>S3 Upload</h1>
      <input
        type="file"
        (change)="onFileSelected($event)"
        [disabled]="isUploading"
      />
      <button (click)="uploadFile()" [disabled]="!selectedFile || isUploading">
        {{ isUploading ? 'Uploading...' : 'Upload' }}
      </button>
      <p *ngIf="error">{{ error }}</p>
    </div>
  `,
  styles: [
    `
      div {
        padding: 20px;
      }
      button {
        margin-left: 10px;
      }
      p {
        color: red;
      }
    `,
  ],
})
export class AppComponent {
  selectedFile: File | null = null;
  isUploading = false;
  error = '';

  constructor(private awsS3Service: AwsS3Service) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
      this.error = '';
    }
  }

  async uploadFile() {
    if (!this.selectedFile) return;

    try {
      this.isUploading = true;
      this.error = '';
      await this.awsS3Service.uploadFile(this.selectedFile);
      this.selectedFile = null;
      alert('Upload successful!');
    } catch (err) {
      this.error = 'Upload failed';
    } finally {
      this.isUploading = false;
    }
  }
}
