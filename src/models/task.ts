import type { Task } from "@/types";

let tasks: Task[] = [];
let nextId = 1;

export const getTasks = () => tasks;

export const addTask = (task: Omit<Task, "id">) => {
  const newTask = { ...task, id: nextId++, completed: false };
  tasks.push(newTask);
};

export const updateTask = (id: number, updatedTask: Partial<Task>) => {
  console.group("id:", id);
  console.group("updatedTask:", updatedTask);
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
  }
};

export const deleteTask = (id: number) => {
  tasks = tasks.filter((task) => task.id !== id);
};
