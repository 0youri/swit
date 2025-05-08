<template>
  <Swipe
    :key="currentExerciseIndex"
    @handleSwipeLeft="handleSwipeLeft"
    @handleSwipeRight="handleSwipeRight"
    :swipeLeftNewCard="true"
    :swipeRightNewCard="true"
    :emojiLeftCard="leftEmoji"
    :emojiRightCard="rightEmoji"
  >
    <!-- Loading State -->
    <template v-if="!exercises.length && !imageLoaded">
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

    <!-- Exercise Content -->
    <template v-else>
      <!-- Image Section -->
      <img
        class="rounded-t-3xl w-full"
        :src="baseURL + (workoutState ? endWorkoutImage : currentMotivationImage)"
        alt="Motivation"
        @load="onImageLoad"
      />

      <!-- Card Body -->
      <div class="p-5 space-y-10">
        <!-- Header -->
        <div class="flex flex-col items-center text-center">
          <p v-if="workoutState" class="text-4xl font-medium">
            Well done! 🔥
          </p>
          <div v-else>
            <NuxtLink
              :to="youtubeLink"
              target="_blank"
              class="flex text-3xl hover:text-dark/75 font-medium"
            >
              {{ currentExercise.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </NuxtLink>
            <p class="text-xl font-light">{{ currentExercise.task }}</p>
          </div>
        </div>

        <!-- Progress Section -->
        <div class="flex flex-col items-center gap-5">
          <ProgressBar
            :currentPercentage="currentStepPercentage"
            :exercises="exercises"
            :currentExercise="currentExercise"
            :workoutState="workoutState"
          />
          <p class="text-black font-medium">
            {{ currentExerciseIndex + 1 }} of {{ exercises.length }} exercises
          </p>
        </div>
      </div>
    </template>
  </Swipe>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exerciseStore';
import ProgressBar from '~/components/progressbar.vue';

const router = useRouter();
const config = useRuntimeConfig();
const baseURL = config.app.baseURL;
const imageLoaded = ref(false);
const { loadFromLocalStorage, nextExercise } = useExerciseStore();
const {
  exercises,
  currentExercise,
  currentExerciseIndex,
  workoutState,
} = storeToRefs(useExerciseStore());

// On component mount, load exercises from localStorage
onMounted(() => {
  loadFromLocalStorage();
});

const onImageLoad = () => {
  imageLoaded.value = true;
};

// Computed properties
const currentStepPercentage = computed(() =>
  exercises.value.length
    ? (currentExerciseIndex.value / (exercises.value.length - 1)) * 100
    : 0
);

const leftEmoji = computed(() => (workoutState.value ? '🔄' : '❌'));
const rightEmoji = computed(() => (workoutState.value ? '🏁' : '✔️'));

const currentMotivationImage = computed(
  () => `img/motivation${currentExerciseIndex.value + 1}.gif`
);

const endWorkoutImage = 'img/end-workout.gif';

const youtubeLink = computed(() =>
  `https://www.youtube.com/results?search_query=How to do ${currentExercise.value?.name || ''} ?`
);

// Swipe Handlers
const handleSwipeLeft = () => {
  workoutState.value ? router.push(`/workout`) : nextExercise(false);
};

const handleSwipeRight = () => {
  workoutState.value ? router.push(`/`) : nextExercise(true);
};
</script>