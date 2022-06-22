import { contactService } from '@/services/contact.service.js'
import { eventBus } from '@/services/eventBus.service.js'

export default {
    state: {
        contacts: [],
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            state.contacts = state.contacts.filter(contact => contact._id !== contactId)
            showMsg('Deleted Successfully', 'success')
        },
        saveContact(state, { contact }) {
            const contactId = contact._id
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            if (idx === -1) {
                state.contacts.push(contact)
                showMsg('Added Successfully', 'success')
            } else {
                state.contacts.splice(idx, 1, contact)
                showMsg('Edited Successfully', 'success')
            }
        }
    },
    actions: {
        async loadContacts({ commit }) {
            try {
                const contacts = await contactService.query()
                commit({ type: 'setContacts', contacts })
            } catch (err) {
                throw err
            }
        },
        async removeContact({ commit }, { contactId }) {
            try {
                await contactService.remove(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            try {
                await contactService.save(contact)
                commit({ type: 'saveContact', contact })
            } catch (err) {
                throw err
            }
        }
    },
    getters: {
        contacts(state) {
            return state.contacts
        }
    }
}

function showMsg(msg, status) {
    eventBus.emit('user-msg', {
        txt: msg,
        type: status,
        timeout: 2500,
    })
}