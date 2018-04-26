<template>
  <div id="app">
    <div class="container">
      <Home />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue"

export default {
  name: "app",
  components: {
    Home,
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

.red {
  color: #b85142;
}
.green {
  color: #42b883;
}
</style>
