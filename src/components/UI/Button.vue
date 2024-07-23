<script setup lang="ts">

</script>

<template>
    <button class="button primary">
        <slot></slot>
    </button>
</template>

<style scoped>
.button{
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1rem;
}

.primary{
    background-color: var(--light);
    color: var(--dark); 
}

.primary:hover{
    box-shadow:0 0 5px 0px var(--light);
}


.danger{
    background-color: var(--red);
    color: var(--light);
}

.danger:hover{
    box-shadow:0 0 5px 0px var(--red);
}






</style>