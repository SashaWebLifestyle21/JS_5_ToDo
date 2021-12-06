const data = {
    todo: [],
    inProgress: [],
    done: []
}

const drawList = (dataType) => {
    const todoSection = document.querySelector('#todo')

    todoSection.innerHTML = ''

    dataType.forEach(item => {
        todoSection.innerHTML += `
        <div id="card" class="card">
            <span>Title: </span>
            <span class="title">${item.title}</span>
            <br />
            <span>Description: </span>
            <span class="description">${item.description}</span>
            <br />
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
            <button class="nextButton">Next</button>
        </div>
        `
    })
}

const deleteCard = (card) => {
    const title = card.querySelector('.title').textContent
    const description = card.querySelector('.description').textContent
    data.todo.forEach((item, index) => {
        if (item.title === title && item.description === description) {
            data.todo.splice(index, 1)
        }
    })
    drawList(data.todo)
}

const clickSubmitButton = (submitButton, modalWrapper, firstModalTitle, firstModalDescription) => {
    submitButton.addEventListener('click', (event)=>{
            
        event.preventDefault()

        let editModalTitle = document.getElementById('modalInputTitle').value
        let editModalDescription = document.getElementById('modalInputDescription').value
        
        data.todo.forEach(item =>{
            if(item.title === firstModalTitle && item.description === firstModalDescription){
                item.title = editModalTitle
                item.description = editModalDescription
            }
        })
        modalWrapper.style.display = 'none'
        drawList(data.todo)
    })
}

const editCard = (event, modalWrapper) => {
        modalWrapper.style.display = "block"
        const firstModalTitle = event.target.closest('.card').querySelector('.title').textContent
        const firstModalDescription = event.target.closest('.card').querySelector('.description').textContent
        document.getElementById('modalInputTitle').value = firstModalTitle
        document.getElementById('modalInputDescription').value = firstModalDescription

        const closeButton = document.querySelector('#closeButton')
        const submitButton = document.getElementById('submitBtn')
        closeButton.addEventListener('click', () => {
            modalWrapper.style.display = 'none'
        })
        clickSubmitButton(submitButton, modalWrapper, firstModalTitle, firstModalDescription)
}

const inProgressCard = () => {
    const titleCard = event.target.closest('.card').querySelector('.title').textContent
    const descriptionCard = event.target.closest('.card').querySelector('.description').textContent

    inProgress.innerHTML += `
    <div id='inProgressCard' class="card">
        <span>Title: </span>
        <span class="title">${titleCard}</span>
        <br />
        <span>Description: </span>
        <span class="description">${descriptionCard}</span>
    </div>
    `
}

const init = () => {
    const todoList = document.querySelector('.todoList')
    const inputTitle = document.querySelector('#inputTitle')
    const inputDescription = document.querySelector('#inputDescription')
    const addCardButton = document.querySelector('#addCardButton')
    const form = document.querySelector('#form')
    const modalWrapper = document.querySelector('.wrapper')
    const inProgress = document.querySelector('#inProgress')


    addCardButton.addEventListener('click', (event) => {
        event.preventDefault()

        data.todo.push({ title: inputTitle.value, description: inputDescription.value })

        form.reset()

        drawList(data.todo)
    })
    todoList.addEventListener('click', (event) => {
        switch (event.target.classList.value) {
            case 'deleteButton':
                const card = event.target.closest('.card')
                card.className = "cardDelete"
                deleteCard(card)
                break
            case 'editButton':
                
                // modalWrapper.style.display = "block"
                // const firstModalTitle = event.target.closest('.card').querySelector('.title').textContent
                // const firstModalDescription = event.target.closest('.card').querySelector('.description').textContent
                // document.getElementById('modalInputTitle').value = firstModalTitle
                // document.getElementById('modalInputDescription').value = firstModalDescription

                // const closeButton = document.querySelector('#closeButton')
                // const submitButton = document.getElementById('submitBtn')
                // closeButton.addEventListener('click', () => {
                //     modalWrapper.style.display = 'none'
                // })
                // submitButton.addEventListener('click', (event)=>{
                    
                //     event.preventDefault()

                //     let editModalTitle = document.getElementById('modalInputTitle').value
                //     let editModalDescription = document.getElementById('modalInputDescription').value
                    
                //     data.todo.forEach(item =>{
                //         if(item.title === firstModalTitle && item.description === firstModalDescription){
                //             item.title = editModalTitle
                //             item.description = editModalDescription
                //         }
                //     })
                //     modalWrapper.style.display = 'none'
                //     drawList(data.todo)
                // })
               

                editCard(event,modalWrapper)
                break
            case 'nextButton':    
                inProgressCard()
                break
            default:
                break
        }
    })
}
init()