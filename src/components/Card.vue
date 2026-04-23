<template>
<article :class="$style.card">
  <div v-if="product.discountPercentage > 0" :class="$style.badge">
          -{{ product.discountPercentage }}%
        </div>

    <div :class="$style.content">
      
      <div :class="$style.contentTop">
        <h3 :class="$style.title">{{ product.title }}</h3>
      <p :class="$style.description">{{ product.description.substring(0, 500) }}</p>
      </div>
      <div :class="$style.space"></div>
      <div :class="$style.priceBox">
        <span :class="$style.price">{{ product.price }} ₽</span>

          <div :class="[$style.status, product.stock > 0 ? $style.inStock : $style.outOfStock]">
            {{ product.stock > 0 ? 'В наличии' : 'Нет в наличии' }}
          </div>

          
      </div> 

      <div v-if="removeFromCart && addToCart">
          <button v-if="isInCart" :class="$style.btnRemove" type="button" @click="() => removeFromCart!(product.id)">
          Удалить из корзины
          </button>
          <button v-else-if="inStock" :class="$style.btnBuy" type="button" @click="() => addToCart!(product)">
            Купить
          </button>
          <button v-else :class="$style.btnNotify" type="button" @click="">
            Сообщить о поступлении
          </button>
        </div>

</div>
  </article>

</template>
<script setup lang="ts">
  import { inject, computed,  Ref, ref } from 'vue';
  import { Product } from '../models/models';

  const addToCart = inject<(product: Product) => void>('addToCart');
  const removeFromCart = inject<(id: number) => void>('removeFromCart');
  const cartItems = inject<Ref<Product[]>>('cartItems', ref([]));
  
  const props = defineProps<{
      product: Product
    }>();

  const { product } = props

  const inStock = computed(() => product.stock > 0)
  const isInCart = computed(() => cartItems.value.map(i => i.id).includes(product.id))

</script>
  
<style scoped module lang="scss">
$primary-hover: #110f3d;
$primary-color: #4338ca;
$success-color: #10b981;
$danger-color: #ef4444;
$text-main: #1f2937;
$text-secondary: #6b7280;
$bg-card: #ffffff;
$border-radius: 5px;
$transition: all 0.3s ease;

.card {
  display: flex;
  flex-direction: column;
  background: $bg-card;
  border: 1px solid #e5e7eb;
  border-radius: $border-radius;
  position: relative;
  margin: 5px;
  width: 100%;
  max-width: 300px;
  height: 350px;

  &:hover {
    border: 3px solid $primary-hover;
    border-radius: 15px;
    background: #f9e2b9;
  }
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: $danger-color;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
}

.content {
  padding: 15px;
  display: flex;
  flex-direction: column; 
}

.space {
  flex: 1;
}

.title {
  font-weight: 600;
  color: $text-main;
  margin-top: 15px;
}

.description {
  padding-bottom: 10px;
  color: $text-secondary;
}

.priceBox {
  display: flex;
  gap: 5px;
  margin: 5px;
  justify-content: center;
  margin-top: auto;
}

.contentTop {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 250px;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-main;
}

.status {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: $border-radius;
  text-transform: uppercase;
}

.inStock {
  background-color: #d1fae5;
  color: #065f46;
}

.outOfStock {
  background-color: #fee2e2;
  color: #991b1b;
}

.btnBuy {
  background-color: $primary-color;
  color: white;
}

.btnRemove {
  background-color: $danger-color;
  color: white;
}

.btnNotify {
  background-color: #f3f4f6;
  color: $text-secondary;
}
</style>
  