function getparents(ele, parent) {
    let parents = ele
    while (parents) {
        if (parents.classList.contains(parent)) {
            break
        }
        parents = parents.parentNode
    }
    return parents
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        let parents = getparents(e.target, 'dialog')
        if (parents) parents.style.display = 'none'
    }
})

function center(el) {
    let fullWidth = window.innerWidth
    let fullHeight = window.innerHeight
    let rect = el.getBoundingClientRect()
    let left = fullWidth / 2 - rect.width / 2
    let top = fullHeight / 2 - rect.height / 2
    el.style.setProperty('--top', top + 'px')
    el.style.setProperty('--left', left + 'px')
}

center(document.querySelector('.dialog .content'))

window.addEventListener('mousedown', handleContentMove)
window.addEventListener('mousedown', handleContentResize)
function handleContentMove(e) {
    if (e.target.classList.contains('header')) {
        let content = getparents(e.target, 'content')
        let startX = e.clientX
        let startY = e.clientY
        let initialX = content.style.getPropertyValue('--left').slice(0, -2) * 1
        let initialY = content.style.getPropertyValue('--top').slice(0, -2) * 1
        let rect = content.getBoundingClientRect()

        let maxLeft = (window.innerWidth - rect.width)
        let maxTop = (window.innerHeight - rect.height)



        window.addEventListener('mousemove', handleDrop)
        window.addEventListener('mouseup', handleRemoveHandle)


        function handleDrop(e) {
            let moveX = e.clientX - startX
            let left = initialX * 1 + moveX
            let moveY = e.clientY - startY
            let top = initialY * 1 + moveY
            if (left > maxLeft) left = maxLeft
            if (top > maxTop) top = maxTop

            content.style.setProperty('--top', top + 'px')
            content.style.setProperty('--left', left + 'px')
        }


        function handleRemoveHandle() {
            window.removeEventListener('mousemove', handleDrop)
            window.removeEventListener('mouseup', handleRemoveHandle)
        }
    }
}

function handleContentResize(e) {
    if (e.target.classList.contains('resize')) {
        let content = getparents(e.target, 'content')
        let startX = e.clientX
        let startY = e.clientY

        let startWidth = getComputedStyle(content).width.slice(0, -2) * 1
        let startHeight = getComputedStyle(content).height.slice(0, -2) * 1

        let maxWidth = window.innerWidth - startX + startWidth
        let maxHeight = window.innerHeight - startY + startHeight
    
        window.addEventListener('mousemove', handleResize)
        window.addEventListener('mouseup', handleRemoveHandle)

        function handleResize(e) {
            let apartX = e.clientX - startX
            let apartY = e.clientY - startY
            let endWidth = startWidth + apartX
            let endHeight = startHeight + apartY
            if(endWidth > maxWidth) endWidth = maxWidth
            if(endHeight > maxHeight) endHeight = maxHeight
            content.style.setProperty("--width", endWidth + 'px');
            content.style.setProperty("--height", endHeight + 'px');
        }
        
        function handleRemoveHandle() {
            window.removeEventListener('mousemove', handleResize)
            window.removeEventListener('mouseup', handleRemoveHandle)
        }
    }
}
