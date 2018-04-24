import io from "socket.io-client"

export const state = {
  subscriptions: {},
  socket: null,
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
      console.log(message)
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
}

export const getters = {
  subscriptions: state => state.subscriptions,
}

export default { state, mutations, actions, getters }
