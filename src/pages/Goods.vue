<template>
 <!-- Часть 1: Фильтр по наличию <PageTasks/>-->
       <div>
            <label>
                <input type="checkbox" 
                v-model="onlyInStock" 
                @change="applyFilters">
                Показывать только товары в наличии
            </label>
        </div>

        <div :class="$style.searchPanel">
            <input :class="$style.input" type="text" v-model="searchQuery" placeholder="введите название продукта"/>
          <button type="button" @click="applyFilters" :disabled="isSearchButtonDisabled">
              Найти
          </button>
          <button type="button" @click="resetSearch">
              Сбросить
          </button>
       </div>
         <!-- Часть 2: Сетка карточек -->
         <div v-if="loading">
          Загрузка...
        </div>
        <div v-else-if="error">
          Ошибка загрузки!
        </div>
        <div v-else-if="products.length > 0" :class="$style.grid">
          <div v-for="good in products" :key="good.id">
            <Card
              :product="good"
            />
          </div>
        </div>
        <div v-else>
          Нет данных.
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">←</button>
          Стр. {{ currentPage }} из {{ totalPages }}
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">→</button>
        </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useProducts } from '../composables/useProducts'; 
import Card from '../components/Card.vue';

const onlyInStock = ref(false);
const searchQuery = ref('');

const { 
  products, 
  loading, 
  error, 
  totalPages, 
  currentPage,
  fetchProducts,
} = useProducts();

const isSearchButtonDisabled = computed(() => {
  return searchQuery.value.trim().length === 0;
});

const applyFilters = () => {
  fetchProducts({
    searchQuery: searchQuery.value,
    inStock: onlyInStock.value,
    skip: 0,
  });
};

const changePage = (pageNumber: number) => {
  if (pageNumber < 1 || pageNumber > totalPages.value) return;
  
  fetchProducts({
    searchQuery: searchQuery.value,
    inStock: onlyInStock.value,
    skip: (pageNumber - 1) * 20,
  });
};

const resetSearch = () => {
  searchQuery.value = "";
  fetchProducts({
    searchQuery: searchQuery.value,
    inStock: onlyInStock.value,
    skip: 0,
  });
};

onMounted(() => {
  fetchProducts(); 
});

</script>

<style scoped module lang="scss">

.grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.searchPanel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 3px;
}

.input {
  flex: 1;
  min-width: 100px;
}
</style>
