import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EmployeesPage from "../components/employees/EmployeesPage";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock(
  "../components/employees/PostModal",
  () =>
    ({ isOpen, onClose, addEmployee }) =>
      isOpen ? (
        <div>
          <div data-testid="modal">Modal Content</div>
          <button
            onClick={() => {
              addEmployee({
                firstName: "New",
                lastName: "Employee",
                email: "new@employee.com",
                age: 30,
              });
              onClose();
            }}
          >
            Submit New Employee Button
          </button>
          <button onClick={onClose}>Close Modal Button</button>
        </div>
      ) : null
);

jest.mock(
  "../components/employees/EmployeeItem",
  () =>
    ({ employee, onDelete }) =>
      (
        <div data-testid="employee-item">
          {employee.firstName} {employee.lastName}
          <button onClick={() => onDelete(employee.id)}>
            Delete {employee.firstName} {employee.lastName} Button
          </button>
        </div>
      )
);

beforeEach(() => {
  fetchMock.resetMocks();
});

test("fetches and displays employees on mount", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        firstName: "First",
        lastName: "Employee",
        email: "first@employee.com",
        age: 30,
      },
      {
        id: 2,
        firstName: "Second",
        lastName: "Employee",
        email: "second@employee.com",
        age: 25,
      },
    ])
  );

  render(<EmployeesPage />);

  await waitFor(() =>
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/api/employees",
      expect.any(Object)
    )
  );

  await waitFor(() =>
    expect(screen.getAllByTestId("employee-item")).toHaveLength(2)
  );
  expect(screen.getByText("First Employee")).toBeInTheDocument();
  expect(screen.getByText("Second Employee")).toBeInTheDocument();
});

test("adds a new employee", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        age: 30,
      },
    ])
  );

  render(<EmployeesPage />);

  await waitFor(() =>
    expect(screen.getAllByTestId("employee-item")).toHaveLength(1)
  );

  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        age: 30,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@doe.com",
        age: 25,
      },
      {
        id: 3,
        firstName: "New",
        lastName: "Employee",
        email: "new@employee.com",
        age: 30,
      },
    ])
  );

  fireEvent.click(screen.getByText("Dodaj pracownika"));
  fireEvent.click(screen.getByText("Submit New Employee Button"));

  await waitFor(() =>
    expect(screen.getAllByTestId("employee-item")).toHaveLength(3)
  );
  expect(screen.getByText("New Employee")).toBeInTheDocument();
});

test("deletes an employee", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        age: 30,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@doe.com",
        age: 25,
      },
    ])
  );

  render(<EmployeesPage />);

  await waitFor(() =>
    expect(screen.getAllByTestId("employee-item")).toHaveLength(2)
  );

  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        age: 30,
      },
    ])
  );

  fireEvent.click(screen.getByText("Delete Jane Doe Button"));

  await waitFor(() =>
    expect(screen.getAllByTestId("employee-item")).toHaveLength(1)
  );
  expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
});
