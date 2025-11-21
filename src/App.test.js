import { render, screen } from "@testing-library/react";
import BookingPage from "./pages/BookingPage";
import { initializeTimes, updateTimes } from "./utils/timeUtils";

test("renders BookingForm component", async () => {
  const availableTimes = ["17:00", "17:15", "17:30"];
  const setAvailableTimes = jest.fn();
  render(<BookingPage availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />);

  //const headingElement = screen.getByRole("heading", { level: 1 });
  const headingElement = screen.getByText("Reserve a table");
  //const headingElement = await screen.findByText("Reserve a table");

  //const headingElement = screen.getByRole("heading", { name: /reserve a table/i });
  expect(headingElement).toBeInTheDocument();
});

describe("initializeTimes", () => {
  test("returns an array of time slots", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
  });

  test("returns time slots from 17:00 to 22:00", () => {
    const times = initializeTimes();
    expect(times[0]).toBe("17:00");
    expect(times[times.length - 1]).toBe("22:00");
  });

  test("returns time slots in 15-minute intervals", () => {
    const times = initializeTimes();
    expect(times.length).toBe(21); // 5 PM (17:00) to 10 PM (22:00) = 21 slots
  });

  test("time slots are in HH:MM format", () => {
    const times = initializeTimes();
    times.forEach((time) => {
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});

describe("updateTimes", () => {
  test("returns filtered times when UPDATE_BY_DATE action is dispatched", () => {
    const initialState = initializeTimes();
    const action = { type: "UPDATE_BY_DATE", payload: "2025-11-21" };
    const result = updateTimes(initialState, action);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("returns different results for different dates", () => {
    const initialState = initializeTimes();
    const action1 = { type: "UPDATE_BY_DATE", payload: "2025-11-21" };
    const action2 = { type: "UPDATE_BY_DATE", payload: "2025-11-22" };
    const result1 = updateTimes(initialState, action1);
    const result2 = updateTimes(initialState, action2);
    expect(result1).not.toEqual(result2);
  });

  test("returns at least 4 time slots even if modulus filtering removes most", () => {
    const initialState = initializeTimes();
    const action = { type: "UPDATE_BY_DATE", payload: "2025-11-21" };
    const result = updateTimes(initialState, action);
    expect(result.length).toBeGreaterThanOrEqual(4);
  });

  test("returns unmodified state for unknown action type", () => {
    const initialState = initializeTimes();
    const action = { type: "UNKNOWN_ACTION" };
    const result = updateTimes(initialState, action);
    expect(result).toBe(initialState);
  });

  test("returns unmodified state if payload is not a string", () => {
    const initialState = initializeTimes();
    const action = { type: "UPDATE_BY_DATE", payload: 12345 };
    const result = updateTimes(initialState, action);
    expect(result).toBe(initialState);
  });

  test("returns the exact same state value provided when action is not UPDATE_BY_DATE", () => {
    const customState = ["18:00", "18:30", "19:00", "19:30"];
    const action = { type: "RESET" };
    const result = updateTimes(customState, action);
    expect(result).toBe(customState);
    expect(result).toEqual(customState);
  });
});
