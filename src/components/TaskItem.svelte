<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let task;

  const { id, title, description, priority, completed, dueDate } = task;

  function deleteTask(id) {
    dispatch("deletetask", { id });
  }

  function updateTask(task) {
    dispatch("updatetask", { task });
  }
</script>

<li
  class="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
>
  <div>
    <h2 class="text-lg font-semibold">{title}</h2>
    <p class="text-gray-600">{description}</p>
    <p class="text-sm text-gray-500">
      Due: {new Date(dueDate).toLocaleDateString()}
    </p>
    <span
      class={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full 
    ${
      priority === "high"
        ? "bg-red-500 text-white"
        : task.priority === "medium"
          ? "bg-yellow-500 text-white"
          : "bg-green-500 text-white"
    }`}
    >
      {task.priority}
    </span>
  </div>
  <div class="flex space-x-2">
    <button
      on:click={() => deleteTask(id)}
      class="text-red-500 hover:text-red-700 transition">Delete</button
    >
    <button
      on:click={() => {
        updateTask({
          ...task,
          completed: !completed,
        });
      }}
      class={completed
        ? "text-green-400 hover:underline transition"
        : "text-green-700 hover:underline transition"}
    >
      {completed ? "Mark Active" : "Mark Completed"}
    </button>
  </div>
</li>
