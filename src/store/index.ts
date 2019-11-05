import Vue from 'vue'
import Vuex from 'vuex'
import { DeliveryCollection, Delivery } from '@/types'
import { user } from './user'
import deliveries from '@/mocked-data/deliveries.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deliveries: deliveries as DeliveryCollection
  },
  mutations: {
    ADD_DELIVERY: (state, payload: Delivery) => {
      state.deliveries.push(payload)
    },

    DELETE_DELIVERY: (state, deliveryId: number) => {
      state.deliveries = state.deliveries.filter((el: Delivery) => el.id !== deliveryId)
    },

    UPDATE_DELIVERY: (state, { id, delivery }) => {
      const oldDelivery = state.deliveries.filter((el: Delivery) => el.id === id)[0]
      
      oldDelivery.name = delivery.name
      oldDelivery.distance = delivery.distance
      oldDelivery.isInternational = delivery.isInternational
    }
  },
  actions: {
    addDelivery({ commit, getters }, delivery: Delivery) {
      /**
       * Max `id` in the Dileveries collection
       */
      const maxId = getters.deliveries.reduce((acc: number, cur: Delivery) => {
        return Math.max(acc, cur.id)
      }, 1)

      commit('ADD_DELIVERY', {
        ...delivery,
        id: maxId + 1
      })
    },

    deleteDelivery({ commit }, deliveryId: number) {
      commit('DELETE_DELIVERY', deliveryId)
    },

    updateDelivery({ commit }, { id, delivery }) {
      commit('UPDATE_DELIVERY', { id, delivery })
    }
  },
  getters: {
    deliveries: state => state.deliveries,
    totalCost: state => {
      return state.deliveries.reduce((acc: number, cur: Delivery) => {
        const multiplicator = cur.isInternational ? 5 : 3

        return acc + cur.distance * multiplicator
      }, 0)
    }
  },
  modules: {
    user
  }
})
