export default function ButtonTafsir({ onClick, selected, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm border ${
        selected ? "bg-blue-600 text-white" : "bg-white text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
