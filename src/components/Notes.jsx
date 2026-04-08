import { useState, useEffect } from "react";

function Notes({ startDate, endDate }) {
  const key =
    startDate && endDate
      ? `${startDate}-${endDate}`
      : "default";

  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(key);
    setNote(saved || "");
  }, [key]);

  const save = () => {
    localStorage.setItem(key, note);
  };

  return (
    <div className="md:w-72 bg-white rounded-2xl shadow-xl p-5 border border-gray-200">

      <h3 className="text-lg font-semibold mb-3">Notes</h3>

      <div className="text-xs text-gray-500 mb-3">
        {startDate && endDate
          ? `${startDate.toDateString()} → ${endDate.toDateString()}`
          : "Select a date range"}
      </div>

      <textarea
        className="w-full h-40 p-3 rounded-xl bg-white shadow-inner border border-gray-200 outline-none focus:ring-2 focus:ring-black/20"
        placeholder="Write your thoughts..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={save}
        className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
      >
        Save Notes
      </button>
    </div>
  );
}

export default Notes;