<template>
  <div class="hello">
    <h1>Crypto Viewer</h1>
    <add-subscription></add-subscription>
    <transition-group name='list-complete'>
      <SubscriptionContainer v-for="subscription in subscriptions"
                             :subscription="subscription"
                             :key="subscription.id">{{ subscription }}</SubscriptionContainer>
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
    this.$store.dispatch("initCoinList")
  },
}
</script>


<style scoped>
.list-complete-move {
  transition: transform 500ms;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.list-complete-enter-active,
.list-complete-leave-active {
  transition: all 500ms;
}
</style>
