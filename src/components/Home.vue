<template>
  <div class="hello">
    <h1>Crypto Viewer</h1>
    <add-subscription></add-subscription>
    <transition-group name='slide'>
      <SubscriptionContainer :key="subscription.id"
                             :subscription="subscription"
                             v-for="subscription in subscriptions"></SubscriptionContainer>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

import SubscriptionContainer from "./SubscriptionContainer.vue"
import AddSubscription from "./AddSubscription.vue"

export default {
  computed: {
    ...mapGetters(["subscriptions"]),
    // subscriptions: this.$store.getters.subscriptions,
  },
  methods: { ...mapActions(["initCoinList"]) },
  props: {
    msg: String,
  },
  components: {
    SubscriptionContainer,
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
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
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
.list-complete-leave-active {
  position: absolute;
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
