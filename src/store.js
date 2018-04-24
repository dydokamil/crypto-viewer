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
    const { id, url } = subscription

    state.subscriptions = {
      ...state.subscriptions,
      [id]: { url },
    }
    state.socket.emit("SubAdd", { subs: [url] })
  },
  _removeSubscription: (state, subscriptionId) => {
    state.subscriptions = state.subscriptions.filter(
      subscription => subscription.id !== subscriptionId,
    )
  },

  _updateData: (state, payload) => {
    state.subscriptions[payload.id] = payload.message
  },

  _initSocket: (state, socket) => {
    state.socket = socket
  },
}

export const actions = {
  addSubscription: ({ commit }, payload) =>
    commit("_addSubscription", {
      id: `${payload.from}${payload.to}`,
      url: `2~Poloniex~${payload.from}~${payload.to}`,
    }),
  removeSubscription: ({ commit }, payload) =>
    commit("_removeSubscription", payload),
  initSocket: ({ commit }) => {
    const socket = io("wss://streamer.cryptocompare.com")
    commit("_initSocket", socket)

    socket.on("m", message => {
      const id = normalizeId(message)

      if (id.length) commit("_updateData", { id, message })
    })
  },
}

export const getters = {
  subscriptions: state => state.subscriptions,
}

export default { state, mutations, actions, getters }
