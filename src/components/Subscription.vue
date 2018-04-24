<template>
  <div class='subscription-container'>
    <div class='subscription'>
      <div class='subscription-left'>{{ subscription.from }}</div>
      <div v-if="subscription.price === 0"
           class='subscription-middle'>Loading...</div>
      <div v-else
           :class="{
             down: subscription.flag === '2',
             up: subscription.flag === '1'
           }"
           class='subscription-middle'>{{ subscription.price }}</div>
      <div class='subscription-right'>{{ subscription.to }}</div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client"

export default {
  props: ["subscription"],

  data: () => ({
    info: "",
  }),
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

.subscription-middle {
  flex: 3;
}

.subscription-left {
  flex: 1;
}

.subscription-right {
  flex: 1;
  margin-left: auto;
}

.subscription-container {
  margin-bottom: 1rem;
}
</style>


