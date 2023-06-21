import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-1130f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButton=document.getElementById("add-button")
const textInput=document.getElementById("input-field")
const list=document.getElementById("shopping-list")

addButton.addEventListener("click", function(){
    let addedInput=textInput.value
    if (addedInput){
    push(shoppingListInDB, addedInput)
    clearInput()
    }
    
})



function addShoppingList(x){
    let itemID=x[0]
    let itemValue=x[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB=ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    list.append(newEl)

}

function clearInput(){
    textInput.value=""
}

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let shoppingArray=Object.entries(snapshot.val())

        clearList()
        shoppingArray.forEach(function(item){
            addShoppingList(item)
        } )

    }
    else{
        list.innerHTML="No items here... yet"
    }
    
})

function clearList(){
    list.innerHTML=""
}
