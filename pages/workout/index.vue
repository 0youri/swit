<template>
  <div class="flex flex-col justify-center flex-grow items-center gap-5">
    <h1 class="text-center text-4xl ">
      Choose your level
    </h1>
    <div class="flex flex-col justify-center text-center gap-5">
      <NuxtLink
        v-for="level in levels"
        :key="level.name"
        :to="{ name: 'workout-level', params: { level: level.id } }"
        class="text-xl border-2 px-14 py-5 rounded-xl cursor-pointer lg:hover:bg-accent"
      >
        {{ level.name }} {{ level.emoji }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

  const levels = [
    { id: 'beginner', name: 'Beginner', emoji: '😊' },
    { id: 'intermediate', name: 'Intermediate', emoji: '😤' },
    { id: 'advanced', name: 'Advanced', emoji: '😈' },
  ];

</script>
