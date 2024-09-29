<script lang="ts">
  import { onMount } from "svelte";
  import { getTasks, addTask, updateTask, deleteTask } from "../models/task";
  import TaskItem from "./TaskItem.svelte";

  let tasks = getTasks();
  let title = "";
  let description = "";
  let priority = "medium";
  let dueDate = "";

  onMount(() => {
    tasks = getTasks();
  });

  const handleAddTask = () => {
    addTask({ title, description, priority, dueDate });
    resetForm();
    tasks = getTasks();
  };

  export const handleDeleteTask = (ev) => {
    deleteTask(ev.detail.id);
    tasks = getTasks();
  };

  export const handleUpdateTask = (ev) => {
    updateTask(ev.detail.id, ev.detail.updatedTask);
    tasks = getTasks();
    console.log(tasks);
  };

  const resetForm = () => {
    title = "";
    description = "";
    priority = "medium";
    dueDate = "";
  };
</script>

<h2>Task Manager</h2>
<form on:submit|preventDefault={handleAddTask}>
  <input type="text" bind:value={title} placeholder="Title" required />
  <textarea bind:value={description} placeholder="Description" required
  ></textarea>

  <select bind:value={priority}>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <input type="date" bind:value={dueDate} required />

  <button type="submit">Add Task</button>
</form>

<ul>
  {#key tasks}
    {#each tasks as task}
      <TaskItem
        {task}
        on:deletetask={handleDeleteTask}
        on:updatetask={handleUpdateTask}
      />
    {/each}
  {/key}
</ul>
