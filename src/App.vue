<template>
  <div class="app">
    <header class="app__header">
      Delivery cost calculator
    </header>

    <main class="app__content">
      <router-view />
    </main>

    <footer class="app__footer">
      <app-footer />
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppFooter } from '@/components'

@Component({
  components: {
    AppFooter
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
.app {
  margin: 30px auto;
  max-width: 920px;

  display: grid;
  grid-row-gap: 20px;

  &__header {
    text-transform: uppercase;
    font-size: 32px;
  }
}
</style>
