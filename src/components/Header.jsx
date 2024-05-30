import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full">
      <div className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <Link to="/" className="text-lg font-bold">
          Space Express
        </Link>
      </div>
    </header>
  );
}
