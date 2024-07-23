<script setup lang="ts">
import Button from './UI/Button.vue';
const props = defineProps<{
    id:number
    img?:string
    description?:string
    isAddElement?:boolean
}>()
</script>

<template>
    <div class="element-details">
        <div class="element-details__inner element">
            <div class="element__img">
                <slot name="img"></slot>
            </div>
            
            <div class="element__desctiption">
                {{ props.description }}
            </div>
           <div class="element__actions">
            <div class="element__quantity">
                <input type="number" name="number" placeholder="Введите количество">
                <div class="element__quntity_btns">
                    <Button> Отмена</Button>
                    <Button class="danger">Подтвердить</Button>
                </div>
            </div>
           </div>
        </div>
    </div>
</template>

<style scoped>

</style>