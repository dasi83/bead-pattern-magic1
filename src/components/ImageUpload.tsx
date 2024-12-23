import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
}

export const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-12
        flex flex-col items-center justify-center
        transition-colors duration-200 ease-in-out
        cursor-pointer
        ${isDragActive
          ? "border-primary bg-primary/5"
          : "border-gray-200 hover:border-primary/50 hover:bg-secondary"
        }
      `}
    >
      <input {...getInputProps()} />
      <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
      <div className="text-center">
        <p className="text-lg font-medium text-accent mb-2">
          {isDragActive
            ? "Bild hier ablegen..."
            : "Bild hierher ziehen oder klicken zum Auswählen"
        }
        </p>
        <p className="text-sm text-accent/60">
          PNG, JPG oder GIF (max. 10MB)
        </p>
      </div>
    </div>
  );
};