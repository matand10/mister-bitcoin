import { userService } from '@/services/user.service.js'
import { eventBus } from '@/services/eventBus.service.js'

export default {
    state: {
        user: userService.getLoggedinUser(),
        users: []
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        setUser(state, { user }) {
            state.user = user
        },
        saveUser(state, { user }) {
            const userId = user._id
            const idx = state.users.findIndex(user => user._id === userId)
            if (idx === -1) {
                state.users.push(user)
                state.user = { ...user }
            } else {
                state.user = { ...user }
                state.users.splice(idx, 1, user)
            }
            console.log('user', user)
            userService.saveLocalUser(user)
        }
    },
    actions: {
        async loadUser({ commit }) {
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
            } catch (err) {
                throw err
            }
        },
        async signup({ commit }, { newUser }) {
            try {
                const savedUser = await userService.signup(newUser)
                const user = savedUser
                commit({ type: 'saveUser', user })
                showMsg('Signed-up successfully!', 'success')
            } catch (err) {
                throw err
            }
        },
        async login({ commit }, { credential }) {
            try {
                const user = await userService.login(credential)
                commit({ type: 'setUser', user })
                showMsg('Logged-in successfully!', 'success')
            } catch (err) {
                showMsg('Cannot login!', 'danger')
                throw err
            }
        },
        async logout({ commit }, { user }) {
            try {
                await userService.logout(user)
                commit({ type: 'setUser', user })
                showMsg('Logout successfully!', 'success')
            } catch (err) {
                throw err
            }
        },
        async saveUser({ commit }, { user }) {
            try {
                userService.save(user)
                commit({ type: 'saveUser', user })
                showMsg('Transfer went successfully!', 'success')
            } catch (err) {
                throw err
            }
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
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