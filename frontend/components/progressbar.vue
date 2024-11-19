<template>
  <div class="relative w-full h-2 bg-dark/50 rounded-full">
    <!-- Filled Progress -->
    <div
      class="absolute h-full bg-dark rounded-full transition-all duration-300"
      :style="{ width: `${currentPercentage}%` }"
    ></div>

    <!-- Dots -->
    <div
      v-for="(dot, index) in exercises.length"
      :key="index"
      class="absolute top-1/2 transform -translate-y-1/2 flex justify-center items-center"
      :style="{ left: `${(index / (exercises.length - 1)) * 98}%` }"
    >
      <div
        class="w-4 h-4 rounded-full transition-colors outline outline-3 duration-300"
        :class="[
          exercises[index].done ? 'bg-green-600' : 'bg-red-600',
          exercises[index] === currentExercise && !workoutState
            ? 'outline-light'
            : 'outline-transparent',
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentPercentage: { type: Number, required: true },
  exercises: { type: Array, required: true },
  currentExercise: { type: Object, required: true },
  workoutState: { type: Boolean, required: true },
});
</script>