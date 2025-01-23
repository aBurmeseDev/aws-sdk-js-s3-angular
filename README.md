# SDKAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Prerequisites

- Node.js - `v^18.19.1` or newer
- Angular CLI `npm install -g @angular/cli` or refer to https://angular.dev/installation

## Setup
- Clone this repo
- Add `accessKeyId` `secretAccessKey` in `src/app/services/s3.ts` for temporary testing or Create a Amazon Cognito Identity pool and ensure the role have write access to S3 bucket.
- Ensure your S3 Bucket have CORS enabled.
  - CORS config for S3 bucket:
    ```json
    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
    }    
    ```
    ```json
    {
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["PUT", "POST"],
            "AllowedOrigins": ["http://localhost:4200"],
            "ExposeHeaders": []
        }
    ]
    }
    ```


## Development server

- `npm install`
  
To start a local development server, run:

- `ng serve`

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
