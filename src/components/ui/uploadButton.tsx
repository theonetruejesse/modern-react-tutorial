"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { UploadSVG } from "../icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

// https://gist.github.com/t3dotgg/0464ca78e94acce80ba04ca29f800028
// theo pls just make this into a hook
const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

// style the label element to change appearance
export const UploadButton = () => {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUpload", {
    onClientUploadComplete: (res) => {
      posthog.capture("upload begin");
      res.forEach((file) => {
        toast.dismiss(file.name);
      });

      toast.success("Upload complete", {
        duration: 2000, // 2 seconds
        id: "upload-complete",
      });
      router.refresh();
    },
    // id collision possible given same filenames
    onUploadBegin: (filename) => {
      toast.loading(`Uploading ${filename}...`, {
        duration: 8000, // 8 seconds
        id: filename,
      });
    },

    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`, {
        duration: 4000, // 4 seconds
        id: "upload-error",
      });
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        type="file"
        id="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
