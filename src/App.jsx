import { Routes, Route } from "react-router-dom";
import { Addresses } from "./pages/Addresses";
import { AddAddresses } from "./pages/AddAddresses";
import { EditAddresses } from "./pages/EditAddresses";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={<Addresses />} />
          <Route path="/add" element={<AddAddresses />} />
          <Route path="/edit" element={<EditAddresses />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
