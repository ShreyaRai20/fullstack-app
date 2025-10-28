"use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps{
    onSuccess: (res:unknown) => void
    onProgress?: (progress:number) => void
    fileType: "image" | "video"
}

const FileUpload = ({onSuccess, onProgress, fileType}:FileUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // OPTIONAL VALIDATION

    const validateFile = (file : File) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a valid video file")
            }
        }

        if(file.size > 100*1024*1024){
                setError("file size must be less than 100 MB")
            }

            return true
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(!file || !validateFile(file)) return

        setUploading(true)
        setError(null)

        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const auth = await authRes.json()

            const res = await upload({
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,
                publicKey:process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                        const percent = (event.loaded / event.total) * 100

                        onProgress(Math.round(percent))
                    };
                }
            }); 
            onSuccess(res)
        } catch (error) {
            console.error("upload failed",error)
        } finally {
            setUploading(false)
        }
    }


    return (
        <>
            <input 
            type="file"  
            accept={fileType === "video" ? "video/*":"image/*"}
            onChange={(e)=>handleFileChange(e)}
            />

            {uploading && (
                <span>Loading...</span>
            )}
            
        </>
    );
};

export default FileUpload;