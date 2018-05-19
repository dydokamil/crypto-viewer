<template>
  <div class="subscription-container">
    <transition name='fade'
                mode='out-in'>
      <component :subscription='subscription'
                 @flipComponent="flipComponent"
                 :is='currentComponent'></component>
    </transition>
  </div>
</template>

<script>
import Subscription from './Subscription.vue'
import Deletion from './Deletion.vue'

export default {
  props: ['subscription'],
  data: () => ({
    currentComponent: 'Subscription'
  }),
  methods: {
    flipComponent () {
      this.currentComponent =
        this.currentComponent === 'Subscription' ? 'Deletion' : 'Subscription'
    }
  },
  components: {
    Subscription,
    Deletion
  }
}
</script>

<style>
.subscription-container {
  margin-bottom: 1rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
