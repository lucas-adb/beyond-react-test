import { Link } from "react-router-dom";
import Logo from "../assets/etezinho.png";

export function Header() {
  return (
    <header className="w-full">
      <div className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <Link to="/" className="flex items-center gap-4 text-xl font-bold">
          <img src={Logo} alt="Space Express logo image" className="max-w-12" />
          Space Express
        </Link>
      </div>
    </header>
  );
}
