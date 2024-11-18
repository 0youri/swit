import { defineStore } from 'pinia';

export const useExerciseStore = defineStore('exerciseStore', () => {
  
  const exercises = ref([])
  const currentExerciseIndex = ref(0); 
  const workoutState = ref(false)
  const allExercises = {
    beginner: [
      { name: 'Wall Sit', task: '1 min' },
      { name: 'Calf Raises', task: '25 reps' },
      { name: 'Step-Ups', task: '20 reps' },
      { name: 'Inchworms', task: '10 reps' },
      { name: 'Plank Taps', task: '30 taps' },
      { name: 'High Knees', task: '30 sec' },
      { name: 'Leg Raises', task: '15 reps' },
      { name: 'Butterfly Kicks', task: '30 sec' },
      { name: 'Side Crunches', task: '15 reps/side' },
      { name: 'Marching', task: '1 min' },
      { name: 'Toe Taps', task: '20 reps' },
      { name: 'Glute Bridge', task: '15 reps' },
      { name: 'Side Leg Lifts', task: '15 reps/side' },
      { name: 'Calf Stretch', task: '30 sec/side' },
      { name: 'Cat-Cow', task: '30 sec' },
      { name: 'Knee Tucks', task: '15 reps' },
      { name: 'Arm Circles', task: '1 min' },
    ],
    intermediate: [
      { name: 'Push-Ups', task: '15 reps' },
      { name: 'Burpees', task: '10 reps' },
      { name: 'Mountain Climbers', task: '40 reps' },
      { name: 'Lunges', task: '20 reps' },
      { name: 'Side Lunges', task: '15 reps' },
      { name: 'Russian Twists', task: '20 reps' },
      { name: 'Superman Hold', task: '30 sec' },
      { name: 'Plank Taps', task: '20 taps' },
      { name: 'Jumping Jacks', task: '1 min' },
      { name: 'Plank Reach', task: '10 reps/arm' },
      { name: 'Reverse Crunches', task: '15 reps' },
      { name: 'Bicycle Crunches', task: '20 reps' },
      { name: 'Side Plank Dips', task: '10 dips/side' },
      { name: 'Bear Crawl', task: '30 sec' },
      { name: 'Squat Raises', task: '15 reps' },
      { name: 'Spiderman Plank', task: '15 reps/side' },
      { name: 'Forward Lunges', task: '20 reps' },
    ],
    advanced: [
      { name: 'Jump Squats', task: '15 reps' },
      { name: 'Side Plank Lift', task: '10 reps/side' },
      { name: 'Single-Leg Deadlifts', task: '10 reps/leg' },
      { name: 'Tuck Jumps', task: '10 reps' },
      { name: 'Handstand Hold', task: '30 sec' },
      { name: 'Pistol Squats', task: '5 reps/leg' },
      { name: 'Burpee Push-Up', task: '10 reps' },
      { name: 'Clap Push-Ups', task: '10 reps' },
      { name: 'L-Sit', task: '20 sec' },
      { name: 'Archer Push-Ups', task: '8 reps' },
      { name: 'Side Plank Hips', task: '10 reps/side' },
      { name: 'Wide Push-Ups', task: '12 reps' },
      { name: 'Explosive Lunges', task: '20 reps' },
      { name: 'Dragon Flag', task: '5 reps' },
      { name: 'Planche Lean', task: '10 sec' },
      { name: 'V-Ups', task: '15 reps' },
      { name: 'Pike Push-Ups', task: '10 reps' },
      { name: 'Wall Walks', task: '5 reps' },
      { name: 'Superman Push-Up', task: '10 reps' },
    ],
  };

  function fetchExercises(level = 'beginner') {
    const count = 5;
    
    if (!allExercises[level]) {
      throw new Error(`Invalid level: ${level}`);
    }
  
    // Shuffle and pick random exercises
    const shuffled = allExercises[level].sort(() => Math.random() - 0.5);
    exercises.value = shuffled.slice(0, count).map(exercise => ({
      ...exercise,
      done: false, // Add "done" status for each exercise
    }));
    
    // Save chosen exercises and reset progress
    localStorage.setItem('chosenExercises', JSON.stringify(exercises.value));
    workoutState.value = false; // Reset workout
    currentExerciseIndex.value = 0; // Reset progress
    localStorage.setItem('currentExerciseIndex', currentExerciseIndex.value);
    localStorage.setItem('workoutState', JSON.stringify(workoutState.value));
  }


  function loadFromLocalStorage() {
    const savedExercises = localStorage.getItem('chosenExercises');
    const savedIndex = localStorage.getItem('currentExerciseIndex');
    const savedWorkoutState = localStorage.getItem('workoutState');

    if (savedExercises) {
      exercises.value = JSON.parse(savedExercises);
    }
    if (savedIndex) {
      currentExerciseIndex.value = parseInt(savedIndex, 10);
    }
    if (savedWorkoutState) {
      workoutState.value = JSON.parse(savedWorkoutState);
    }
  }

  function nextExercise(state: boolean) {
    if (state) {
      exercises.value[currentExerciseIndex.value].done = true;
    }
  
    if (currentExerciseIndex.value < exercises.value.length - 1) {
      currentExerciseIndex.value++;
    } else {
      workoutState.value = true;
    }
  
    localStorage.setItem('chosenExercises', JSON.stringify(exercises.value));
    localStorage.setItem('currentExerciseIndex', currentExerciseIndex.value);
    localStorage.setItem('workoutState', workoutState.value);
  }

  const currentExercise = computed(() => {
    return exercises.value[currentExerciseIndex.value] || {};
  });


  return {
    exercises,
    currentExercise,
    currentExerciseIndex,
    workoutState,
    fetchExercises,
    loadFromLocalStorage,
    nextExercise,
  }
});