import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "../networks/apiService";
import SwitcherTafsir from "../components/SwitcherTafsir";

export default function DetailSurahPage() {
  const { surah_number } = useParams();
  const [searchParams] = useSearchParams();
  const specificAyah = searchParams.get("specific_ayah");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTafsir, setSelectedTafsir] = useState("terjemahan");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;

  const getTafsirByKey = (ayat, key) => {
    console.log(key);
    switch (key) {
      case "jalalain":
        return ayat.Tafsir_Jalalain || "";
      // case "mukhtasar":
      //   return ayat.Tafsir_Mukhtasar || "";
      default:
        return ayat.Terjemahan || "";
    }
  };

  const fetchSurahDetail = async (surahNumber) => {
    try {
      setLoading(true);
      const response = await fetchData(`/surah_detail/${surahNumber}`);
      if (response && response.surah_detail) {
        response.surah_detail.forEach((ayat) => {
          ayat.Tafsir_Bersih = getTafsirByKey(ayat, selectedTafsir);
        });
        setData(response.surah_detail);
      } else {
        throw new Error("Data surah tidak ditemukan");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // Scroll to top when changing page > current page
    if (page > currentPage) window.scrollTo({ top: 0, behavior: "smooth" });
    if (page < 1 || page > Math.ceil(data.length / itemsPerPage)) return;
    setCurrentPage(page);
    setPageInput(page);
  };

  useEffect(() => {
    setData((prev) =>
      prev.map((ayat) => ({
        ...ayat,
        Tafsir_Bersih: getTafsirByKey(ayat, selectedTafsir),
      }))
    );
  }, [selectedTafsir]);

  useEffect(() => {
    fetchSurahDetail(surah_number);
  }, [surah_number]);

  useEffect(() => {
    if (specificAyah && data.length > 0) {
      const ayahNumber = parseInt(specificAyah);
      const ayahIndex = data.findIndex((d) => d.Ayat === ayahNumber);
      if (ayahIndex !== -1) {
        const targetPage = Math.floor(ayahIndex / itemsPerPage) + 1;
        setCurrentPage(targetPage);
      }
    }
  }, [specificAyah, data]);
  useEffect(() => {
    if (specificAyah && data.length > 0) {
      const ayahElement = document.getElementById(`ayah-${specificAyah}`);
      if (ayahElement) {
        // Delay a little to make sure it's rendered
        setTimeout(() => {
          ayahElement.scrollIntoView({ behavior: "smooth", block: "start" });
          ayahElement.classList.add(
            "ring-2",
            "ring-yellow-400",
            "bg-yellow-50"
          );
          setTimeout(() => {
            ayahElement.classList.remove(
              "ring-2",
              "ring-yellow-400",
              "bg-yellow-50"
            );
          }, 3000);
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, specificAyah]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!data || data.length === 0)
    return <p className="p-4">Surah tidak ditemukan</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Surah {data[0].Nama_Surah_Indo} ({data[0].Surah})
      </h1>

      {/* Switch Tafsir */}
      <SwitcherTafsir
        selectedTafsir={selectedTafsir}
        setSelectedTafsir={setSelectedTafsir}
      />

      <ul className="space-y-6">
        {currentItems.map((ayat) => (
          <li
            key={ayat.Ayat}
            id={`ayah-${ayat.Ayat}`}
            className="bg-white p-6 rounded-2xl shadow border border-gray-100"
          >
            <p className="text-right text-3xl font-arabic mb-2 text-gray-800">
              {ayat.Teks_Arab}
            </p>
            <p className="text-gray-500 text-sm mb-1">Ayat {ayat.Ayat}</p>
            <p className="text-sm leading-relaxed">{ayat.Tafsir_Bersih}</p>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Jump to Page Input */}
      <div className="flex items-center gap-2">
        <label htmlFor="jumpPage" className="text-sm text-gray-600">
          Jump to:
        </label>
        <input
          id="jumpPage"
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={(e) => {
            console.log("Input changed:", e.target.value);
            setPageInput(e.target.value);
          }}
          // on enter, change page
          onKeyDown={(e) => {
            console.log("Key pressed:", e.key);
            if (e.key === "Enter") {
              const page = Number(pageInput);
              if (page < 1) {
                setCurrentPage(1);
                return;
              } else if (page > totalPages) {
                setCurrentPage(totalPages);
                return;
              } else if (!isNaN(page)) {
                // Only update if the input is a valid number
                setCurrentPage(page);
              } else {
                // If input is not a number, reset to current page
                setCurrentPage(currentPage);
              }
            }
          }}
          className="w-16 px-2 py-1 border rounded-lg text-center text-sm"
        />
      </div>
    </div>
  );
}
