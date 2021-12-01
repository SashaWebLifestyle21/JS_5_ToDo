const data = {
    todo: [],
    inProgress: [],
    done: []
}

const drawList = (dataType) =>{
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
        </div>
        `
    })
}

const deleteCard = (card) =>{
    const title = card.querySelector('.title').textContent
    const description = card.querySelector('.description').textContent
    data.todo.forEach((item,index) =>{
        if(item.title === title && item.description === description){
            data.todo.splice(index,1)
        }
    })
    drawList(data.todo)
}

const init = () =>{
    const todoList = document.querySelector('.todoList')
    const inputTitle = document.querySelector('#inputTitle')
    const inputDescription = document.querySelector('#inputDescription')
    const addCardButton = document.querySelector('#addCardButton')
    const form = document.querySelector('#form')
    
    
    addCardButton.addEventListener('click', (event) => {
        event.preventDefault()
    
        data.todo.push({title: inputTitle.value, description: inputDescription.value})
    
        form.reset()

        drawList(data.todo)
    })
    todoList.addEventListener('click', (event) => {
        switch(event.target.classList.value){
            case 'deleteButton': 
                const card = event.target.closest('.card')
                card.className = "cardDelete"
                setTimeout(deleteCard,1000,card)
                // deleteCard(card)
                break
            case 'editButton':
                console.log(event.target)
                break
            default: 
                break
        }
    })
}
init()