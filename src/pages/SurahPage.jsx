import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../networks/apiService";

export function SurahPage() {
  const navigate = useNavigate();

  const [suratList, setSuratList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSuratList = async () => {
      try {
        const response = await fetchData("/list_surah", {
          params: { limit: 114 },
        });
        setSuratList(response.surah_list || []);
      } catch (error) {
        console.error("Error fetching surat list:", error);
      }
    };

    fetchSuratList();
  }, []);

  const filteredSuratList = useMemo(() => {
    return suratList.filter((surat) =>
      surat.Nama_Surah_Indo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [suratList, searchQuery]);

  const navigateToSurahDetail = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Daftar Surah
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Cari surah berdasarkan nama..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 text-lg border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuratList?.map((surat) => (
          <div
            key={surat.Surah}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100 cursor-pointer group"
            onClick={() => navigateToSurahDetail(surat.Surah)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Surah ke-{surat.Surah}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-blue-600 transition">
                → lihat
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
              {surat.Nama_Surah_Indo}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
