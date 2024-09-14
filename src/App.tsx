import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { S3FileList } from "./pages/S3FileList";
import "./App.css";
import { TopNav } from "./components/navigation/TopNav";

const App = () => {
  return (
    <>
      <TopNav />
      <main id="mainId">
        <Router>
          <Routes>
            <Route path="*" element={<S3FileList />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
