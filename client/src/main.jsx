import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <div className="flex flex-col min-h-screen">
    <BrowserRouter>
      <Navbar />
      <main className="flex-grow">
        <App />
      </main>
      <Footer />
    </BrowserRouter>
  </div>
);
