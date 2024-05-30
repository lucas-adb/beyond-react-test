import { Routes, Route, Link } from "react-router-dom";
import { Addresses } from "./pages/Addresses";
import { AddAddresses } from "./pages/AddAddresses";
import { EditAddresses } from "./pages/EditAddresses";

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <header>
        <Link to="/">Space Express</Link>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Addresses />} />
          <Route path="/add" element={<AddAddresses />} />
          <Route path="/edit" element={<EditAddresses />} />
        </Routes>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default App;
