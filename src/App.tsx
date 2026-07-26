import WeddingHeader from "./components/WeddingHeader/WeddingHeader";
import UploadButton from "./components/UploadButton/UploadButton";
import Gallery from "./components/Gallery/Gallery";

import "./App.css";

function App() {
  return (
    <main>

      <WeddingHeader />

      <section className="upload-section">
        <UploadButton />
      </section>

      <Gallery />

    </main>
  );
}

export default App;