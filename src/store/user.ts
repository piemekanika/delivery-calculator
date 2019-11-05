import { Module } from 'vuex'
import { login } from '@/fake-api'

const user: Module<any, any> = {
  namespaced: true,
  state: {
    token: '' as string,
    refreshToken: '' as string,
    userRoles: [] as Array<string>,
    username: '' as string
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    },

    SET_REFRESH_TOKEN: (state, payload) => {
      state.refreshToken = payload
    },

    SET_USER_ROLES: (state, payload) => {
      state.userRoles = payload
    },

    SET_USERNAME: (state, payload) => {
      state.username = payload
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      await login({
        username,
        password
      })
        .then(result => {
          commit('SET_TOKEN', result.token)
          commit('SET_REFRESH_TOKEN', result.refresh_token)
          commit('SET_USER_ROLES', result.user_roles)
          commit('SET_USERNAME', username)
        })
        .catch(err => {
          throw err
        })     
    }
  },
  getters: {
    isAuthorized: state => !!state.refreshToken,
    userRoles: state => state.userRoles,
    username: state => state.username
  }
}

export {
  user
}
