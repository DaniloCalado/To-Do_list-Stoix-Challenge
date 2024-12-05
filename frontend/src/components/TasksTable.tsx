import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Task } from "../types/task";


interface TaskTableProps {
  tasks: Task[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete, onToggleCompleted }) => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="overflow-x-auto py-4 md:px-36">
      {tasks.length === 0 ? (
        <p className="text-center bg-gray-300 text-gray-500 py-12">Ainda não foram criadas tarefas</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Data de Criação</th>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2 hidden md:table">Descrição</th>
              <th className="px-4 py-2">Concluída</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  {format(new Date(task.created_at), "dd/MM/yyyy", { locale: pt })}
                </td>
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2 hidden md:table">{task.description}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={task.completed === 1}
                    onChange={() => onToggleCompleted(task.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => onEdit(task.id)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskTable;
