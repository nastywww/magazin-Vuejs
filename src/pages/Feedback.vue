<template>
  <!-- Часть 3: Дополнительное задание (форма) -->
  <div class="">
    <h2>Оставьте отзыв</h2>
    <div class="review-form">
      <div class="form-group">
        <label
          >Email: <input type="email" placeholder="example@mail.com"/>
        </label>
        <span class="error-hint">Введите корректный email</span>
      </div>
      <div class="form-group">
        <label>Текст отзыва: <textarea rows="3"></textarea></label>
        <span class="error-hint">Минимум 10 символов</span>
      </div>
      <button type="submit">Отправить</button>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped></style>
