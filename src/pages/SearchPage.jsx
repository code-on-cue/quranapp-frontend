import { useEffect, useState } from "react";
import { fetchData } from "../networks/apiService";
import { useNavigate } from "react-router-dom";
import { saveSearchHistory } from "../utils/save-history";
import { highlightKeywords } from "../utils/highlight";

export function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suratList, setSuratList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Debounce the search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const fetchSuratList = async () => {
    console.log("Fetching surat list with query:", debouncedSearchQuery);
    setErrorMessage(""); // Reset error message on new search
    try {
      if (!debouncedSearchQuery) {
        setSuratList([]);
        return;
      }

      saveSearchHistory(debouncedSearchQuery);

      const response = await fetchData("/semantic_search", {
        params: {
          limit: 100, // Fetching a reasonable number of surahs
        },
        query: debouncedSearchQuery,
      });

      // mapping the response to match the expected structure
      response.results = response.results.map((item) => ({
        ...item,
        Tafsir_Bersih: item.Terjemahan,
      }));

      setSuratList(response.results || []);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.error || "Terjadi kesalahan saat mengambil data"
      );
      console.error("Error fetching surat list:", error);
    }
  };

  // Fetch surat list when the component mounts
  useEffect(() => {
    fetchSuratList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cari Potongan Ayah</h1>
      <input
        type="text"
        placeholder="Cari surat..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {suratList.length === 0 ? (
          errorMessage ? (
            <p className="text-red-600">{errorMessage}</p>
          ) : (
            <p className="text-gray-500">Tidak ada hasil ditemukan</p>
          )
        ) : (
          suratList.map((surat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-blue-800">
                  {surat.Nama_Surah_Indo} ({surat.Surah})
                </h2>
                <span className="text-xs text-gray-500">
                  Ayat ke-{surat.Ayat}
                </span>
              </div>

              <p className="text-right text-2xl font-arabic leading-relaxed text-gray-800 mb-4">
                {surat.Teks_Arab}
              </p>

              <p
                className="text-sm text-gray-600 italic"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(surat.Tafsir_Bersih, [searchQuery]),
                }}
              ></p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    navigate(
                      `/surah/${surat.Surah}?specific_ayah=${surat.Ayat}`,
                      {
                        state: {
                          ayat: surat.Ayat,
                          namaSurah: surat.Nama_Surah_Indo,
                        },
                      }
                    );
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  Lihat Surah →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
