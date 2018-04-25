<template>
  <div class='subscription-container'>
    <div class='subscription'>

      <div class='subscription-middle'>
        <button @click.prevent="$emit('flipComponent')">Back</button>
        <button @click.prevent="deleteSubscription">Delete</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapActions } from "vuex"

import { BASE_URL } from "../consts"

export default {
  props: ["subscription"],

  data: () => ({
    info: "",
    interval: null,
  }),

  methods: {
    deleteSubscription() {
      this.$store.dispatch("removeSubscription", { id: this.subscription.id })
    },
  },
}
</script>

<style scoped>
.subscription-middle {
  padding: 0.88rem;
}

button {
  background: transparent;
  border: none;
  font-size: large;
  cursor: pointer;
}

button:active,
button:enabled {
  outline: none;
}

button:hover {
  color: #42b883;
}
</style>


