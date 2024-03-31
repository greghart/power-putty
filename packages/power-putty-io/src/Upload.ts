interface Upload {
  id: number;
  // A key to where the upload is stored
  key: string;
  // A directory namespace where the upload is stored
  directory: string;
  // Which engine this upload is stored under
  engine: string;
  // Original name of file
  originalName: string;
  // Size of file in bytes
  fileSize: number;
  // SHA-1 Hash of file for verification
  sha1Hash: string;
  // Timestamp of upload
  uploadedAt: Date;
}

export type { Upload };
