import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "./AddTask";
import { describe, it, expect, vi } from "vitest";

describe("AddTask Component", () => {
  it("should render input and button", () => {
    render(<AddTask onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Enter task")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should call onAdd with input value", () => {
    const mockOnAdd = vi.fn();
    render(<AddTask onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Enter task");
    fireEvent.change(input, { target: { value: "Test Task" } });

    const button = screen.getByText("Add");
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith("Test Task");
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });
});
