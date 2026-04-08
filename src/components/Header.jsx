function Header({ currentDate, setCurrentDate }) {
  const changeMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex justify-between items-center mb-5">
      
      <button onClick={() => changeMonth(-1)}>←</button>

      <div className="flex items-center gap-3">
        <h2 className="font-semibold text-lg tracking-wide">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => setCurrentDate(new Date())}
          className="text-xs px-3 py-1 bg-black text-white rounded-full"
        >
          Today
        </button>
      </div>

      <button onClick={() => changeMonth(1)}>→</button>
    </div>
  );
}

export default Header;