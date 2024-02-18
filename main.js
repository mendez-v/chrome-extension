const $ = selector => document.getElementById(selector)

const formEl = $("form-el"),
inputEl = $("input-el"),
saveInputBtn = $("save-input-btn"),
saveTabBtn = $("save-tab-btn"),
deleteBtn = $("delete-btn"),
ulEl = $("ul-el")

let leadsArr = []

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
  leadsArr = leadsFromLocalStorage
  render(leadsArr)
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault()
})

saveInputBtn.addEventListener("click", () => {
  leadsArr.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(leadsArr))
  render(leadsArr)
  inputEl.focus()
})

saveTabBtn.addEventListener("click", () => {
  chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
    leadsArr.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(leadsArr))
    render(leadsArr)
  } )
})

deleteBtn.addEventListener("dblclick", () => {
  leadsArr = []
  localStorage.clear()
  render(leadsArr)
  window.location.reload()
})

function render(lead) {
  let listItem = ""
  for (let i = 0; i < lead.length; i++) {
    listItem += `
    <li>
      <a class="list__cta" href=${lead[i]} target="_blank" rel="noreferrer">
        ${lead[i]}
      </a>
    </li>
    `
    ulEl.innerHTML = listItem
  }
}