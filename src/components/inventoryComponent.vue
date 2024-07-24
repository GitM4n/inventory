<script setup lang="ts">
import InventoryElement from './inventoryElement.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import { useDragAndDrop } from '../composables/useDragAndDrop';
import type { Item } from '../composables/useDragAndDrop';
import Button from './UI/Button.vue';
import ElementDetails from './ElementDetails.vue';
import ElementAdd from './ElementAdd.vue';
import StatusNotification from './UI/StatusNotification.vue';

const {cells, clearCells} = useDragAndDrop()


const elementDetails = ref<Item>()

const isShowAddComponent = ref(false)

const statusNotificationsArr = ref<{
    text:string
    status:'done' | 'failed'
}[]>([])



const statusNotfAnimate = (text:string, status:'done' | 'failed') => {
    statusNotificationsArr.value.push({
        text,
        status
    })
    setTimeout(() => {
        statusNotificationsArr.value.shift()
    }, 3000)
}


const showDetails = (item:Item) => {
    elementDetails.value = item
    isShowAddComponent.value = false

}

const hideDetails = () => {
    elementDetails.value = undefined
}

const showAddComponent = () => {
    isShowAddComponent.value = true
    hideDetails()
}

const hideAddComponent = () => {
    isShowAddComponent.value = false
}


onMounted(() => document.addEventListener('click', hideDetails ))
onUnmounted(() => document.removeEventListener('click', hideDetails ))

</script>

<template>
    <div class="inventory">
        <div class="inventory__inner">
            <ul class="inventory__cells">
                <li class="inventory__cell drop-zone" :data-index="idx" v-for="cell, idx in cells" :key="idx" >
                    <InventoryElement  v-if="cell.item" :data-index="idx" @click="showDetails(cell.item)" @click.stop>
                        <div class="circle" 
                        :style="{backgroundColor:cell.item.color}"
                        >
                            <span>{{cell.item.id + 1}}</span>
                        
                        </div>
                        <span class="quantity" v-if="cell.item.quantity>1">{{cell.item.quantity}}</span>
                    </InventoryElement>
                </li>
            </ul>
            <transition-group name="fade">
                <ElementDetails 
                v-if="elementDetails"
                class="inventory__element-details"
                :id="elementDetails.id" 
                :quantity="elementDetails.quantity"
                :color="elementDetails.color"
                @close="hideDetails"
                @item-deleted="statusNotfAnimate('Элемент удален', 'failed')"
                @click.stop />
                <ElementAdd v-if="isShowAddComponent"
                             class="inventory__element-add"
                             @close-add="hideAddComponent"
                             @item-added="statusNotfAnimate('Элемент добавлен', 'done')"/>
                
            </transition-group> 
        </div>
        <Button class="add-item" @click="showAddComponent">Добавить элемент</Button>
        <Button class="danger" @click="clearCells(); statusNotfAnimate('Ячейки очищены', 'failed')">Очистить ячейки</Button>
        <div class="status-notifications">
            <transition-group name="fade-status">
                <template class="status" v-for="notification, idx in statusNotificationsArr" :key="idx">
                  <StatusNotification :text="notification.text" :status="notification.status" />
                </template>
            </transition-group>
        </div>
        
    </div>

</template>

<style  scoped>
.inventory{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.inventory__inner{
    width: 100%;
    position: relative;
    overflow: hidden;
}

.inventory__cells {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 150px);
    border-radius: 10px;
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
    background-color: var(--light-dark);
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



.inventory__element-details,
.inventory__element-add{
    position: absolute;
    top: 1px;
    right: 1px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: calc(100% - 2px);

}



.fade-enter-active,
.fade-leave-active {
  transition:right 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  right: -100%;

}


.fade-status-enter-active,
.fade-status-leave-active {
  transition:opacity 0.5s linear;
}

.fade-status-enter-from,
.fade-status-leave-to {
  opacity: 0;
}

.status-notifications{
    position: fixed;
    top: 20px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1;
    pointer-events: none;
 
}


</style>