import { render, screen, fireEvent } from '@testing-library/react';
import AddTasks from './AddTasks';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AddTasks Component', () => {
  const setup = () => {
    const setIsModalOpen = vi.fn();
    const setIsLoading = vi.fn();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <AddTasks setIsModalOpen={setIsModalOpen} setIsLoading={setIsLoading} />
      </Provider>
    );

    return { setIsModalOpen, setIsLoading, store };
  };

  test('renders all form fields and the add button', () => {
    setup();

    expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
  });

  test('fills form and dispatches action on submit', async () => {
    const { store, setIsModalOpen, setIsLoading } = setup();

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), {
      target: { value: 'Test Task' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), {
      target: { value: 'This is a test task' },
    });

    fireEvent.change(screen.getByDisplayValue('pending'), {
      target: { value: 'Completed' },
    });

    fireEvent.change(screen.getByLabelText(/Due Date/i) || screen.getByDisplayValue(""), {
      target: { value: '2025-12-31' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    // Wait a tick to allow async dispatch
    await new Promise((r) => setTimeout(r, 10));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0); // At least one dispatch
    expect(setIsLoading).toHaveBeenCalled();
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
