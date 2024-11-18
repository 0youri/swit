<template>
  <div
    class="text-2xl font-light border-2 w-full text-center py-4 border-dark rounded-xl"
  >
    {{ exercise.name }} • {{ exercise.task }}
  </div>
</template>

<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});
</script>