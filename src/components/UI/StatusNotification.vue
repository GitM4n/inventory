

<script setup lang="ts">
interface Props {
    text: string
    status:'done' | 'failed'
    
}

const props = defineProps<Props>()

</script>

<template>
    <div class="status-notification" :style="{backgroundColor:props.status === 'done' ? 'green' : 'red'}">
        <span class="status-notification__text">{{props.text}}</span>
    </div>
</template>

<style scoped>

.status-notification{
 
    padding: 5px 10px;
    min-width: 200px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.status-notification__text{
    color: var(--color);
    font-size: 1.2rem;
}

</style>