"use client";

import { FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const DocumentPage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Upload your file</h1>

            <div className="bg-white p-8 rounded-lg shadow max-w-3xl mx-auto">
                <div className="border-2 border-dashed border-[var(--color-primary)] rounded-lg p-16 cursor-pointer">
                    <div
                        className="flex flex-col items-center justify-center"
                        onClick={handleBrowseClick}
                    >
                        <FileSpreadsheet size={64} className="text-[var(--color-primary)] mb-4" />

                        <h3 className="text-2xl font-medium mb-2">Drag & Drop</h3>
                        <p className="text-lg mb-4">
                            or{" "}
                            <span
                                onClick={handleBrowseClick}
                                className="font-medium underline cursor-pointer"
                            >
                                browse
                            </span>
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            id="file-upload"
                            accept=".xlsx,.xls,.csv"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-md font-medium cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors">
                        Upload & Run
                    </button>
                </div>

                <div className="text-sm text-gray-700 mt-6">
                    <h4 className="font-semibold mb-2">Supported file types:</h4>
                    <ul className="list-disc list-inside mb-2">
                        <li>.xlsx (Microsoft Excel)</li>
                        <li>.xls (Older Excel)</li>
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
