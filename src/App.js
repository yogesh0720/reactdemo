import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostListing from "./Components/PostListing";
import AddPost from "./Components/AddPost";
import EditPost from "./Components/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostListing />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
