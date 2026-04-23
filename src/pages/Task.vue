<template>

    <div :class="$style.tasks">
      <div>
        ЗАДАНИЯ:
      </div>
      <div :class="$style.tasks__task">
        Сделать tabs (страницы с контентом): "Задания", "Товары", "Корзина", "Оставить отзыв"
        <br>
        Сами триггеры табов (кнопки) использовать из компонента NavbarMenu.vue
      </div>
      <div :class="$style.tasks__task">
        Стилизовать layout на свое усмотретье
      </div>
      <div :class="$style.tasks__task">
        Товары должны получаться по запросу от api в формате json из источника https://dummyjson.com/products
        <br>
        Поддерживает пагинацию: /products?limit=10&skip=10
        <br>
        Поиск: /products/search?q=phone
        <br>
        Категории: /products/categories
      </div>
      <div :class="$style.tasks__task">
        Сделать ProductCard сделать на optionalApi (Vue2 style)
        <br>
        Карточка Товары которые не в наличии
      </div>
      <div :class="$style.tasks__task">
        CSS должны быть модульными (желательно)
      </div>
      <div :class="$style.tasks__task">
        Создать компонент корзины на  functionalApi (Vue3 style) и складывать в нее купленные товары
      </div>
      <div :class="$style.tasks__task">
        Реализовать фильтрацию и/или поиск располагающиеся над товарами: 
        <br>
        "Показывать только товары в наличии"
        <br>
        "Поиск товара по названию"
      </div>
    </div>
    </template>
<script setup lang="ts">

</script>

<style module lang="scss">
.tasks {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  backdrop-filter: blur(6px);
  padding: 2ch;
}
.tasks__task {
  &:before {
    content: '👉'
  }
}
</style>
