<template>
  <div class="list-container">
    <div class="close">
      <button @click.prevent='closeChoices'>x</button>
    </div>
    <div class="list">
      <coin-choice :key="coin.id"
                   :coin='coin'
                   :query="query"
                   :chooseCoin='chooseCoin'
                   v-for="coin in coinListFiltered"></coin-choice>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import CoinChoice from "./CoinChoice.vue"

export default {
  props: {
    closeChoices: {
      required: true,
      type: Function,
    },
    chooseCoin: {
      required: true,
      type: Function,
    },
    query: {
      required: true,
      type: String,
    },
  },
  computed: {
    ...mapGetters(["coinList"]),
    coinListFiltered() {
      return this.coinList.filter(coin =>
        coin.fullName.toLowerCase().includes(this.query.toLowerCase()),
      )
    },
  },
  components: {
    CoinChoice,
  },
}
</script>

<style scoped>
.close {
  position: absolute;
  z-index: 2;
  left: 184px;
  top: -27px;
  font-size: large;
  width: 10px;
  height: 10px;
}

.close button {
  background: transparent;
  font-size: large;
  /* border: none; */
  border-radius: 50%;
  cursor: pointer;
}

.close > button:hover {
  color: #42b883;
}

.close:hover {
  cursor: pointer;
}

.list-container {
  position: absolute;
  z-index: 1;

  left: calc(50% - 90px);
  top: calc(50% - 130px);

  margin-left: auto;
  margin-right: auto;
}
.list {
  overflow: auto;

  width: 180px;
  height: 260px;

  border-radius: 5px;

  background-color: white;
  border: 1px solid #e3e3e3;
}
</style>
