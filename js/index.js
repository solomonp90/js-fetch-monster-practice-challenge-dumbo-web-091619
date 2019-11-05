let createMonsterDiv = document.querySelector('#create-monster')
let monsterContainerDiv = document.querySelector('#monster-container')
let backButton = document.querySelector('#back')
let forwardButton = document.querySelector('#forward')
let pageNumber = 1

forwardButton.innerText = `next`
backButton.innerText = `back`

fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
.then(res => res.json())
.then((monsters) => {
    monsters.forEach(renderMonster)
})

function renderMonster(monster){

    let monsterNameH4Tag = document.createElement('h4')
    let monsterAgeH6Tag = document.createElement('h6')
    let monsterDescPTag = document.createElement('p')
    
    monsterNameH4Tag.innerText = monster.name
    monsterAgeH6Tag.innerText = monster.age
    monsterDescPTag.innerText = monster.description

    monsterContainerDiv.append(monsterNameH4Tag,monsterAgeH6Tag,monsterDescPTag)
}



let createMonsterform = document.createElement('form')
let createMonsterformNameLabel = document.createElement('label')
let createMonsterformInputName = document.createElement('input')
let createMonsterformAgeLabel = document.createElement('label')
let createMonsterformInputAge = document.createElement('input')
let createMonsterformDescLabel = document.createElement('label')
let createMonsterformInputDesc = document.createElement('input')
let createMonsterformSubmit = document.createElement('input')
// inner text
createMonsterformNameLabel.innerText = "Name"
createMonsterformAgeLabel.innerText = "Age"
createMonsterformDescLabel.innerText = "Description"
// name attr
createMonsterformInputName.name = "name"
createMonsterformInputAge.name = "age"
createMonsterformInputDesc.name = "description"
// ====================
createMonsterformInputName.type = "text"
createMonsterformInputAge.type = "text"
createMonsterformInputDesc.type = "text"



// submit
createMonsterformSubmit.type = "submit"
createMonsterformSubmit.value = "Create Monster"
// input
createMonsterform.append(
    createMonsterformNameLabel,
    createMonsterformInputName,
    createMonsterformAgeLabel,
    createMonsterformInputAge,
    createMonsterformDescLabel,
    createMonsterformInputDesc,
    createMonsterformSubmit)
 // 
 createMonsterDiv.append(createMonsterform)

 createMonsterform.addEventListener('submit',(e)=>{
     e.preventDefault()
     fetch(`http://localhost:3000/monsters`,{
        method:'POST',
        headers: {
            'Content-type':'application/json'

        },
        body: JSON.stringify({
          name: e.target.name.value,
          age: e.target.age.value,
          description: e.target.description.value,
        })
      })
      .then(res => res.json())
      .then((response) => {
          console.log(response)
      })
 })

 forwardButton.addEventListener('click',()=>{
     monsterContainerDiv.innerText = ""
     pageNumber++
     console.log(`${pageNumber}`)
     fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
     .then(res => res.json())
     .then((monsters) => {
         monsters.forEach(renderMonster)
     })
 })

 backButton.addEventListener('click',() => {
     if (pageNumber > 1) {
         monsterContainerDiv.innerText = ""
         pageNumber--
         fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then((monsters) => {
        console.log(pageNumber)
         monsters.forEach(renderMonster)
    })
    } else {
        
    }
 })
 


//  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
//     .then(res => res.json())
//     .then((monsters) => {
//         console.log(pageNumber)
//          monsters.forEach(renderMonster)
//     })


