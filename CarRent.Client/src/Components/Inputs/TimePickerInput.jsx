import React, { useState } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Clock } from "lucide-react";

export default function TimePickerInput({ label, onChange, value }) {
  const [time, setTime] = useState('00:00');

  const handleChange = (newTime) => {
    setTime(newTime);
    if (onChange) {
      onChange(newTime);
    }
  };

  return (
    <div className="w-full">
      <label className="block font-medium text-black mb-3">{label}</label>
      <div className="relative w-full">
        <TimePicker
          onChange={handleChange}
          value={value || time}
          disableClock={true} 
          format="HH:mm"
          hourPlaceholder="00"
          minutePlaceholder="00"
          className="time-input"
        />
        <Clock className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
      </div>
    </div>
  );
}
