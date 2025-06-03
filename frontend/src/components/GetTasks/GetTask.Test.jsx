import { render, screen, fireEvent } from '@testing-library/react';
import GetTasks from './GetTasks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { vi } from 'vitest';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
  fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
}));

// Mock actions
vi.mock('../../utils/slices/taskSlice', () => ({
  fetchSingleTask: vi.fn(() => ({ payload: { data: { title: 'Mocked Task', description: 'Mocked Desc' } } })),
  updateTask: vi.fn(() => Promise.resolve()),
  deleteTask: vi.fn(() => Promise.resolve()),
}));

const mockStore = configureStore([thunk]);

describe('GetTasks Component', () => {
  const filteredTasks = [
    {
      _id: '1',
      title: 'Test Task 1',
      description: 'Description 1',
      dueDate: '2025-06-30',
      status: 'pending',
    },
  ];

  const setup = () => {
    const setOpenTaskUpdateModal = vi.fn();
    const setGetTask = vi.fn();
    const setTaskForm = vi.fn();
    const setIsLoading = vi.fn();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <GetTasks
          filteredTasks={filteredTasks}
          setOpenTaskUpdateModal={setOpenTaskUpdateModal}
          setGetTask={setGetTask}
          setTaskForm={setTaskForm}
          setIsLoading={setIsLoading}
        />
      </Provider>
    );

    return {
      setOpenTaskUpdateModal,
      setGetTask,
      setTaskForm,
      setIsLoading,
    };
  };

  test('renders a task item correctly', () => {
    setup();
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('2025-06-30')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  test('clicking edit button opens update modal', async () => {
    const { setOpenTaskUpdateModal, setGetTask, setTaskForm } = setup();

    fireEvent.click(screen.getByRole('button', { name: '' })); // Edit icon has no label
    await new Promise((r) => setTimeout(r, 10)); // wait for async

    expect(setOpenTaskUpdateModal).toHaveBeenCalledWith(true);
    expect(setGetTask).toHaveBeenCalled();
    expect(setTaskForm).toHaveBeenCalled();
  });

  test('clicking delete triggers SweetAlert and deleteTask', async () => {
    const { setIsLoading } = setup();

    const deleteButtons = screen.getAllByRole('button');
    const deleteBtn = deleteButtons[deleteButtons.length - 1]; // last button is delete
    fireEvent.click(deleteBtn);

    await new Promise((r) => setTimeout(r, 50)); // simulate SweetAlert resolving
    expect(Swal.fire).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(false); // after delete
  });

  test('clicking status button updates task status', async () => {
    const { setIsLoading } = setup();

    fireEvent.click(screen.getByText(/pending/i));
    await new Promise((r) => setTimeout(r, 10));

    expect(setIsLoading).toHaveBeenCalled();
  });
});
