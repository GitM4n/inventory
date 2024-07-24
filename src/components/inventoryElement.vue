

<script setup lang="ts">

import { useDragAndDrop } from '../composables/useDragAndDrop';
import {ref, onUnmounted} from 'vue'

const dragTimeout = ref<number | null>(null);

const startDrag = (event: MouseEvent) => {
    dragTimeout.value = window.setTimeout(() => {
        dragStart(event);
    }, 200);
};

const endDrag = () => {
    clearDragTimeout();
    dragEnd();
};


const clearDragTimeout = () => {
    if (dragTimeout.value !== null) {
        clearTimeout(dragTimeout.value);
        dragTimeout.value = null;
    }
}


const {dragStart, dragEnd} = useDragAndDrop()


onUnmounted(() => {
    clearDragTimeout()
});


</script>

<template>
    <div class="inventory-element drag-element"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @dragstart.prevent
        >
        <slot></slot>
    </div>
</template>

<style scoped>

.drag-element{
    cursor: pointer;
    user-select: none;
}

.isDragging{
    opacity: 0.8;
    position: absolute;
    background: var(--background);
    border: 2px solid var(--color);
    border-radius: 10px;
    z-index: 1000;
    cursor: move;
 
}

</style>