import io from "socket.io-client"
import axios from "axios"
import _ from "lodash"

export const state = {
  subscriptions: {},
  socket: null,
  coinList: null,
}

export const normalizeId = unnormalized =>
  unnormalized
    .split("~")
    .slice(2, 4)
    .join("")

export const mutations = {
  _addSubscription: (state, subscription) => {
    const { id, url, from, to } = subscription

    state.subscriptions = {
      ...state.subscriptions,
      [id]: { url, from, to, price: 0, id },
    }
    state.socket.emit("SubAdd", { subs: [url] })
  },
  _removeSubscription: (state, subscriptionId) => {
    state.subscriptions = state.subscriptions.filter(
      subscription => subscription.id !== subscriptionId,
    )
  },

  _updateData: (state, payload) => {
    state.subscriptions[payload.id] = {
      ...state.subscriptions[payload.id],
      ...payload,
    }
  },

  _initSocket: (state, socket) => {
    state.socket = socket
  },

  _initCoinList: (state, data) => {
    state.coinList = data
  },
}

export const actions = {
  addSubscription: ({ commit }, payload) =>
    commit("_addSubscription", {
      id: `${payload.from}${payload.to}`,
      from: payload.from,
      to: payload.to,
      url: `2~Poloniex~${payload.from}~${payload.to}`,
    }),
  removeSubscription: ({ commit }, payload) =>
    commit("_removeSubscription", payload),
  initSocket: ({ commit }) => {
    const socket = io("wss://streamer.cryptocompare.com")
    commit("_initSocket", socket)

    socket.on("m", message => {
      // {Type}~{ExchangeName}~{FromCurrency}~{ToCurrency}~{Flag}~{Price}~
      // {LastUpdate}~{LastVolume}~{LastVolumeTo}~{LastTradeId}~{Volume24h}~
      // {Volume24hTo}~{MaskInt}
      // console.log(message)
      const id = normalizeId(message)
      const dataSplit = message.split("~")

      if (dataSplit[4] === "4") {
        return
      }

      const namedData = {
        flag: dataSplit[4],
        price: dataSplit[5],
        // lastUpdate: dataSplit[6],
        lastVolume: dataSplit[7],
        lastVolumeTo: dataSplit[8],
        volume24h: dataSplit[10],
        volume24hTo: dataSplit[11],
      }

      if (id.length) commit("_updateData", { id, ...namedData })
    })
  },
  initCoinList: ({ commit }) => {
    const URL = "https://min-api.cryptocompare.com/data/all/coinlist"

    axios
      .get(URL)
      .then(res => {
        const data = Object.values(res.data.Data)
        let coinData = data.map(coin => ({
          id: coin.Id,
          imageUrl: coin.ImageUrl,
          // name: coin.CoinName,
          fullName: coin.FullName,
          // shortName: coin.Name,
        }))
        coinData = _.sortBy(coinData, "fullName")
        // console.log(coinData)
        commit("_initCoinList", coinData)
      })
      .catch(err => console.log(err))
  },
}

export const getters = {
  subscriptions: state => state.subscriptions,
  coinList: state => state.coinList,
}

export default { state, mutations, actions, getters }
