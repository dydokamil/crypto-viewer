<template>
  <form>
    <div class='input-group'>
      <input v-model="from"
             placeholder="From">
      <input v-model="to"
             placeholder="To">
    </div>
    <button @click.prevent='newSubscription'
            type="submit">Add</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["coinList"]),
  },
  data: () => ({
    from: "BTC",
    to: "USD",
    selected: null,
  }),
  methods: {
    ...mapActions(["addSubscription"]),
    newSubscription() {
      this.$store.dispatch("addSubscription", {
        from: this.from,
        to: this.to,
      })
      this.from = this.to = ""
    },
  },
}
</script>

<style scoped>
.input-group > input {
  padding: 0.5rem;
  outline: none;
  border: 1px solid #e3e3e3;
  border-radius: 15px;
}

input {
  width: 40%;
}

input:active,
input:focus {
  border: 1px solid #42b883;
}

.input-group > input:not(:last-child) {
  margin-right: 0.5rem;
}

form > button {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: large;
  background: none;
  border: none;
  transition: 150ms;
}

form > button:hover {
  color: #42b883;
  cursor: pointer;
}

form > button:active,
button:focus {
  outline: none;
}
</style>
