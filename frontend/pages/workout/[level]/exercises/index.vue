<template>
  <Swipe
    :key="currentExerciseIndex"
    @handleSwipeLeft="handleSwipeLeft"
    @handleSwipeRight="handleSwipeRight"
    :swipeLeftNewCard="true"
    :swipeRightNewCard="true"
    :emojiLeftCard="workoutState ? '🔄' : '❌'"
    :emojiRightCard="workoutState ? '🏁' : '✔️'"
  >
    <template v-if="!exercises.length">
      <div class="h-52 bg-gray-400 rounded-t-3xl animate-pulse"></div>
      <div class="p-5 space-y-10 animate-pulse">
        <div class="flex flex-col items-center text-center space-y-2">
          <div class="h-8 bg-gray-400 rounded w-3/5"></div>
          <div class="h-6 bg-gray-400 rounded w-1/3"></div>
        </div>
        <div class="space-y-3">
          <div class="relative w-full h-2 bg-gray-400 rounded-full"></div>
          <p class="h-5 bg-gray-400 rounded w-1/3 mx-auto"></p>
        </div>
      </div>
    </template>
    <template v-else>
      <img
        v-if="workoutState"
        class="rounded-t-3xl w-full" src="/public/img/end-workout.gif"
        alt=""
      >
      <img
        v-else
        class="rounded-t-3xl w-full"
        :src="`/img//motivation${currentExerciseIndex+1}.gif`"
        alt=""
      >
      <!-- Card Body -->
      <div class="p-5 space-y-10">
        <div class="flex flex-col items-center text-center">
          <span v-if="workoutState">
            <p class="text-4xl font-medium">Well done ! 🔥</p>
          </span>
          <span v-else>
            <NuxtLink
              :to="`https://www.youtube.com/results?search_query=How to do ${currentExercise.name} ?`"
              target="_blank"
              class="flex text-4xl hover:text-dark/75 font-medium"
            >
              {{ currentExercise.name }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>

            </NuxtLink>
            <p class="text-2xl font-light">{{ currentExercise.task }}</p>
          </span>
        </div>
        <div class="flex flex-col items-center gap-5">
          <!-- Progress Bar -->

          <div class="relative w-full h-2 bg-dark/50 rounded-full">
            <!-- Dark Line -->
            <div
              class="absolute h-full bg-dark rounded-full transition-all duration-300"
              :style="{ width: `${currentStepPercentage}%` }"
            ></div>
            <!-- Dots -->
            <div
              v-for="(dot, index) in exercises.length"
              :key="index"
              class="absolute top-1/2 transform -translate-y-1/2 flex justify-center items-center"
              :style="{ left: `${(index / (exercises.length - 1)) * 98}%` }"
            >
              <!-- Circle representing the dot -->
              <div
                class="w-4 h-4 rounded-full transition-colors outline outline-3 duration-300"
                :class="[
                  exercises[index].done ? 'bg-green-600' : 'bg-red-600',
                  exercises[index] === currentExercise && !workoutState ? 
                    'outline-light' : 'outline-transparent'
                ]"
              ></div>
            </div>
          </div>

          <!-- Progress Text -->
          <p class="text-black font-medium">{{ (currentExerciseIndex+1) }} of {{ exercises.length }} exercises</p>
        </div>
      </div>
    </template>

  </Swipe>
</template>

<script setup>
  import { useExerciseStore } from '~/stores/exerciseStore';

  const router = useRouter();

  const { loadFromLocalStorage, nextExercise } = useExerciseStore();
  const { 
    exercises, 
    currentExercise, 
    currentExerciseIndex, 
    workoutState,
  } = storeToRefs(useExerciseStore())

  onMounted(() => {
    loadFromLocalStorage()
  });

  const handleSwipeLeft = () => {
    if (workoutState.value) router.push(`/workout`)
    else nextExercise(false)
  };

  const handleSwipeRight = () => {
    if (workoutState.value) router.push(`/`)
    else nextExercise(true)
  };

  const currentStepPercentage = computed(() => {
    return ((currentExerciseIndex.value) / ( exercises.value.length > 0 ?  exercises.value.length-1 : exercises.value.length)) * 100;
  });
</script>