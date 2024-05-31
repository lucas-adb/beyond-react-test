import { Routes, Route } from "react-router-dom";
import { Addresses } from "./pages/Addresses";
import { AddAddress } from "./pages/AddAddress";
import { EditAddress } from "./pages/EditAddress";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={<Addresses />} />
          <Route path="/add" element={<AddAddress />} />
          <Route path="/edit/:id" element={<EditAddress />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
