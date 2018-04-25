<template>
  <div class='input-container'>
    <input @focus="showChoices = true"
           :class="direction"
           v-model="query"
           :placeholder="direction">
    <coin-choices :query="query"
                  :chooseCoin='chooseCoin'
                  :closeChoices='closeChoices'
                  v-if='showChoices 
                    && query.length > 0'></coin-choices>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CoinChoices from "./CoinChoices.vue"

export default {
  data: () => ({
    showChoices: true,
    query: "",
  }),
  props: ["direction"],
  computed: {
    ...mapGetters(["coinList"]),
  },
  methods: {
    closeChoices() {
      this.showChoices = false
    },
    chooseCoin(coin) {
      this.closeChoices()
      this.query = coin

      console.log(this.direction)

      this.$emit("changeCurrency", this.query)
    },
  },
  components: {
    CoinChoices,
  },
}
</script>

<style scoped>
.input-container {
  display: inline;
}
input {
  width: 40%;
  padding: 0.5rem;
  outline: none;
  border: 1px solid #e3e3e3;
  border-radius: 15px;
}

input:active,
input:focus {
  border: 1px solid #42b883;
}

.From {
  margin-right: 0.5rem;
}
</style>
