import { Link } from "react-router-dom";
import Logo from "../assets/etezinho.png";

export function Header() {
  return (
    <header className="w-full">
      <div className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Space Express logo image" className="max-w-12" />
          <Link to="/" className="text-xl font-bold">
            Space Express
          </Link>
        </div>
      </div>
    </header>
  );
}
