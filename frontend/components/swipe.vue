<template>
  <div class="flex flex-col justify-center flex-grow items-center relative">
    <!-- Loading Spinner -->
    <div v-if="isLoading">
      <div class="flex items-center space-x-2 text-light text-2xl">
        <span class="loader"></span>
        <span>Loading...</span>
      </div>
    </div>

    <!-- Card Content -->
    <div
      v-if="!isLoading"
      class="w-full text-dark transition-transform duration-500"
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
        <div class="grid grid-cols-2 divide-x divide-light divide-full rounded-b-3xl text-center text-4xl bg-secondary">
          <button class="p-5 bg-accent hover:bg-opacity-80 rounded-bl-3xl" @click="swipeLeftAnimation">
            🔄
          </button>
          <button class="p-5 bg-accent hover:bg-opacity-80 rounded-br-3xl" @click="swipeRightAnimation">
            ▶️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

const emit = defineEmits(['swipeLeft', 'swipeRight']);

const props = defineProps({
  swipeLeftNewCard: {
    type: Boolean,
  },
  swipeRightNewCard : {
    type: Boolean,
  },
})

const x = ref(0);
const rotation = ref(0);
const isDragging = ref(false);
const isLoading = ref(false);
const newCardVisible = ref(false);
let startX = 0;

const cardStyle = computed(() => ({
  transform: `translateX(${x.value}px) rotate(${rotation.value}deg)`,
  transition: 'transform 0.5s ease',
}));

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

  if (x.value > 150) {
    swipeRight();
  } else if (x.value < -150) {
    swipeLeft();
  } else {
    resetCard();
  }
};

const swipeLeft = () => {
  if ( props.swipeLeftNewCard ) isLoading.value = true;
  x.value = -window.innerWidth;
  rotation.value = -30;

  setTimeout(() => {
    emit('swipeLeft');
    if ( props.swipeLeftNewCard ) newCard() 
    resetCard();
  }, 500);
};

const swipeRight = () => {
  if ( props.swipeRightNewCard ) isLoading.value = true;
  x.value = window.innerWidth;
  rotation.value = 30;
  setTimeout(() => {
    emit('swipeRight');
    if ( props.swipeRightNewCard ) newCard() 
    resetCard();
  }, 500);
};

const swipeLeftAnimation = () => {
  x.value = -window.innerWidth;
  rotation.value = -30;
  setTimeout(swipeLeft, 250);
};

const swipeRightAnimation = () => {
  x.value = window.innerWidth;
  rotation.value = 30;
  setTimeout(swipeRight, 200);
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
}
</script>

<style scoped>
/* Add your styles as needed */
.loader {
  width: 24px;
  height: 24px;
  border: 4px solid #ddd;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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