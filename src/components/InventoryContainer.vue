<script setup lang="ts">
    import inventoryComponent from './inventoryComponent.vue';
</script>

<template>
    <div class="inventory-container">
        <div class="inventory-container__inner">
            <div class="left-card">

            </div>
            <inventoryComponent class="inventory-component"/>
            <div class="bottom-block">

            </div>
        </div>
    </div>
</template>

<style scoped>

.inventory-container{
    height: 800px;
}

.inventory-container__inner{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.inventory-component{
    flex: 0 0 70%;
   
}

.left-card,
.bottom-block{
    outline: 2px solid red;
}

.bottom-block{
    width: 100%;
    height: 100px;
}

</style>