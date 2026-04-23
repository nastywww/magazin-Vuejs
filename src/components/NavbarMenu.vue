<template>
  <menu>
    <div class="navigation-menu">
      <button @click="placementPressed = PlacementTypes.Tasks">Задания</button>
      <button @click="placementPressed = PlacementTypes.Groceries">Товары</button>
      <button @click="placementPressed = PlacementTypes.Bag">Корзина</button>
      <button @click="placementPressed = PlacementTypes.Feedback">Оставить отзыв</button>
    </div>
    
  

    <div v-if="placementPressed === PlacementTypes.Tasks">
      <Task />
    </div>
    
    <div v-else-if="placementPressed === PlacementTypes.Groceries">
      <Goods />
    </div>
    
    <div v-else-if="placementPressed === PlacementTypes.Bag">
      <Cart />
    </div>
    
    <div v-else-if="placementPressed === PlacementTypes.Feedback">
      <Feedback />
    </div>
  </menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Task from '../pages/Task.vue'; 
import Feedback from '../pages/Feedback.vue';
import Goods from '../pages/Goods.vue';
import Cart from '../pages/Cart.vue';

enum PlacementTypes {
  Tasks = 'tasks',
  Groceries = 'groceries',
  Bag = 'bag',
  Feedback = 'feedback'
}

const placementPressed = ref<PlacementTypes>(PlacementTypes.Tasks);
</script>

<style scoped>
.navigation-menu {
  display: flex;
  gap: 10px;
  padding: 20px;
}

button {
  cursor: pointer;
  padding: 8px 16px;
}
</style>