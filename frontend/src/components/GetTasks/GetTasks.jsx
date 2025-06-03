/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import toast from "react-hot-toast";
import { CiCalendarDate, CiNoWaitingSign } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteTask,
  fetchSingleTask,
  updateTask,
} from "../../utils/slices/taskSlice";

const GetTasks = ({
  filteredTasks,
  setOpenTaskUpdateModal,
  setGetTask,
  setTaskForm,
  setIsLoading,
}) => {
  const dispatch = useDispatch();

  const handelGetTask = async (id) => {
    setOpenTaskUpdateModal(true);
    const task = await dispatch(fetchSingleTask(id));
    setGetTask(task?.payload.data);
    setTaskForm(task?.payload.data);
  };

  const handelUpdateStatus = async (id, statusM) => {
    setIsLoading(true);

    let status = statusM === "pending" ? "completed" : "pending";

    try {
      await dispatch(updateTask({ taskId: id, updatedData: { status } }));
      toast.success(`Task status updated to ${status}!`);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    setIsLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(taskId));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#d33",
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <ul className="space-y-4">
      {filteredTasks
        ?.slice()
        .reverse()
        ?.map(
          (
            task // ✅ Reverse the tasks
          ) => (
            <li
              key={task._id}
              className="bg-slate-700 flex justify-between p-4 rounded-lg shadow"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-slate-300">{task.description}</p>
                <p className="text-sm text-slate-400 flex items-center gap-x-1">
                  <CiCalendarDate className="text-slate-400 text-xl" />
                  {task.dueDate}
                </p>
                <button
                  onClick={() => handelUpdateStatus(task._id, task.status)}
                  className={`text-sm font-bold p-1 rounded-md w-20 flex items-center gap-x-1 capitalize  
                      ${
                        task.status === "pending"
                          ? "text-yellow-400 bg-yellow-300/20"
                          : "text-green-400 bg-green-300/20"
                      }`}
                >
                  {task.status}
                  {task.status === "pending" ? (
                    <CiNoWaitingSign className="text-xl" />
                  ) : (
                    <GrStatusGood className="text-xl" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => handelGetTask(task._id)}
                  className="text-green-400 hover:text-green-600 flex items-center"
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-400 hover:text-red-600 flex items-center"
                >
                  <MdDelete className="text-2xl" />
                </button>
              </div>
            </li>
          )
        )}
    </ul>
  );
};

export default GetTasks;
