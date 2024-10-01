import z from "zod";
import { defineAction } from "astro:actions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]),
  completed: z.boolean().optional(),
  dueDate: z.string(),
});

// Action to create a task
const createTask = defineAction({
  input: taskSchema,
  accept: "form",
  handler: async (input) => {
    const task = await prisma.task.create({
      data: { ...input, dueDate: new Date(input.dueDate) },
    });
    return task;
  },
});

// Action to get all tasks
const getTasks = defineAction({
  handler: async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
  },
});

// Action to update a task
const updateTask = defineAction({
  input: taskSchema.refine(
    async (data) => {
      if (!data.id) {
        return false;
      }
      return true;
    },
    {
      message: "id is a required",
      path: ["id"],
    }
  ),
  handler: async (input) => {
    const task = await prisma.task.update({
      where: { id: input.id },
      data: input,
    });
    return task;
  },
});

// Action to delete a task
const deleteTask = defineAction({
  input: z.object({
    id: z.number(),
  }),
  handler: async (input) => {
    await prisma.task.delete({
      where: { id: input.id },
    });
    return { success: true };
  },
});

export const server = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
