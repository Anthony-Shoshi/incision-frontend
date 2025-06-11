"use client";

import { FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const DocumentPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    try {
      setUploading(true);
      const response = await fetch("http://127.0.0.1:5050/api/upload-dataset", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        toast.success("Your file was uploaded successfully.");
        router.push("/procedure-results");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Upload failed. Please check your file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upload your file</h1>

      <div className="bg-white p-8 rounded-lg shadow max-w-3xl mx-auto">
        <div
          className="border-2 border-dashed border-[var(--color-primary)] rounded-lg p-16 cursor-pointer"
          onClick={handleBrowseClick}
        >
          <div className="flex flex-col items-center justify-center">
            <FileSpreadsheet size={64} className="text-[var(--color-primary)] mb-4" />
            <h3 className="text-2xl font-medium mb-2">Drag & Drop</h3>
            <p className="text-lg mb-4">
              or{" "}
              <span className="font-medium underline cursor-pointer" onClick={handleBrowseClick}>
                browse
              </span>
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xlsx,.xls,.csv"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-md font-medium hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload & Run"}
          </button>
        </div>

        <div className="text-sm text-gray-700 mt-6">
          <h4 className="font-semibold mb-2">Supported file types:</h4>
          <ul className="list-disc list-inside mb-2">
            <li>.csv (Comma-separated values)</li>
          </ul>
          <p className="mb-1">Make sure your document follows the correct format.</p>
          <Link
            href="/sample/template.xlsx"
            download
            className="text-[var(--color-primary-dark)] hover:underline font-medium"
          >
            Download template file
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;