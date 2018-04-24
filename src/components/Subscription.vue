<template>
  <div>
    {{ subscription }}
  </div>
</template>

<script>
import io from "socket.io-client"

export default {
  props: ["subscription"],

  data: () => ({
    info: "",
  }),

  created() {
    console.log("Created Subscription.")
    console.log(this.subscription)
  },
}
</script>

