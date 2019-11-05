<template>
  <div class="footer">
    <div v-if="isAuthorized" class="footer__logged">
      You logged as {{ username }}. To logout just resresh this page in your browser.

      <div v-if="isAdmin">
        Admins can see <router-link to="/secret">secret page</router-link>.
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, namespace, Getter } from 'vuex-class'

const UserModule = namespace('user')

@Component
export default class App extends Vue {
  @UserModule.Getter('isAuthorized') isAuthorized!: boolean
  @UserModule.Getter('username') username!: string
  @UserModule.Getter('userRoles') userRoles!: Array<string>

  get isAdmin (): boolean {
    return this.userRoles.includes('ROLE_ADMIN')
  }
}
</script>

<style lang="scss" scoped>

</style>
