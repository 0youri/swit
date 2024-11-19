import { defineStore } from 'pinia';

export const useExerciseStore = defineStore('exerciseStore', () => {
  
  const exercises = ref<{ name: string; task: string; done: boolean }[]>([]);
  const currentExerciseIndex = ref(0); 
  const workoutState = ref(false)

  const allExercises: Record<string, { name: string; task: string }[]> = {
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

  // Internal helper function: shuffle and pick random exercises
  const getRandomExercises = (
    level: string,
    count: number
  ): { name: string; task: string; done: boolean }[] => {
    const levelExercises = allExercises[level] || [];
    return levelExercises
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((exercise) => ({ ...exercise, done: false }));
  };

  // Internal helper function: save state to localStorage
  const saveStateToLocalStorage = () => {
    localStorage.setItem('chosenExercises', JSON.stringify(exercises.value));
    localStorage.setItem('currentExerciseIndex', currentExerciseIndex.value.toString());
    localStorage.setItem('workoutState', JSON.stringify(workoutState.value));
  };

  // Public store functions

  const fetchExercises = (level: string = 'beginner', count: number = 5) => {
    if (!allExercises[level]) throw new Error(`Invalid level: ${level}`);
    exercises.value = getRandomExercises(level, count);
    currentExerciseIndex.value = 0;
    workoutState.value = false;
    saveStateToLocalStorage();
  };

  const loadFromLocalStorage = () => {
    const savedExercises = localStorage.getItem('chosenExercises');
    const savedIndex = localStorage.getItem('currentExerciseIndex');
    const savedWorkoutState = localStorage.getItem('workoutState');

    if (savedExercises) exercises.value = JSON.parse(savedExercises);
    if (savedIndex) currentExerciseIndex.value = parseInt(savedIndex, 10);
    if (savedWorkoutState) workoutState.value = JSON.parse(savedWorkoutState);
  };

  const nextExercise = (markDone: boolean = false) => {
    if (markDone && exercises.value[currentExerciseIndex.value]) {
      exercises.value[currentExerciseIndex.value].done = true;
    }

    if (currentExerciseIndex.value < exercises.value.length - 1) {
      currentExerciseIndex.value++;
    } else {
      workoutState.value = true; // Mark workout as complete
    }

    saveStateToLocalStorage();
  };

  const currentExercise = computed(
    () => exercises.value[currentExerciseIndex.value] || {}
  );

  return {
    // State
    exercises,
    currentExercise,
    currentExerciseIndex,
    workoutState,
    // Public functions
    fetchExercises,
    loadFromLocalStorage,
    nextExercise,
  };
});