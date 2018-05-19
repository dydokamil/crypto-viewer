<template>
  <div @click="onClickItem"
       class='list-item'>
    <div class='image-container'
         v-if="query.length >= 3">
      <img :src="imageSrc">
    </div>
    <div class="info-container">
      {{ coin.fullName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chooseCoin: {
      required: true,
      type: Function
    },
    coin: {
      required: true
    },
    query: {
      required: true,
      type: String
    }
  },
  computed: {
    imageSrc: (vm) => `https://cryptocompare.com${vm.coin.imageUrl}`
  },
  methods: {
    onClickItem () {
      this.chooseCoin(this.coin.symbol)
    }
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.list-item:hover {
  background-color: #e3e3e3;
  cursor: pointer;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.info-container {
  padding-right: 0.1rem;
  padding-left: 0.1rem;
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  float: left;
  width: 30px;
  height: 30px;
}
</style>
