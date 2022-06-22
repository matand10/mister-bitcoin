'use strict'
import { dbService } from './db.service.js'
import { utilService } from './util.service'
const KEY = 'contacts'

export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact
}

async function query() {
    var contacts = await dbService.query(KEY)

    if (!contacts || !contacts.length) {
        contacts = _createDefaultContacts()
        await dbService.insert(KEY, contacts)
    }
    return contacts
}

async function get(id) {
    return await dbService.get(KEY, id)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(contact) {
    if (contact._id) return await dbService.put(KEY, contact)
    else return await dbService.post(KEY, contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: '',
        userImg: `https://robohash.org/${utilService.getRandomInt(1, 250)}.png`,
        coins: 0
    }
}

function _createDefaultContacts() {
    return [
        _createContact('Matan'),
        _createContact('Shimon'),
        _createContact('Ori'),
        _createContact('Effy'),
    ]
}

function _createContact(name) {
    return {
        id: utilService.makeId(),
        name,
        email: `${name}@gmail.com`,
        phone: `972-${utilService.makeId()}`,
        userImg: `https://robohash.org/${utilService.makeId()}.png`,
        coins: 0
    }
}
