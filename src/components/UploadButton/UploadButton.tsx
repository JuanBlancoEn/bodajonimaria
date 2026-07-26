import "./UploadButton.css";
import { useRef, useState } from "react";

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

function UploadButton() {

  const fileInput = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);


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


  const selectedFiles = Array.from(event.target.files);


  const validFiles = selectedFiles
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
          type: file.type
        }
      );


    });


  setFiles(validFiles);


  console.log(validFiles);

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
    >
      📸 Subir fotos y vídeos
    </button>


    <div className="preview-container">

      {files.map((file) => (

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

  </div>
);

}

export default UploadButton;