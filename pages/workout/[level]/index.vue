<template>
  <Swipe
    @handleSwipeLeft="handleSwipeLeft"
    @handleSwipeRight="handleSwipeRight"
    :swipeLeftNewCard="true"
    :swipeRightNewCard="true"
    emojiLeftCard="🔄"
    emojiRightCard="▶️"
  >
    <!-- Loading State -->
    <template v-if="!exercises.length">
      <div class="p-5 space-y-10 animate-pulse">
        <div class="h-8 bg-gray-400 rounded w-2/3 mx-auto"></div>
        <div class="h-4 bg-gray-400 rounded w-1/3 mx-auto"></div>
        <div class="space-y-3">
          <div
            v-for="i in 5"
            :key="i"
            class="h-12 bg-gray-400 rounded-xl w-full"
          ></div>
        </div>
      </div>
    </template>

    <!-- Workout Content -->
    <template v-else>
      <div class="p-5 space-y-5">
        <!-- Card Header -->
        <div class="flex flex-col items-center">
          <p class="text-3xl font-semibold">Your workout</p>
          <span class="text-md">
            {{ level }}
            <span>{{ levelEmoji }}</span>
          </span>
        </div>

        <!-- Card Body -->
        <div class="flex flex-col items-center gap-5">
          <WorkoutCard
            v-for="exercise in exercises"
            :key="exercise.name"
            :exercise="exercise"
          />
        </div>
      </div>
    </template>
  </Swipe>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exerciseStore';
import WorkoutCard from '~/components/workoutcard.vue';

const { fetchExercises } = useExerciseStore();
const { exercises } = storeToRefs(useExerciseStore());

const router = useRouter();
// const route = useRoute();
const { level } = defineProps<{ level: string }>()

// Computed property for emoji based on level
const levelEmoji = computed(() => {
  const emojiMap = {
    beginner: '😊',
    intermediate: '😤',
    advanced: '😈',
  };
  return emojiMap[level] || '';
});

// Handle swipe actions
const handleSwipeLeft = () => {
  fetchExercises(level);
};

const handleSwipeRight = () => {
  router.push(`/workout/${level}/exercises`);
};

// Fetch exercises on mount
onMounted(() => {
  fetchExercises(level);
});
</script>