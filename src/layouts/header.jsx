import { Link } from "react-router-dom";

export default function Header() {
  const appName = import.meta.env.VITE_APP_NAME;
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">{appName}</h1>

        <nav className="p-4 flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/search">Pencarian</Link>
          <Link to="/surah">Daftar Surah</Link>
        </nav>
      </div>
    </header>
  );
}
