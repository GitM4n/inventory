<script setup lang="ts">
import Button from './UI/Button.vue';
import type { Item } from '../composables/useDragAndDrop';
import { useDragAndDrop } from '../composables/useDragAndDrop';

const {deleteItem} = useDragAndDrop()


const props = defineProps<Item>()

const emit = defineEmits<{
    (e:'close'):void
    (e:'item-deleted'):void
}>()


const deleteItemHandler = (id:number)=>{
    deleteItem(id)
    emit('item-deleted')
    emit('close')
}

</script>

<template>
    <div class="element-details">
        <div class="element-details__inner element">
            <div class="element__close" @click="emit('close')"></div>
            <div class="element__img" >
              <div class="circle" :style="{background:props.color}">
                {{ props.id + 1 }}
              </div>
            </div>
            <div class="element__description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio sapiente eaque, amet dolores adipisci inventore assumenda vero reiciendis dolore doloremque repellendus omnis, earum exercitationem cumque ab id, fugiat animi impedit.
            </div>
            <div class="element__quantity">
                <span>Количество: {{ props.quantity }}</span>
            </div>
            <div class="element__delete">
                <Button class="danger" @click="deleteItemHandler(props.id)">Удалить</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.element-details{
    display: flex;
    max-width: 500px;
    font-size: 1.2rem;
    border-left: 1px solid var(--color);
    backdrop-filter:
     blur(10px);
    --webkit-backdrop-filter: blur(10px);
    background: var(--dark);
    z-index: 1;
    color: var(--color);
  
}

.element-details::after{
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

.element{
    position: relative;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;

}


.element__close{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.element__close::before,
.element__close::after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 2px;
    background: var(--color);
    transform: translate(-50%, -50%) rotate(45deg);
}
.element__close::after{
    transform: translate(-50%, -50%) rotate(-45deg);
}

.element__img{
    flex-basis: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
   
    
}

.element__quantity{
    text-align: center;
    color: var(--color);
}

.circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--dark);
}


.element__description{
    flex-grow: 1;
    text-align: center;
 
}
</style>