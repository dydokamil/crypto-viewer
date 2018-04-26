<template>
  <div @click="$emit('flipComponent')"
       class='subscription'>
    <div class='subscription-left'>
      <img :src="imageFrom">
      <div>{{ subscription.from }}</div>
    </div>
    <div v-if="subscription.price === 0"
         class='subscription-middle'>Loading...</div>
    <div v-else
         class='subscription-middle'>
      <span :class="{
             down: subscription.flag === 1,
             up: subscription.flag === 2
           }">{{ subscription.price }}</span>
    </div>
    <div class='subscription-right'>
      <img :src="imageTo">
      <div>{{ subscription.to }}</div>
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

  computed: {
    imageFrom: vm => `${BASE_URL}/${vm.subscription.imageUrlFrom}`,
    imageTo: vm => `${BASE_URL}/${vm.subscription.imageUrlTo}`,
  },

  methods: {
    ...mapActions(["updateData"]),
  },
}
</script>

<style>
.down {
  color: #b85142;
}
.up {
  color: #42b883;
}

.subscription {
  display: flex;
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid #e3e3e3;
}

.subscription-left {
  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

.subscription-middle {
  display: flex;
  flex: 3;

  text-align: center;
  justify-content: center;
  align-items: center;
}

.subscription-right {
  display: flex;
  flex: 1;
  margin-left: auto;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

.subscription-container {
  margin-bottom: 1rem;
  cursor: pointer;
}

img {
  width: 30px;
  height: 30px;
}
</style>


