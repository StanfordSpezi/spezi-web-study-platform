//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, cn, Spinner } from "@stanfordspezi/spezi-web-design-system";
import { ImageUp, X } from "lucide-react";
import {
  useState,
  type RefCallback,
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
  type KeyboardEvent,
  useRef,
} from "react";
import { FeaturedIconContainer } from "./FeaturedIconContainer";

interface ImageUploadProps
  extends Omit<ComponentProps<"input">, "value" | "onChange" | "type" | "ref"> {
  ref: RefCallback<HTMLInputElement>;
  value: string | null;
  onChange: (value: string | null) => void;
  maxSizeInMB?: number;
  setError?: (error?: string) => void;
}

export const ImageUpload = ({
  ref,
  value,
  className,
  accept = "image/jpeg,image/png",
  maxSizeInMB = 10,
  disabled = false,
  onChange,
  setError,
  ...props
}: ImageUploadProps) => {
  const [preview, setPreview] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (file: File) => {
    setError?.(undefined);
    // Validate file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError?.(`File size must be less than ${maxSizeInMB}MB`);
      return;
    }

    // Validate file type - only allow JPEG, PNG
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError?.("Only JPEG and PNG files are allowed");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Convert file to base64 for temporary storage
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError?.("Failed to read file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError?.("Failed to process file");
      setIsUploading(false);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    if (disabled || isUploading) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange(null);
    setError?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cn(
        "bg-fill-secondary border-border-secondary group group relative h-52 cursor-pointer rounded-lg border border-dashed transition",
        "hover:border-border focus-ring",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled || isUploading ? -1 : 0}
      role="button"
      aria-label={preview ? "Change image" : "Upload image"}
      aria-disabled={disabled || isUploading}
    >
      <input
        ref={(element) => {
          fileInputRef.current = element;
          ref(element);
        }}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled || isUploading}
        {...props}
      />

      {preview ?
        <div className="flex-center relative size-full">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-contain"
          />
          <Button
            type="button"
            variant="ghost"
            size={null}
            className="absolute top-2 right-2 size-8 rounded-md p-2"
            onClick={(event) => {
              // Prevent triggering the file input click
              event.stopPropagation();
              handleRemove();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
                event.preventDefault();
                handleRemove();
              }
            }}
            disabled={disabled || isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      : <div className="flex size-full flex-col items-center justify-center px-4 py-8">
          {isUploading ?
            <div className="flex-center flex-col gap-2 text-center">
              <Spinner />
              <p className="text-text-secondary text-sm">Uploading...</p>
            </div>
          : <div className="flex-center flex-col gap-2 text-center">
              <FeaturedIconContainer
                className={cn(
                  "[--container-radius:var(--radius-md)]",
                  "border-border-tertiary size-7 shadow-xs",
                )}
              >
                <ImageUp
                  className={cn(
                    "size-full rounded p-[3px] opacity-80 transition",
                    "group-hover:opacity-100",
                  )}
                />
              </FeaturedIconContainer>
              <div>
                <p
                  className={cn("text-sm transition", "group-hover:text-text")}
                >
                  Choose an image or drag & drop it here
                </p>
                <p className="text-text-tertiary text-xs">
                  JPG, JPEG, PNG up to {maxSizeInMB}MB
                </p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
};
