<template>
  <form
    class="login-form card"
    @submit.prevent="handleSubmit"
  >
    <div class="login-form__header">
      Login into account
    </div>

    <div
      v-if="error"
      class="alert alert-danger"
    >
      {{ error }}
    </div>

    <input
      required
      type="text"
      placeholder="Username..."
      class="form-control login-form__input"
      v-model.trim="username"
    >

    <input
      required
      type="password"
      placeholder="Password..."
      class="form-control login-form__input"
      v-model="password"
    >

    <button
      class="btn btn-primary"
      type="submit"
      :disabled="loading"
    >
      {{ loading ? 'Loading...' : 'Login'}}
    </button>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { login } from '@/fake-api'
import { Action, namespace } from 'vuex-class'

const UserModule = namespace('user')

@Component
export default class App extends Vue {
  private username: string = ''
  private password: string = ''

  private error: string = ''

  private loading: boolean = false

  @UserModule.Action('login') login: any

  private handleSubmit () {
    this.loading = true
    this.error = ''

    this.login({
      username: this.username,
      password: this.password
    })
      .then(() => {
        this.$router.push('/')
      })
      .catch((err: any) => {
        this.error = err.message
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 300px;

  padding: 20px;

  display: grid;
  grid-row-gap: 10px;

  &__header {
    text-transform: uppercase;
  }

  .alert {
    margin-bottom: 0;
  }
}
</style>
