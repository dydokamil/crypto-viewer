<template>
  <component :subscription='subscription'
             @flipComponent="flipComponent"
             :is='currentComponent'></component>
</template>

<script>
import Subscription from "./Subscription.vue"
import Deletion from "./Deletion.vue"

export default {
  props: ["subscription"],
  data: () => ({
    currentComponent: "Subscription",
  }),
  methods: {
    flipComponent() {
      this.currentComponent =
        this.currentComponent === "Subscription" ? "Deletion" : "Subscription"
    },
  },
  components: {
    Subscription,
    Deletion,
  },
}
</script>

