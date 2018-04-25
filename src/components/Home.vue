<template>
  <div class="hello">
    <h1>Crypto Viewer</h1>
    <add-subscription></add-subscription>
    <transition-group name='slide'>
      <Subscription :key="subscription.id"
                    :subscription="subscription"
                    v-for="subscription in subscriptions"></Subscription>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

import Subscription from "./Subscription.vue"
import AddSubscription from "./AddSubscription.vue"

export default {
  computed: {
    ...mapGetters(["subscriptions", "initCoinList"]),
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
    // this.$store.dispatch("initSocket")
    this.$store.dispatch("initCoinList")
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-list {
  list-style-type: none;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 150ms;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

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
