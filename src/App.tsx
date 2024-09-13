import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { S3FileList } from "./components/s3/S3FileList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for folder navigation */}
        <Route path="*" element={<S3FileList />} />
      </Routes>
    </Router>
  );
};

export default App;
