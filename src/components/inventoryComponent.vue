<script setup lang="ts">
import InventoryElement from './inventoryElement.vue'
import { useDragAndDrop } from '../composables/useDragAndDrop';
import Button from './UI/Button.vue';


const {cells, addItem, deleteItem} = useDragAndDrop()




</script>

<template>
    <div class="inventory">
        <div class="inventory__inner">
            <ul class="inventory__cells">
                <li class="inventory__cell drop-zone" :data-index="idx" v-for="cell, idx in cells" :key="idx">
                    <InventoryElement  v-if="cell.item" :data-index="idx">
                        <div class="circle" 
                        :style="{backgroundColor:cell.item.color}"
                        >
                            <span>{{cell.item.id + 1}}</span>
                        
                        </div>
                        <span class="quantity" v-if="cell.item.quantity>1">{{cell.item.quantity}}</span>
                    </InventoryElement>
                </li>
            </ul>
            
            <Button class="add-item" @click="addItem({quantity:3})">Add item</Button>
            
        </div>
    </div>
</template>

<style  scoped>

.inventory__cells {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 150px);
    border-radius: 10px;
    border: 1px solid var(--gray);
    position: relative;
}

.inventory__cells::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    border: 1px solid var(--gray);
    pointer-events: none;
    z-index: 1;
}

.inventory__cell {
    list-style: none;
    position: relative;
    border: 1px solid var(--gray);
    box-sizing: border-box;
   
}

.num{
    position: absolute;
    top: 5px;
    left: 5px;
    color: var(--color);
}

.inventory-element{
    width: 100%;
    height: 100%;
}

.inventory-element:hover{
    background-color: var(--ligth-dark);
}


.circle{
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}

.circle span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
}

.isDragging .quantity{
    display: none;
}

.quantity{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 5px;
    color: var(--color);
    background:var(--background);
    font-size: 1rem;
    border-left: 1px solid var(--gray);
    border-top: 1px solid var(--gray);
    border-top-left-radius: 5px;
}

</style>