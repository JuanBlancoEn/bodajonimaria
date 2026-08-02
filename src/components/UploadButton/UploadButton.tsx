import "./UploadButton.css";
import { useRef, useState } from "react";
import { uploadFiles } from "../../services/storage";

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

function UploadButton() {

  const fileInput = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInput.current?.click();
  };

  const generateFileName = (file: File) => {

  const extension = file.name.split(".").pop();

  return `${crypto.randomUUID()}.${extension}`;

};


  const handleFiles = (
  event: React.ChangeEvent<HTMLInputElement>
) => {

  if (!event.target.files) return;


  const filesArray = Array.from(event.target.files);


  const validFiles = filesArray
    .filter((file) => {


      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");


      if (!isImage && !isVideo) {

        alert(`${file.name} no es una imagen o vídeo válido`);

        return false;

      }


      if (
        isImage &&
        file.size > MAX_IMAGE_SIZE
      ) {

        alert(`${file.name} supera los 15MB`);

        return false;

      }


      if (
        isVideo &&
        file.size > MAX_VIDEO_SIZE
      ) {

        alert(`${file.name} supera los 100MB`);

        return false;

      }


      return true;

    })
    .map((file) => {      
        return new File(
        [file],
        generateFileName(file),
        {
          type: file.type,
          lastModified: file.lastModified,
        }
        );
    });

  setSelectedFiles(validFiles);
  console.log(validFiles);
  event.target.value = "";
};

  const handleUpload = async () => {

  try {

    setUploading(true);

    const result = await uploadFiles(selectedFiles);

    console.log("Uploaded:", result);

    setSelectedFiles([]);

    alert("Fotos subidas correctamente");

  } catch(error) {

    console.error(error);

    alert("Error subiendo archivos");

  } finally {

    setUploading(false);

  }

};

  return (
  <div className="upload-container">

    <input
      ref={fileInput}
      type="file"
      accept="image/*,video/*"
      multiple
      hidden
      onChange={handleFiles}
    />


    <button
      className="upload-button"
      onClick={handleClick}
      disabled={uploading}
    >
      📸 Subir fotos y vídeos
    </button>

    {selectedFiles.length > 0 && (
  <div className="preview-container">

    {selectedFiles.map((file) => (

      file.type.startsWith("image/") ? (

        <img
          key={file.name}
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="preview-image"
        />

      ) : (

        <video
          key={file.name}
          src={URL.createObjectURL(file)}
          className="preview-image"
          controls
        />
      )
    ))}
  </div>
)}
  {selectedFiles.length > 0 && (

  <button
    className="upload-button"
    onClick={handleUpload}
    disabled={uploading}
  >
    {uploading
      ? "Subiendo..."
      : "Enviar recuerdos 💙"
    }
  </button>

)}
  </div>
);

}

export default UploadButton;