import axios from "axios"
import _ from "lodash"

import { BASE_MIN_URL } from "./consts"

export const state = {
  subscriptions: {},
  coinList: null,
  error: null,
  clearErrorTimeout: null,
}

export const normalizeId = unnormalized =>
  unnormalized
    .split("~")
    .slice(2, 4)
    .join("")

export const mutations = {
  _addSubscription: (state, subscription) => {
    // console.log(subscription)
    const { id } = subscription

    state.subscriptions = {
      ...state.subscriptions,
      [id]: { ...subscription, price: 0 },
    }
  },
  _removeSubscription: (state, subscriptionId) => {
    clearInterval(state.subscriptions[subscriptionId].interval)
    state.subscriptions = _.omit(state.subscriptions, subscriptionId)
  },

  _updateData: (state, payload) => {
    let flag = 0

    const previousPrice = state.subscriptions[payload.id].price
    const currentPrice = payload.price

    if (previousPrice > currentPrice) {
      flag = 1
    } else if (previousPrice < currentPrice) {
      flag = 2
    }

    state.subscriptions[payload.id] = {
      ...state.subscriptions[payload.id],
      ...payload,
      flag,
    }
  },

  _initCoinList: (state, data) => {
    state.coinList = data
  },

  _setError(state, payload) {
    state.error = payload.error
    if (state.clearErrorTimeout !== null) {
      clearTimeout(state.clearErrorTimeout)
    }
    state.clearErrorTimeout = payload.timeout
  },

  _removeError(state) {
    state.error = null
  },
}

export const actions = {
  addSubscription: ({ commit }, payload) => {
    const { from, to } = payload

    const id = `${from}${to}`
    const url = `${BASE_MIN_URL}/data/price?fsym=${from}&tsyms=${to}`

    const fromEntry = state.coinList.find(coin => coin.symbol === from)
    const toEntry = state.coinList.find(coin => coin.symbol === to)

    const imageUrlFrom = fromEntry.imageUrl
    const imageUrlTo = toEntry.imageUrl

    const fetchData = () => axios.get(url)

    const fetchDataAndCommit = () =>
      fetchData().then(res => {
        commit("_updateData", {
          id,
          price: res.data[to],
        })
      })

    fetchData().then(res => {
      if (res.data.Response === "Error") {
        const timeout = setTimeout(() => commit("_removeError"), 5000)
        commit("_setError", { error: res.data.Message, timeout })
      } else {
        const interval = setInterval(fetchDataAndCommit, 10000)

        commit("_addSubscription", {
          ...payload,
          id,
          url,
          imageUrlFrom,
          imageUrlTo,
          interval,
        })
      }
    })
  },
  removeSubscription: ({ commit }, payload) =>
    commit("_removeSubscription", payload.id),

  updateData: ({ commit }, payload) => {
    commit("_updateData", payload)
  },

  initCoinList: ({ commit }) => {
    const URL = "https://min-api.cryptocompare.com/data/all/coinlist"

    axios.get(URL).then(res => {
      const data = Object.values(res.data.Data)
      let coinData = data.map(coin => ({
        id: coin.Id,
        imageUrl: coin.ImageUrl,
        // name: coin.CoinName,
        fullName: coin.FullName,
        // shortName: coin.Name,
        symbol: coin.Symbol,
      }))
      coinData = _.sortBy(coinData, "fullName")
      // console.log(coinData)
      commit("_initCoinList", coinData)
    })
  },
}

export const getters = {
  subscriptions: state => state.subscriptions,
  coinList: state => state.coinList,
  error: state => state.error,
}

export default { state, mutations, actions, getters }
