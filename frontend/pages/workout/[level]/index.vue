<template>
  <Swipe
    @handleSwipeLeft="handleSwipeLeft"
    @handleSwipeRight="handleSwipeRight"
    :swipeLeftNewCard="true"
    :swipeRightNewCard="true"
    emojiLeftCard="🔄"
    emojiRightCard="▶️"
  >
    <!-- Card Header -->
    <template v-if="!exercises.length">
      <div class="p-5 space-y-10 animate-pulse">
        <!-- Skeleton Header -->
        <div class="h-8 bg-gray-400 rounded w-2/3 mx-auto"></div>
        <div class="h-4 bg-gray-400 rounded w-1/3 mx-auto"></div>

        <!-- Skeleton Body -->
        <div class="space-y-3">
          <div class="h-12 bg-gray-400 rounded-xl w-full"></div>
          <div class="h-12 bg-gray-400 rounded-xl w-full"></div>
          <div class="h-12 bg-gray-400 rounded-xl w-full"></div>
          <div class="h-12 bg-gray-400 rounded-xl w-full"></div>
          <div class="h-12 bg-gray-400 rounded-xl w-full"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="p-5 space-y-10">
        <div class="flex flex-col items-center">
          <p class="text-4xl font-semibold">Your workout</p>
          <span class="text-md">
            {{ level }}
            <span v-if="level === 'beginner'">😊</span>
            <span v-else-if="level === 'intermediate'">😤</span>
            <span v-else-if="level === 'advanced'">😈</span>
          </span>
        </div>
        <!-- Card Body -->
        <div class="flex flex-col items-center gap-5">
          <div
            v-for="exercise in exercises"
            :key="exercise.name"
            class="text-2xl font-light border-2 w-full text-center py-4 border-dark rounded-xl"
          >
            {{ exercise.name }} • {{ exercise.task }}
          </div>
        </div>
      </div>
    </template>
  </Swipe>
</template>

<script setup>
  import { useExerciseStore } from '~/stores/exerciseStore';

  const { fetchExercises } = useExerciseStore();
  const { exercises } = storeToRefs(useExerciseStore())

  const router = useRouter();
  const route = useRoute()
  const level = ref(route.params.level)

  const handleSwipeLeft = () => {
    fetchExercises(level.value)
  };

  const handleSwipeRight = () => {
    router.push(`/workout/${level.value}/exercises`);
  };

  onMounted(() => {
    fetchExercises(level.value)
  })
</script>