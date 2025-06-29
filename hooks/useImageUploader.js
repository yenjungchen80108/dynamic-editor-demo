import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModifiedImage,
  removeModifiedImage,
} from "@/events/202501/instrEditor/store/imageUploader/slice";
import { imageUploaderSelector } from "@/events/202501/instrEditor/store/selector";
import { toast } from "react-toastify";

const useImageUploader = () => {
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState(null);

  const { modifiedImages } = useSelector(imageUploaderSelector) || {};
  // console.log("modifiedImages", modifiedImages);

  // 選擇新圖片
  const handleImageChange = (file, defaultValue) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          previewUrl: reader.result, // Base64 URL
          fileName: file.name, // 文件名
        });
      };
      reader.readAsDataURL(file);
      dispatch(setModifiedImage({ key: defaultValue, file }));
    }
  };

  // 上傳圖片到 S3
  const uploadToS3 = async ({ defaultValue }) => {
    const file = modifiedImages[defaultValue];

    if (!file) return;

    try {
      // (1) 呼叫 /api/upload-to-s3，取得 presignedUrl
      const res = await fetch("/api/upload-to-s3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: defaultValue, // S3 上的檔名（可自行改成帶路徑 e.g. "folder/file.png"）
          fileType: file.type, // MIME類型
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { url } = await res.json();
      // (2) 用拿到的 url 直接上傳 (PUT) 到 S3
      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type, // 跟後端 PutObjectCommand 的 ContentType 對應
        },
        body: file, // Blob or File 物件
      });

      if (!upload.ok) {
        throw new Error("Upload failed.");
      }

      // ✅ 上傳成功，可組出檔案的公開 URL（若 ACL=public-read）
      const fileUrl = url.split("?")[0]; // 去掉 presigned URL query 參數
      toast.success(`Upload success! File URL: ${fileUrl}`);

      return fileUrl;
    } catch (error) {
      console.error(error);
      toast.error("Upload error: " + error.message);
      return null;
    }
  };

  const batchUploadImages = async () => {
    for (const defaultValue in modifiedImages) {
      const file = modifiedImages[defaultValue];
      await uploadToS3(file, defaultValue);
    }
  };

  return {
    uploadedImage,
    handleImageChange,
    uploadToS3,
    batchUploadImages,
  };
};

export default useImageUploader;
