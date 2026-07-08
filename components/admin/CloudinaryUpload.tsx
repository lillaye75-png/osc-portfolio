"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";

type CloudinaryUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
};

export default function CloudinaryUpload({ value, onChange, multiple = false, label = "Upload Image" }: CloudinaryUploadProps) {
  return (
    <div className="space-y-2">
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        onSuccess={(result) => {
          const info = result.info as { secure_url?: string; public_id?: string };
          const url = info?.secure_url || "";
          if (url) {
            onChange(multiple ? [...value, url] : [url]);
          }
        }}
        options={{
          sources: ["local", "url", "camera"],
          multiple,
          maxFiles: multiple ? 10 : 1,
          folder: "osc-portfolio",
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-charcoal/20 bg-white px-4 py-3 text-sm text-gray-500 hover:border-gold hover:text-gold transition-colors"
          >
            <Upload className="h-4 w-4" />
            {label}
          </button>
        )}
      </CldUploadWidget>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, i) => (
            <div key={url} className="group relative">
              <img src={url} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
