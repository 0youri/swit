<template>
  <div class="flex flex-col justify-center flex-grow items-center relative">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex items-center space-x-2 text-light text-2xl">
      <span class="loader"></span>
      <span>Loading...</span>
    </div>

    <!-- Card Content -->
    <div
      v-if="!isLoading"
      class="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 text-dark transition-transform duration-500"
      :class="{ 'animate-new-card': newCardVisible }"
      :style="cardStyle"
      @mousedown="startSwipe"
      @mousemove="swipeMove"
      @mouseup="endSwipe"
      @mouseleave="endSwipe"
    >
      <div class="bg-primary mx-5 rounded-3xl space-y-10">
        <!-- Slot for Card Content -->
        <slot></slot>

        <!-- Footer Actions -->
        <div class="grid grid-cols-2 divide-x divide-light text-center text-3xl bg-secondary rounded-b-3xl">
          <button
            class="p-5 bg-accent hover:bg-opacity-80 rounded-bl-3xl"
            @click="swipeLeftAnimation"
          >
            {{ emojiLeftCard || '❔' }}
          </button>
          <button
            class="p-5 bg-accent hover:bg-opacity-80 rounded-br-3xl"
            @click="swipeRightAnimation"
          >
            {{ emojiRightCard || '❔' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, nextTick } from 'vue';

  const emit = defineEmits(['handleSwipeLeft', 'handleSwipeRight']);

  const props = defineProps({
    swipeLeftNewCard: { type: Boolean, default: false },
    swipeRightNewCard: { type: Boolean, default: false },
    emojiLeftCard: { type: String, default: null },
    emojiRightCard: { type: String, default: null },
  });

  const x = ref(0);
  const rotation = ref(0);
  const isDragging = ref(false);
  const isLoading = ref(false);
  const newCardVisible = ref(false);
  let startX = 0;
  let isAnimating = false;

  // Computed card style
  const cardStyle = computed(() => ({
    transform: `translateX(${x.value}px) rotate(${rotation.value}deg)`,
    transition: 'transform 0.5s ease',
  }));

  // Event handlers
  const startSwipe = (event) => {
    isDragging.value = true;
    startX = event.clientX;
  };

  const swipeMove = (event) => {
    if (!isDragging.value) return;
    x.value = event.clientX - startX;
    rotation.value = x.value / 20;
  };

  const endSwipe = () => {
    isDragging.value = false;

    if (x.value > 150) swipeRight();
    else if (x.value < -150) swipeLeft();
    else resetCard();
  };

  const swipeLeft = () => triggerSwipe(-window.innerWidth, -30, 'handleSwipeLeft', props.swipeLeftNewCard);
  const swipeRight = () => triggerSwipe(window.innerWidth, 30, 'handleSwipeRight', props.swipeRightNewCard);

  const swipeLeftAnimation = () => animateSwipe(-window.innerWidth, -30, swipeLeft);
  const swipeRightAnimation = () => animateSwipe(window.innerWidth, 30, swipeRight);

  const triggerSwipe = (endX, endRotation, event, isNewCard) => {
    if (isAnimating) return;
    isAnimating = true;
    if (isNewCard) isLoading.value = true;

    x.value = endX;
    rotation.value = endRotation;

    setTimeout(() => {
      emit(event);
      if (isNewCard) newCard();
      resetCard();
      isAnimating = false;
    }, 500);
  };

  const animateSwipe = (endX, endRotation, callback) => {
    x.value = endX;
    rotation.value = endRotation;
    setTimeout(callback, 250);
  };

  const resetCard = () => {
    x.value = 0;
    rotation.value = 0;
    newCardVisible.value = false;
  };

  const newCard = () => {
    nextTick(() => {
      newCardVisible.value = true;
    });
    isLoading.value = false;
};
</script>

<style scoped>
  .loader {
    width: 24px;
    height: 24px;
    border: 4px solid #ddd;
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .animate-new-card {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>