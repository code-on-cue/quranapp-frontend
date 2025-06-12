const appName = import.meta.env.VITE_APP_NAME;
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the {appName}</h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore the Quran with ease and convenience.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Get Started
      </button>
    </div>
  );
}
