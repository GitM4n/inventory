

<script setup lang="ts">
import {useDragEvents} from '../composables/useDragEvents';

const props = defineProps<{
    background:string
}>()

const {element, isDrag, onDrag, onDragStart, onDrop} = useDragEvents();
</script>

<template>
    <div class="invetory-element"
        draggable="true"
        @drag="onDrag"
        @dragstart="onDragStart"
        ref="element"
        >
        <div class="circle" 
        :style="{backgroundColor:props.background}"
     ></div>
    </div>
</template>

<style scoped>

.circle{
    position: relative;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}

</style>