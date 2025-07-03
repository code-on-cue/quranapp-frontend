import { useEffect, useState } from "react";
import { postData } from "../networks/apiService";
import { loadSearchHistory } from "../utils/save-history";
import { useNavigate } from "react-router-dom";

const appName = import.meta.env.VITE_APP_NAME;

export default function HomePage() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [_error, setError] = useState(null);

  const fetchSuratRecommendation = async () => {
    try {
      const historyBrowsing = loadSearchHistory(); // tidak perlu await jika fungsi sync
      if (historyBrowsing.length === 0) {
        setError("No search history found.");
        console.log("No search history found, skipping recommendation fetch.");
        return; // Tidak ada riwayat pencarian, hentikan eksekusi
      }

      console.log("Fetching surat recommendation with:", historyBrowsing);

      const response = await postData("/recommendation", {
        history: historyBrowsing,
      });

      if (response?.recommendations) {
        response.recommendations = response.recommendations.map((item) => ({
          ...item,
          Tafsir_Bersih: item.Terjemahan, // Pastikan ada properti Tafsir_Bersih
          similarity: item.similarity?.toFixed(3), // dibulatkan 3 digit
        }));

        setRecommendations(response.recommendations);
      }
    } catch (error) {
      console.error("Error fetching surat recommendation:", error);
    }
  };

  useEffect(() => {
    fetchSuratRecommendation();
  }, []); // tidak perlu eslint-disable-next-line jika dependensi benar

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to the {appName}
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Explore the Quran with ease and convenience.
      </p>

      {/* Rekomendasi tidak ditemukan */}
      {recommendations.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
          Tidak ada rekomendasi yang ditemukan. Silakan lakukan pencarian
          terlebih dahulu.
        </div>
      )}

      {/* Rekomendasi */}
      {recommendations.length > 0 && (
        <div className="w-full max-w-full bg-white rounded shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Rekomendasi Ayat
          </h2>
          {/* grid 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((surat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {surat.Nama_Surah_Indo} ({surat.Surah})
                </h3>
                {surat.similarity && (
                  <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Similarity: {surat.similarity}
                  </span>
                )}
                <div className="text-right text-2xl mt-2">
                  {surat.Teks_Arab}
                </div>
                <p className="text-gray-600">{surat.Tafsir_Bersih}</p>

                {/* goto surah */}

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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
