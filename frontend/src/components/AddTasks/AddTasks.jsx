/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addTask } from "../../utils/slices/taskSlice";

const AddTasks = ({ setIsModalOpen, setIsLoading }) => {
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(addTask(taskForm));
      setTaskForm(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setTaskForm(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg w-96 text-slate-100 relative"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold ">Add Task</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-0 top-0"
        >
          <IoIosCloseCircleOutline className="mb-2 text-2xl" />
        </button>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          value={taskForm?.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          value={taskForm?.description}
          onChange={(e) =>
            setTaskForm({ ...taskForm, description: e.target.value })
          }
        ></textarea>
        <select
          value={taskForm?.status}
          onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
        >
          <option>Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          value={taskForm?.dueDate}
          onChange={(e) =>
            setTaskForm({ ...taskForm, dueDate: e.target.value })
          }
        />
        <button className="w-full bg-slate-100 text-black font-bold py-2 rounded-lg hover:bg-slate-300">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
