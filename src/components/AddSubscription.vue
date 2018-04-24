<template>
  <form>
    <input v-model="from"
           placeholder="From">
    <input v-model="to"
           placeholder="To">
    <button @click.prevent='newSubscription'
            type="submit">Add</button>
  </form>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data: () => ({
    from: "BTC",
    to: "USD",
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

