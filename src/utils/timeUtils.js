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

export const initializeTimes = (date = new Date()) => {
  if (typeof window !== "undefined" && typeof window.fetchAPI === "function") {
    try {
      const apiTimes = window.fetchAPI(date instanceof Date ? date : new Date(date));
      if (Array.isArray(apiTimes) && apiTimes.length > 0) {
        return apiTimes;
      }
    } catch (e) {
      console.warn("fetchAPI failed, falling back to generator");
    }
  }

  //Fallback for Tests
  return generateTimes(17, 22, 15); // 5 PM to 10 PM every 15 mins
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "SET_TIMES": {
      console.log("SET_TIMES action payload:", action.payload);
      return action.payload;
    }

    case "UPDATE_BY_DATE":
      const payload = action.payload;
      const dateObj = payload instanceof Date ? payload : typeof payload === "string" ? new Date(payload) : null;
      console.log("UPDATE_BY_DATE action for date:", dateObj);
      if (dateObj) {
        try {
          if (typeof window !== "undefined" && typeof window.fetchAPI === "function") {
            const timesFromApi = window.fetchAPI(dateObj);
            if (Array.isArray(timesFromApi) && timesFromApi.length > 0) {
              console.log("Using fetchAPI times:", timesFromApi);
              return timesFromApi;
            }
          }
        } catch (e) {
          console.warn("2) fetchAPI not available, falling back to default time generation.");
        }
        // Fallback deterministic filtering (previous behavior)
        const slot = [...dateObj.toISOString()].reduce((s, ch) => s + ch.charCodeAt(0), 0);
        const modulus = (slot % 3) + 2;
        const times = generateTimes(17, 22, 15);
        const filtered = times.filter((_, idx) => idx % modulus !== slot % modulus);
        return filtered.length ? filtered : times.slice(0, 4);
      }
      // If payload couldn't be parsed to a Date, return the current state unchanged
      return state;
    default:
      return state;
  }
};
