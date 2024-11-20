<template>
  <div
    class="text-lg lg:text-xl font-light border-2 w-full text-center py-3 lg:py-4 border-dark rounded-xl"
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