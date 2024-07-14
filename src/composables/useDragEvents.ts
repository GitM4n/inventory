import{ref} from 'vue'



export const useDragEvents = () =>{
    const isDrag = ref(false)


    const element = ref<HTMLElement>()

    const xPos = ref(element.value?.offsetTop)
    const yPos = ref(element.value?.offsetLeft)

    const onDragOver = (e:DragEvent) =>{
        e.preventDefault()
    }

    const onDragLeave = (e:DragEvent) =>{
        e.preventDefault()
    }

    const onDragEnd = (e:DragEvent) =>{
        e.preventDefault()
        isDrag.value = false
    }

    const onDrop = () =>{
        isDrag.value = false
    }

    const onDragStart = (e:DragEvent) =>{
        e.dataTransfer?.setData('text', (e.target as Element).id)
        console.log(xPos.value,yPos.value, element.value)
    }

    const onDrag = (e:DragEvent) =>{
        if(e.x === 0 && e.y === 0) return false
        xPos.value = e.x
        yPos.value = e.y

       
    }


    return{
        isDrag,
        element,
        xPos,
        yPos,
        onDragOver,
        onDragLeave,
        onDragEnd,
        onDrop,
        onDrag,
        onDragStart
    }
}


