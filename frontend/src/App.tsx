import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskTable from "./components/TasksTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "./types/task";
import { deleteTask, fetchTasks, updateTaskCompletion } from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    };
    getTasks();
  }, []);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Tarefa excluída com sucesso!");
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  const handleToggleCompleted = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const newStatus = task.completed === 1 ? 0 : 1;
      await updateTaskCompletion(id, newStatus);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      toast.success("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar status da tarefa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Minha Lista de Tarefas</h1>
      <TaskInput onAddTask={handleTaskUpdate} />
      <ToastContainer position="top-center" autoClose={3000} />
      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={handleDeleteTask}
        onToggleCompleted={handleToggleCompleted}
      />
    </div>
  );
};

export default App;
