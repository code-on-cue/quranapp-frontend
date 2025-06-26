import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../networks/apiService";
import { sleep } from "../utils/sleep";

export default function DoaPerTemaPage() {
  const [temaList, setTemaList] = useState([]);
  const [temaAktif, setTemaAktif] = useState(null);
  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeTheme = (tema) => {
    if (loading) return;
    setTemaAktif(tema);
  };

  const fetchRekomendasiDoa = useCallback(async () => {
    if (!temaAktif) return;
    setLoading(true);
    await sleep(600);
    fetchData(`/rekomendasi_doa/${temaAktif}`)
      .then((data) => setDoaList(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [temaAktif]);

  useEffect(() => {
    fetchData("/tema_rekomendasi_doa")
      .then((data) => setTemaList(data.tema))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchRekomendasiDoa();
  }, [fetchRekomendasiDoa]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kumpulan Doa Berdasarkan Tema</h1>

      {/* Pilih Tema */}
      <div className="flex flex-wrap gap-2 mb-6">
        {temaList.map((tema) => (
          <button
            key={tema}
            onClick={() => onChangeTheme(tema)}
            className={`px-4 py-2 rounded-xl text-sm border transition-all shadow-sm ${
              temaAktif === tema
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {tema}
          </button>
        ))}
      </div>

      {/* Daftar Doa */}
      {loading ? (
        <p className="text-gray-500">Memuat doa...</p>
      ) : doaList.length > 0 ? (
        <ul className="space-y-6">
          {doaList.map((doa, i) => (
            <li
              key={i}
              className="bg-white p-6 rounded-2xl shadow border border-gray-100"
            >
              <p className="text-right text-2xl font-arabic mb-2 text-gray-800">
                {doa.bacaan_arab}
              </p>
              <p className="text-sm text-gray-500 italic mb-1">
                {doa["nama_&_nomor_surat/doa"]}
              </p>
              <p className="text-sm text-gray-600 mb-2">{doa.bacaan_latin}</p>
              <p className="text-base font-medium">{doa.terjemahan}</p>
              <p className="text-sm text-gray-500 mt-2">
                {doa.bacaan_untuk_apa}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Sumber: {doa.rujukan_bacaan_dari}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Silakan pilih tema di atas untuk melihat doa-doa terkait.
        </p>
      )}
    </div>
  );
}
