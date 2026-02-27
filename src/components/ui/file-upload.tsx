"use client";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUpload({
  onFileSelect,
  accept = ".pdf",
  maxSizeMB = 5,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        setError("Hannah can\u2019t read this file format\u2014let\u2019s try a PDF.");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File must be under ${maxSizeMB}MB.`);
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect, maxSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-200",
        isDragging
          ? "border-violet-400 bg-violet-50/50"
          : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/30"
      )}
    >
      <label className="cursor-pointer flex flex-col items-center gap-4">
        <Upload
          className={cn(
            "transition-colors duration-200",
            isDragging ? "text-violet-400" : "text-slate-300"
          )}
          size={48}
          strokeWidth={1.5}
        />
        <div>
          <p className="text-slate-700 font-medium">
            Drag your resume here or{" "}
            <span className="text-violet-600 underline underline-offset-4">
              click to browse
            </span>
          </p>
          <p className="text-sm text-slate-400 mt-2">PDF only, up to {maxSizeMB}MB</p>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
      {error && (
        <p className="text-sm text-red-500 mt-4" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
