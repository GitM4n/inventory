<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InventoryContainer from './components/InventoryContainer.vue';


const isMobie = ref(false)

onMounted(()=>{
  if(window.innerWidth < 1200){
    isMobie.value = true
  }
})
</script>

<template>

  <div class="container">
    <div class="not-working" v-if="isMobie">
      <h1>Не работает на мобильных устройствах</h1>
    </div>
    <InventoryContainer />
  </div>

</template>

<style scoped>

.not-working{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  color: var(--color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dark);
  z-index: 10000;
}

</style>
