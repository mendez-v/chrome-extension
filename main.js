const formEl = document.getElementById("form-el")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let myLeads = []

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

formEl.addEventListener("submit", function(evt) {
  evt.preventDefault()
  formEl.reset()
  inputEl.focus()
})

tabBtn.addEventListener("click", function () {
  chrome.tabs.query( { active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  } )
})

inputBtn.addEventListener("click", function () {
  let inputValue = inputEl.value
  myLeads.push(inputValue)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})

function render(arr) {
  let listItems = ""
  for (let i = 0; i < arr.length; i++) {
    listItems += `
        <li><a class="link" href=${myLeads[i]} target="_blank" rel="noreferrer">${myLeads[i]}</a></li>
      `
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
  inputEl.focus()
})