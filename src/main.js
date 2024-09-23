// import { createContact, getContacts } from './services/api.js';
const API_KEY = '66ebf15b2b6cf2b89c5c880b'
const contactList = document.querySelector('.contacts')
const form = document.querySelector('.form')

getContacts()

function onDeleteContact(e) {
    if (e.target.nodeName === 'BUTTON') {
        deleteContact(e.target.dataset.id)
    }
}

function onSubmit(e) {
    e.preventDefault()

    const contact = {
        name: form.elements.name.value,
        phone: form.elements.number.value,
        age: +form.elements.age.value,
        image: form.elements.image.value
    }
    
    createContact(contact).finally(() => {
        form.reset()
    })
}

form.addEventListener('submit', onSubmit);
contactList.addEventListener('click', onDeleteContact)

function createContactsMarkup(contacts) {
   contactList.innerHTML = contacts.map(({id, name, age, image, phone}) => `<li class='card'>
    <img src='${image}' alt='${name}' class='photoCard'/>
    <div class='contactBox'>
     <h2 class='contactInformation'>${name}, ${age}</h2>
     <a href='tel:${phone}' class='contactPhone'>${phone}</a>
     <button type="button" data-id="${id}" class='deleteContactBtn'>Delete</button>
    </div>
    </li>`).join('')
}

function getContacts() {
    fetch(`https://${API_KEY}.mockapi.io/contacts`)
    .then(response => response.json())
    .then(contacts => {
    createContactsMarkup(contacts)
})
}

function createContact(contact) {
    return fetch(`https://${API_KEY}.mockapi.io/contacts`, {
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(contact)
    })
    .then(() =>{
        getContacts()
    })
    .catch(err => console.error(err))
}

function deleteContact(id) {
    return fetch(`https://${API_KEY}.mockapi.io/contacts/${id}`, {
        method: "DELETE"
    }).then(() =>{
        getContacts()
    })
    .catch(err => console.error(err))
}