<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let task;

  const { id, title, description, priority, completed, dueDate } = task;

  function deleteTask(id) {
    dispatch("deletetask", { id: id });
  }

  function updateTask(id, updatedTask) {
    dispatch("updatetask", { id: id, updatedTask: updatedTask });
  }
</script>

<li>
  <strong>{title}</strong> - {description}
  <span>({priority})</span>
  <span>{dueDate}</span>
  <button on:click={() => deleteTask(id)}>Delete</button>
  <button
    on:click={() => {
      console.log(completed);
      updateTask(id, { completed: !completed });
    }}
  >
    {completed ? "Mark Active" : "Mark Completed"}
  </button>
</li>
