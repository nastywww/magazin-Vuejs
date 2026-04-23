<script setup lang="ts">
import NavbarMenu from "./components/NavbarMenu.vue";
import { ref, provide } from 'vue';
import { Product } from './models/models';

const cartItems = ref<Product[]>([]);
const addToCart = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (!existingItem) {
    cartItems.value.push(product);
  }
};

const removeFromCart = (productId: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
};

provide('cartItems', cartItems);
provide('addToCart', addToCart);
provide('removeFromCart', removeFromCart);

</script>

<template>
   <div class="container">
        <h1>Магазин электроники</h1>
        <NavbarMenu/>
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
