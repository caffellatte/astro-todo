<script lang="ts">
  import { onMount } from "svelte";
  import { actions } from "astro:actions";
  import TaskItem from "./TaskItem.svelte";

  let filter = "all";

  let tasks = [];

  let newTask = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  };

  let priority = "medium";

  const fetchTasks = async () => {
    const response = await actions.getTasks();
    tasks = response.data;
  };

  const handleCreateTask = async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    await actions.createTask(formData);

    fetchTasks();

    newTask.title = "";
    newTask.description = "";
    newTask.dueDate = "";
  };

  const handleDeleteTask = async (ev) => {
    await actions.deleteTask({ id: ev.detail.id });

    fetchTasks();
  };

  const handleUpdateTask = async (ev) => {
    await actions.updateTask(ev.detail.task);

    fetchTasks();
  };

  const resetForm = () => {
    title = "";
    description = "";
    priority = "medium";
    dueDate = "";
  };

  onMount(fetchTasks);
</script>

<div class="flex flex-col gap-6">
  <form
    on:submit|preventDefault={(e) => handleCreateTask(e)}
    class="flex flex-col gap-4"
  >
    <div class="flex flex-col gap-2">
      <input
        type="text"
        bind:value={newTask.title}
        name="title"
        placeholder="Title"
        required
        class="border border-gray-300 rounded-md p-2 w-full"
      />
      <textarea
        bind:value={newTask.description}
        name="description"
        placeholder="Description"
        required
        class="border border-gray-300 rounded-md p-2 w-full"
      ></textarea>

      <select
        bind:value={newTask.priority}
        name="priority"
        class="border border-gray-300 rounded-md p-2 w-full"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        bind:value={newTask.dueDate}
        name="dueDate"
        required
        class="border border-gray-300 rounded-md p-2 w-full"
      />
    </div>

    <button
      type="submit"
      class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >Add Task</button
    >
  </form>

  <div class="mb-4">
    <label>
      <input type="radio" bind:group={filter} value="all" />
      All
    </label>
    <label>
      <input type="radio" bind:group={filter} value="active" />
      Active
    </label>
    <label>
      <input type="radio" bind:group={filter} value="completed" />
      Completed
    </label>
  </div>

  <ul class="space-y-4">
    {#key tasks}
      {#each tasks.filter((task) => filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed)) as task (task.id)}
        <TaskItem
          {task}
          on:deletetask={handleDeleteTask}
          on:updatetask={handleUpdateTask}
        />
      {/each}
    {/key}
  </ul>
</div>
