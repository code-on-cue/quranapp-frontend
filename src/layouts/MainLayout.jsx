import { Outlet } from "react-router-dom";
import Header from "./header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Quran App
      </footer>
    </div>
  );
}
