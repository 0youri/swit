<template>
  <Swipe
    @swipeLeft="handleSwipeLeft"
    @swipeRight="handleSwipeRight"
    :swipeLeftNewCard="true"
    :swipeRightNewCard="false"
  >
    <!-- Card Header -->
      <div class="p-5 space-y-10">
        <div class="flex flex-col items-center">
          <p class="text-4xl">Your workout</p>
          <span class="text-md">advanced 😈</span>
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
  </Swipe>
</template>

<script setup>
  const router = useRouter();

  const allExercises = [
    { name: 'Jump Squats', task: '15 reps' },
    { name: 'Lunges', task: '20 reps' },
    { name: 'Plank Shoulder Taps', task: '30 taps' },
    { name: 'Side Plank', task: '20 sec' },
    { name: 'Mountain Climbers', task: '40 reps' },
    { name: 'Push-Ups', task: '15 reps' },
    { name: 'Burpees', task: '10 reps' },
    { name: 'High Knees', task: '30 sec' },
    { name: 'Leg Raises', task: '20 reps' },
    { name: 'Flutter Kicks', task: '30 sec' },
    { name: 'Wall Sit', task: '1 min' },
    { name: 'Triceps Dips', task: '12 reps' },
    { name: 'Bicycle Crunches', task: '20 reps' },
    { name: 'Superman Hold', task: '30 sec' },
    { name: 'Side Lunges', task: '15 reps' },
    { name: 'Calf Raises', task: '25 reps' },
    { name: 'Step-Ups', task: '20 reps' },
    { name: 'Reverse Lunges', task: '20 reps' },
    { name: 'Inchworms', task: '10 reps' },
    { name: 'Bear Crawl', task: '30 sec' },
  ];

  const exercises = ref([]);

  const fetchRandomExercises = (count = 5) => {
    const shuffled = allExercises.sort(() => Math.random() - 0.5);
    exercises.value = shuffled.slice(0, count); // Update the ref
  };

  const handleSwipeLeft = () => {
    fetchRandomExercises(5)
  };

  const handleSwipeRight = () => {
    router.push('/workout');
  };

  onMounted(() => {
    fetchRandomExercises(5)
  })
</script>