<template>
  <div class="page page--login">
    <div class="page__content">
      <login-form />
    </div>

    <div class="page__footer">
      <div class="tip">
        Use this account: <span class="text--mono">user:qwery</span>
      </div>

      <div class="tip">
        Admin account: <span class="text--mono">admin:root</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LoginForm } from '@/components'

@Component({
  components: {
    LoginForm
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-row-gap: 20px;

  &__header {
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    justify-content: center;
  }
}

.tip {
  &::before {
    content: 'Tip!';
    font-weight: bold;    
  }
}

.text--mono {
  font-family: monospace;
  background-color: #0000000a;
  padding: 2px 6px;
}
</style>
