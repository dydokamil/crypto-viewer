<template>
  <div class="hello">
    <h1>Crypto Viewer</h1>
    <AddSubscription></AddSubscription>
    <Subscription :subscription="subscription"
                  v-for="subscription in subscriptions">{{ subscription }}</Subscription>
  </div>
</template>

<script>
import io from "socket.io-client"
import { mapActions, mapGetters } from "vuex"

import Subscription from "./Subscription.vue"
import AddSubscription from "./AddSubscription.vue"

export default {
  computed: {
    ...mapGetters(["subscriptions"]),
    // subscriptions: this.$store.getters.subscriptions,
  },
  methods: { ...mapActions(["initSocket"]) },
  props: {
    msg: String,
  },
  components: {
    Subscription,
    AddSubscription,
  },
  created() {
    this.$store.dispatch("initSocket")
    console.log("home", this.subscriptions)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
