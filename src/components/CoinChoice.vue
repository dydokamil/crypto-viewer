<template>
  <div @click="onClickItem"
       class='list-item'>
    <img v-if="query.length >= 3"
         :src="imageSrc"> {{ coin.fullName }}
  </div>
</template>

<script>
export default {
  props: {
    chooseCoin: {
      required: true,
      type: Function,
    },
    coin: {
      required: true,
    },
    query: {
      required: true,
      type: String,
    },
  },
  computed: {
    imageSrc: vm => `https://cryptocompare.com${vm.coin.imageUrl}`,
  },
  methods: {
    onClickItem() {
      this.chooseCoin(this.coin.fullName)
      // console.log(this.coin)
    },
  },
}
</script>

<style scoped>
.list-item {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.list-item:hover {
  background-color: #e3e3e3;
  cursor: pointer;
}

img {
  float: left;
  width: 30px;
  height: 30px;
}
</style>
