<template>
  <div class="list-container">
    <div class="close">
      <button @click.prevent='closeChoices'>Close</button>
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
import { mapGetters } from 'vuex'

import CoinChoice from './CoinChoice.vue'

export default {
  props: {
    closeChoices: {
      required: true,
      type: Function
    },
    chooseCoin: {
      required: true,
      type: Function
    },
    query: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(['coinList']),
    coinListFiltered () {
      return this.coinList.filter((coin) =>
        coin.fullName.toLowerCase().includes(this.query.toLowerCase())
      )
    }
  },
  components: {
    CoinChoice
  }
}
</script>

<style scoped>
.close {
  position: absolute;
  z-index: 2;
  /* top: 270px; */
  top: 51vh;
  font-size: large;
}

.close button {
  /* background: transparent; */
  background: white;
  font-size: large;
  width: 280px;
  border-radius: 5px;
  border: 1px solid #e3e3e3;
  padding: 0.5rem;
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

  left: calc(50% - 140px);
  /* top: calc(50% - 130px); */
  /* top: 25vh; */

  /* margin-left: auto; */
  /* margin-right: auto; */
}
.list {
  overflow: auto;

  width: 280px;
  /* height: 260px; */
  height: 50vh;

  border-radius: 5px;

  background-color: white;
  border: 1px solid #e3e3e3;
}
</style>
