import ButtonTafsir from "./ButtonTafsir";

export default function SwitcherTafsir({ selectedTafsir, setSelectedTafsir }) {
  return (
    <div className="mb-6 flex gap-2 items-center">
      <span className="text-sm font-medium">Tafsir:</span>
      <ButtonTafsir
        onClick={() => setSelectedTafsir("terjemahan")}
        selected={selectedTafsir === "terjemahan"}
        label="Terjemahan"
      />

      <ButtonTafsir
        onClick={() => setSelectedTafsir("jalalain")}
        selected={selectedTafsir === "jalalain"}
        label="Jalalain"
      />

      <ButtonTafsir
        onClick={() => setSelectedTafsir("mukhtasar")}
        selected={selectedTafsir === "mukhtasar"}
        label="Mukhtasar"
      />
    </div>
  );
}
