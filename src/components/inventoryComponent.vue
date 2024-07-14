<script setup lang="ts">
import {ref, onMounted} from 'vue';
import inventoryElement from './inventoryElement.vue'



const colorArray = [ 
          '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];



const inventory = ref(Array(25).fill(0))




 
const randomColor = () =>{
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}  



onMounted(()=>{
    inventory.value.splice(0, 4, 1,1,1,1)
})

</script>

<template>
    <div class="inventory">
        <div class="inventory__inner">
            <ul class="inventory__cells">
                <li class="inventory__cell" v-for="num, idx in 25" :key="num">
                    <span class="num">{{num}}</span>
                    <inventoryElement 
                    v-if="inventory[idx] === 1"
                    :background="randomColor()" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.inventory__cells{
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, minmax(50px, 150px));
    grid-template-rows: repeat(5, minmax(50px, 150px));
    border-radius: 10px;
    border: 1px solid var(--gray);

}


.inventory__cell{
    list-style: none;
    position: relative;
    
 
    border: 1px solid var(--gray);
    
}

.num{
    position: absolute;
    top: 5px;
    left: 5px;
    color: var(--color);
}

.invetory-element{
    width: 100%;
    height: 100%;
}

</style>