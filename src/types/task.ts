const PRIORITIES = ["low", "medium", "high"] as const;

type Priorities = typeof PRIORITIES;

type Priority = Priorities[number];

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
