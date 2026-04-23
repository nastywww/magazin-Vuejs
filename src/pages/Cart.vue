<template>
 <div v-if="cartItems.length > 0" class="products-grid">
             <div class="product-card" v-for="good in cartItems" :key="good.id">
               <Card
                 :product="good"
               />
             </div>
           </div>
           <div v-else>
             Корзина пуста.
           </div>          
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import { Product } from '../models/models';
import Card from '../components/Card.vue';

const cartItems = inject<Ref<Product[]>>('cartItems', ref([]));

</script>

<style scoped></style>
