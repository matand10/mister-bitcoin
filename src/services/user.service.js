'use strict'
import { dbService } from './db.service.js'
import { utilService } from './util.service'
const KEY = 'user'

export const userService = {
    getUsers,
    get,
    remove,
    save,
    signup,
    login,
    logout,
    getLoggedinUser,
    createUser,
    handleUserTrans,
    saveLocalUser,
    createMove
}

async function getUsers() {
    return await dbService.query(KEY)
}

async function signup(user) {
    try {
        const savedUser = await save(user)
        saveLocalUser(savedUser)
        return user
    } catch (err) {
        throw err
    }
}

async function login(credential) {
    try {
        const users = await getUsers()
        const user = users.find(user => user.name === credential)
        if (!user) return Promise.reject()
        saveLocalUser(user)
        return user
    } catch (err) {
        throw err
    }
}

async function get(id) {
    return await dbService.get(KEY, id)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(user) {
    try {
        if (user._id) return await dbService.put(KEY, user)
        else return await dbService.post(KEY, user)
    } catch (err) {
        throw err
    }
}

function _createDefaultUsers() {
    return [
        createUser('Matan'),
    ]
}

function createUser(name = 'Baba') {
    return {
        name,
        coins: 100,
        moves: []
    }
}

function createMove(toId, to, amount) {
    return {
        toId,
        to,
        at: utilService.getFormatedTime(Date.now()),
        amount,
    }
}

function handleUserTrans(user, contact, amount) {
    if ((user.coins - amount) < 0) return console.error('Not enough coins')
    const move = createMove(contact._id, contact.name, amount)
    user.coins -= amount
    user.moves.unshift(move)
    return user
}

function saveLocalUser(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user))
    return user
}

function logout() {
    sessionStorage.removeItem(KEY)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(KEY))
}