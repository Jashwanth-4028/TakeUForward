function Day({
  day,
  onClick,
  startDate,
  endDate,
  isInRange,
  isPreview,
  setHoverDate,
  today
}) {
  if (!day) return <div />;

  const same = (a, b) =>
    a && b && a.toDateString() === b.toDateString();

  const isStart = same(day, startDate);
  const isEnd = same(day, endDate);
  const inRange = isInRange(day);
  const preview = isPreview(day);
  const isToday = same(day, today);

  let style =
    "relative h-12 flex items-center justify-center rounded-2xl cursor-pointer text-sm transition-all duration-200";

  // 🔥 FINAL FIX
  if (isStart || isEnd) {
    style += " bg-black text-white shadow-lg scale-105";
  } else if (inRange) {
    style += " bg-gray-300";
  } else if (preview) {
    style += " bg-gray-200";
  } else {
    style += " bg-white shadow-sm hover:shadow-md hover:scale-105";
  }

  return (
    <div
      className={style}
      onClick={() => onClick(day)}
      onMouseEnter={() => setHoverDate(day)}
      onMouseLeave={() => setHoverDate(null)}
    >
      {/* TODAY */}
      {isToday && (
        <div className="absolute inset-0 border-2 border-black rounded-2xl" />
      )}

      {day.getDate()}
    </div>
  );
}

export default Day;