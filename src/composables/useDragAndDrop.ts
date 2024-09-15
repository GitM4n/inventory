// useDragAndDrop.ts
import { ref, reactive, computed, watch, onMounted } from 'vue';


export interface Item {
    id:number,
    quantity:number,
    img?:string,
    color?:string
}


export interface Cell {
    item: Item | null;
}





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


const randomColor = () =>{
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}  



const ids = computed(()=>{
    return  cells.filter(cell => cell.item !== null).map(cell => cell.item?.id || 0)  
}) 
const nextIdx = computed(()=> ids.value.length > 0 ? Math.max(...ids.value) + 1 : 0)


const cells = reactive<Cell[]>(Array.from({ length: 25 }, () => ({ item: null })));


watch(cells, () => {
    localStorage.setItem('cells', JSON.stringify(cells));
})


onMounted(()=>{
  
})

   

export const useDragAndDrop = () => {

    const startPos = ref({ x: 0, y: 0 });
    const dragElem = ref<HTMLElement | null>(null);
    const dropElem = ref<HTMLElement | null>(null);
    const currentDropElem = ref<HTMLElement | null>(null);


    const isOccupiedCell = computed(()=>{
        if(!dropElem.value || !dragElem.value) return false
        return dropElem.value.firstElementChild?.classList.contains('drag-element') && dropElem.value.getAttribute('data-index') !== dragElem.value.getAttribute('data-index')
    })


    const updateElemPos = (clientX: number, clientY: number) => {
        if (!dragElem.value) return

        dragElem.value.style.left = `${clientX - startPos.value.x}px`;
        dragElem.value.style.top = `${clientY - startPos.value.y}px`;

        if(clientX !== startPos.value.x && clientY !== startPos.value.y) {
            dragElem.value.style.left = `${clientX - startPos.value.x}px`;
            dragElem.value.style.top = `${clientY - startPos.value.y}px`;
          
        }           
    };


    const setDropElem = (clientX: number, clientY: number) => {
        if(!dragElem.value) return

        dragElem.value.hidden = true
        let isElem = document.elementFromPoint(clientX, clientY)
        dragElem.value.hidden = false

        if(isElem) {
            dropElem.value = isElem.closest('.drop-zone')

           if(!dropElem.value) return
            
           if( dropElem.value !== currentDropElem.value) {  

                if(currentDropElem.value){
                    currentDropElem.value.style.background = ''
                }

                currentDropElem.value = dropElem.value

                if(isOccupiedCell.value) {
                    currentDropElem.value.style.background = 'red'
                }else{
                    currentDropElem.value.style.background = 'green'
                }
           }
        }
    }


    const dragStart = (e: MouseEvent) => {
        dragElem.value = (e.target as HTMLElement).closest('.drag-element');
   
        if (!dragElem.value) return

        startPos.value.x = e.clientX;
        startPos.value.y = e.clientY;

        dragElem.value.classList.add('isDragging')

        updateElemPos(e.clientX, e.clientY);

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);      
        
    };

    const drag = (e: MouseEvent) => {
        updateElemPos(e.clientX, e.clientY);
        setDropElem(e.clientX, e.clientY) 
    };

    const dragEnd = () => {
        changeCell()
        reset();    
    };


    function reset() {
        if (!dragElem.value) return

        dragElem.value.classList.remove('isDragging')
        
        dragElem.value = null;

        startPos.value.x = 0;
        startPos.value.y = 0;

        if(currentDropElem.value) {
            currentDropElem.value.style.background = ''
        }

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }


    const addRandomCell = (count: number) => {
        console.log('addRandomCell');
        const uniqueCells = new Set<number>();
        while (uniqueCells.size < count) {
            const randomIdx = Math.floor(Math.random() * cells.length);
            if (!uniqueCells.has(randomIdx)) {
                cells[randomIdx].item = { id: randomIdx, quantity: 1, color: randomColor() };
                uniqueCells.add(randomIdx);
            }
        }
    };


    const addItem = (item:Item) => {
        const freeCellIdx = cells.findIndex(cell => !cell.item)
        
       
        if(ids.value.length === 0){
            cells[freeCellIdx].item = item;
            return
        }
     

        if (freeCellIdx !== -1 && ids.value.length > 0) {
            cells[freeCellIdx].item = item;
        };
        
    }


    const deleteItem = (id: number) => {
        if(!cells[id].item) return

        cells[id].item = null
   
    }


    const changeCell = () => {
        if(dragElem.value && dropElem.value) {

            if(isOccupiedCell.value) return
           
            const dragElemIndex = Number(dragElem.value.getAttribute('data-index'))
            const dropElemIndex = Number(dropElem.value.getAttribute('data-index'))

            if(dragElemIndex === dropElemIndex) return
           
            cells[dropElemIndex].item = cells[dragElemIndex].item

            cells[dragElemIndex].item = null

            
        }

        

        
    }


    const clearCells = () => {
        cells.forEach(cell => cell.item = null)
    }



    return {
        clearCells,
        cells,
        dragStart,
        addRandomCell,
        drag,
        dragEnd,
        addItem,
        deleteItem,
        randomColor,
        nextIdx

    }
}
