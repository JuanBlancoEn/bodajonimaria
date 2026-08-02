import { useEffect, useState } from "react";
import { getPhotos } from "../../services/storage";

import "./Gallery.css";


function Gallery() {

  const [photos, setPhotos] = useState<any[]>([]);


  useEffect(() => {

    loadPhotos();

  }, []);


  const loadPhotos = async () => {

    try {

      const result = await getPhotos();

      setPhotos(result);

    } catch(error) {

      console.error(
        "Error cargando fotos",
        error
      );

    }

  };


  return (

    <section className="gallery">

      <h2>
        Nuestros momentos
      </h2>


      <div className="gallery-grid">

        {photos.map((file) => (

  file.type?.startsWith("video/")
    ?
    <video
      key={file.url}
      src={file.url}
      controls
      className="gallery-item"
    />

    :
    <img
      key={file.url}
      src={file.url}
      alt="Foto boda"
      className="gallery-item"
    />

))}

      </div>

    </section>

  );

}


export default Gallery;