<script setup lang="ts">
import { ref } from "vue";
import Button from "./UI/Button.vue";
import { useDragAndDrop } from "../composables/useDragAndDrop";
import type { Item } from "../composables/useDragAndDrop";

const { nextIdx, randomColor, addItem } = useDragAndDrop();

const color = randomColor();

const elementAdd = ref<Item>({
  id: nextIdx.value,
  quantity: 1,
  color: color,
});

const onlyNumbers = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/[^0-9]/g, "").slice(0, 5);
};

const emit = defineEmits<{
  (e: "close-add"): void;
  (e: "item-added"): void;
}>();

const addItemHandler = (item: Item) => {
  addItem(item);
  emit("item-added");
  emit("close-add");
};

const isFocus = ref(false);
</script>

<template>
  <div class="element-add">
    <div class="element-add element">
      <div class="element__close" @click="emit('close-add')"></div>
      <div class="element__img">
        <div class="circle" :style="{ background: color }">
          {{ nextIdx + 1 }}
        </div>
      </div>
      <div class="element__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio sapiente
        eaque, amet dolores adipisci inventore assumenda vero reiciendis dolore doloremque
        repellendus omnis, earum exercitationem cumque ab id, fugiat animi impedit.
      </div>
      <div class="element__quantity">
        <label :for="nextIdx.toString()">Количество </label>
        <input
          :id="nextIdx.toString()"
          @focus="isFocus = true"
          @blur="isFocus = false"
          :style="{ borderColor: isFocus ? color : 'var(--color)' }"
          @input="onlyNumbers"
          placeholder="Введите количество"
          type="text"
          v-model="elementAdd.quantity"
        />
      </div>
      <div class="element__actions">
        <Button @click="emit('close-add')">Отмена</Button>
        <Button @click="addItemHandler(elementAdd)" class="danger">Подтвердить</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-add {
  display: flex;
  max-width: 500px;
  font-size: 1.2rem;
  border-left: 1px solid var(--color);
  backdrop-filter: blur(10px);
  --webkit-backdrop-filter: blur(10px);
  background: var(--dark);
  z-index: 1;
  color: var(--color);
}

.element-add::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  pointer-events: none;
  z-index: -1;
}

.element {
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.element__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.element__close::before,
.element__close::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--color);
  transform: translate(-50%, -50%) rotate(45deg);
}
.element__close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: var(--dark);
}

.element__description {
  text-align: center;
  flex-grow: 1;
}

.element__actions {
  display: flex;
  gap: 10px;
}

input {
  outline: none;
  border: 1px solid var(--color);
  border-radius: 5px;
  background: var(--background);
  padding: 5px;
  width: 100%;
  color: var(--color);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
