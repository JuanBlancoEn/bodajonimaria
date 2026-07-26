import "./Gallery.css";

const photos = [
  "/example1.jpg",
  "/example2.jpg",
  "/example3.jpg",
];


function Gallery(){

return (

<section className="gallery">

<h2>
Nuestros momentos
</h2>


<div className="grid">

{
photos.map((photo,index)=>(

<img
key={index}
src={photo}
alt="Recuerdo"
/>

))
}

</div>

</section>

)

}

export default Gallery;