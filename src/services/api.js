import { createContactsMarkup } from '@/main.js';

const API_KEY = '66ebf15b2b6cf2b89c5c880b'

export function getContacts() {
    fetch(`https://${API_KEY}.mockapi.io/contacts`)
    .then(response => response.json())
    .then(contacts => {
    createContactsMarkup(contacts)
})
}

 export function createContact(contact) {
    return fetch(`https://${API_KEY}.mockapi.io/contacts`, {
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(contact)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        getContacts()
    })
    .catch(err => console.error(err))
}

