import axios from "axios"
import _ from "lodash"

import { BASE_MIN_URL } from "./consts"

export const state = {
  subscriptions: {},
  coinList: null,
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
  // _removeSubscription: (state, subscriptionId) => {
  //   state.subscriptions = state.subscriptions.filter(
  //     subscription => subscription.id !== subscriptionId,
  //   )
  // },

  _updateData: (state, payload) => {
    state.subscriptions[payload.id] = {
      ...state.subscriptions[payload.id],
      ...payload,
    }
  },

  _initCoinList: (state, data) => {
    state.coinList = data
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

    commit("_addSubscription", {
      ...payload,
      id,
      url,
      imageUrlFrom,
      imageUrlTo,
    })
  },
  // removeSubscription: ({ commit }, payload) =>
  //   commit("_removeSubscription", payload),

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
}

export default { state, mutations, actions, getters }
