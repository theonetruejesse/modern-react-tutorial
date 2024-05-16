import {
  generateReactHelpers,
  // generateUploadButton,
  // generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";

// default ui for upload button, dropzones
// export const UploadButton = generateUploadButton<OurFileRouter>();
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// hooks for customizing upload functionality
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
