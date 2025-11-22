import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "../BookingForm";

describe("BookingForm validation", () => {
  test("shows validation errors when required fields are missing", async () => {
    const availableTimes = ["17:00", "18:00"];
    const onSubmitSuccess = jest.fn();

    render(<BookingForm availableTimes={availableTimes} onSubmitSuccess={onSubmitSuccess} />);

    const submitBtn = screen.getByRole("button", { name: /book table/i });
    await userEvent.click(submitBtn);

    // Required field errors should appear
    expect(await screen.findByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select a date/i)).toBeInTheDocument();

    // Callback should not be called when validation fails
    expect(onSubmitSuccess).not.toHaveBeenCalled();
  });

  test("calls onSubmitSuccess when all required fields are valid", async () => {
    const availableTimes = ["17:00", "18:00"];
    const onSubmitSuccess = jest.fn();

    render(<BookingForm availableTimes={availableTimes} onSubmitSuccess={onSubmitSuccess} />);

    // Fill in required fields
    await userEvent.type(screen.getByLabelText(/First Name/i), "Alice");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Smith");
    await userEvent.type(screen.getByLabelText(/Email/i), "alice@example.com");
    await userEvent.type(screen.getByLabelText(/Phone Number/i), "555-1234");

    // Pick a future date (safe far-future date)
    const dateInput = screen.getByLabelText(/Select Date/i);
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, "2026-01-01");

    // Ensure time is selected (default provided)
    const submitBtn = screen.getByRole("button", { name: /book table/i });
    await userEvent.click(submitBtn);

    // Callback should be called once with form data and reset function
    expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
    const [formData, resetFn] = onSubmitSuccess.mock.calls[0];
    expect(formData.firstName).toBe("Alice");
    expect(formData.lastName).toBe("Smith");
    expect(formData.email).toBe("alice@example.com");
    expect(formData.phone).toBe("555-1234");
    expect(typeof resetFn).toBe("function");
  });
});
