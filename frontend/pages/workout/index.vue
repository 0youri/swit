<template>
  <div class="flex flex-col justify-center flex-grow items-center gap-5">
    <h1 class="text-center text-4xl">
      Choose your level
    </h1>
    <div class="flex flex-col justify-center text-center gap-5 cursor-pointer">
      <NuxtLink
        :to="{ name: 'workout-level', params: { level: 'beginner' } }"
        class="text-2xl border-2 px-20 py-5 rounded-xl hover:bg-accent "
      >
        Beginner 😊
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'workout-level', params: { level: 'intermediate' } }"
        class="text-2xl border-2 px-20 py-5 rounded-xl hover:bg-accent"
      >
        Intermediate 😤
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'workout-level', params: { level: 'advanced' } }"
        class="text-2xl border-2 px-20 py-5 rounded-xl hover:bg-accent"
      >
        Advanced 😈
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>