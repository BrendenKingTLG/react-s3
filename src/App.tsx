import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import S3FileList from "./pages/S3FileList";
import "./App.css";
import { TopNav } from "./components/navigation/TopNav";
import { Footer } from "./components/navigation/Footer";

const App = () => {
  return (
    <>
      <TopNav />
      <main id="mainId">
        <Router initialEntries={["/"]} initialIndex={0}>
          <Routes>
            <Route path="*" element={<S3FileList />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </>
  );
};

export default App;
