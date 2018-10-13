const taskInput = $('[name=task]')

const unFinishedArea = $('#unfinished-area')
const finishedArea = $('#finished-area')

if(!localStorage.getItem('unfinished')){
    localStorage.setItem('unfinished','')
}
else{
    oldUnfinished = localStorage.getItem('unfinished').split('::')
    console.log(oldUnfinished)
    oldUnfinished.forEach(taskText=>{
        if(taskText != ""){
            createTask(taskText)
        }
    })
}
if(!localStorage.getItem('finished')){
    localStorage.setItem('finished','')
}
else{
    oldFinished = localStorage.getItem('finished').split('::')
    oldFinished.forEach(taskText=>{
        if(taskText != ""){
            checkTask(createTask(taskText),true)
        }
    })
}

function checkTask(jEl,local){
    local = local || false
    if(jEl.parent().parent().children('.title').text()[0] == "F"){
        return
    }
    jEl.css('background-image','url(checkmark.png)')
    jEl.css('background-size','contain')
    jEl.css('background-repeat','no-repeat')
    if(!local){
        localStorage.setItem('unfinished',localStorage.getItem('unfinished').replace(jEl.next().html() + "::",''))
        localStorage.setItem('finished',localStorage.getItem('finished') + jEl.next().html() + "::")
    }
    jEl.parent().appendTo(finishedArea)
}

function checkTaskfromClick(){
    checkTask($(this))
}

function removeTask(){
    localStorage.setItem('unfinished',localStorage.getItem('unfinished').replace($(this).prev().html() + "::",''))
    localStorage.setItem('finished',localStorage.getItem('finished').replace($(this).prev().html() + "::",''))
    $(this).parent().remove()
}

function createTask(text,local){
    const newTask = $('<div>')
    newTask.addClass('untask')
    newTask.addClass('task')

    const newLabel = $('<div>')
    newLabel.addClass('check-label')

    const newH3 = $('<h3>')
    newH3.html(text)

    const newRemove = $('<button>')
    newRemove.html('Remove')
    newRemove.addClass('remove-button')
    newRemove.click(removeTask)

    newTask.append(newLabel)
    newTask.append(newH3)
    newTask.append(newRemove)

    newLabel.click(checkTaskfromClick)

    unFinishedArea.append(newTask)
    return newLabel
}

function createTaskfromKey(e){
    if(e.keyCode != 13){
        return
    }
    if($(this).val().trim() == ''){
        return
    }
    createTask($(this).val().trim())
    localStorage.setItem('unfinished',localStorage.getItem('unfinished') + $(this).val().trim() + "::")
    $(this).val('')
}

taskInput.keydown(createTaskfromKey)

let dragging = false
