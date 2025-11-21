export const generateTimes = (startHour, endHour, stepMinutes) => {
  const times = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      if (h === endHour && m > 0) break; //dont go beyond endHour
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
};

export const initializeTimes = () => {
  return generateTimes(17, 22, 15); // 5 PM to 10 PM every 15 mins
};

export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_BY_DATE" && typeof action.payload === "string") {
    // Simulate fetching availability for the selected date
    const date = action.payload;
    const slot = date ? [...date].reduce((s, ch) => s + ch.charCodeAt(0), 0) : 0;
    const modulus = (slot % 3) + 2;
    const times = generateTimes(17, 22, 15);
    const filtered = times.filter((_, idx) => idx % modulus !== slot % modulus);
    return filtered.length ? filtered : times.slice(0, 4);
  }
  return state;
};
