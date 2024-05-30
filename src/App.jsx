import { Routes, Route, Link } from "react-router-dom";
import { Addresses } from "./pages/Addresses";
import { AddAddresses } from "./pages/AddAddresses";
import { EditAddresses } from "./pages/EditAddresses";

function App() {
  return (
    <>
      <header>
        <Link to="/">Space Express</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Addresses />} />
          <Route path="/add" element={<AddAddresses />} />
          <Route path="/edit" element={<EditAddresses />} />
        </Routes>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
