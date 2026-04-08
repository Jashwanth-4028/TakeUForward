import { useState } from "react";
import Day from "./Day";
import Notes from "./Notes";
import Header from "./Header";

const monthImages = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop"
];

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let days = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const days = generateCalendar(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const isSame = (a, b) =>
    a && b && a.toDateString() === b.toDateString();

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    return day >= startDate && day <= endDate;
  };

  const isPreview = (day) => {
    if (!startDate || endDate || !hoverDate) return false;
    return day >= startDate && day <= hoverDate;
  };

  const handleClick = (day) => {
    if (!day) return;

    if (!startDate) setStartDate(day);
    else if (!endDate) {
      if (day < startDate) setStartDate(day);
      else setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const monthIndex = new Date(currentDate).getMonth();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.25)] overflow-hidden">

        {/* HERO */}
        <div className="relative h-64">
          <img
            src={monthImages[monthIndex]}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/1600/900";
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 left-8 text-white">
            <h1 className="text-4xl font-bold">
              {currentDate.toLocaleString("default", { month: "long" })}
            </h1>
            <p>{currentDate.getFullYear()}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 md:flex gap-8">

          <Notes startDate={startDate} endDate={endDate} />

          <div className="flex-1">
            <Header
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />

            <div className="grid grid-cols-7 text-[11px] tracking-widest uppercase text-gray-400 mb-3">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
              {days.map((day, i) => (
                <Day
                  key={i}
                  day={day}
                  onClick={handleClick}
                  startDate={startDate}
                  endDate={endDate}
                  isInRange={isInRange}
                  isPreview={isPreview}
                  setHoverDate={setHoverDate}
                  today={today}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;