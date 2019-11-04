<template>
  <form
    class="new-delivery"
    @submit.prevent="handleSubmit"
  >
    <input
      required
      placeholder="Enter name"
      class="new-delivery__name form-control"
      type="text"
      v-model.trim="name"
    >
    
    <input
      required
      placeholder="Enter distance (in km)"
      class="new-delivery__distance form-control"
      type="text"
      v-model.number="distance"
    >

    <select
      class="new-delivery__type custom-select"
      v-model="isInternational"
    >
      <option :value="true">
        International
      </option>

      <option :value="false">
        Domestic
      </option>
    </select>

    <button
      type="submit"
      class="new-delivery__submit btn btn-success"
    >
      Add delivery
    </button>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Delivery, DeliveryCollection } from '@/types'
import { Action } from 'vuex-class'

@Component
export default class App extends Vue {
  @Action('addDelivery') addDelivery: any

  private name: string = ''
  private distance: string | number = ''
  private isInternational: boolean = false

  private handleSubmit () {
    this.addDelivery({
      id: -1,
      name: this.name,
      distance: +this.distance,
      isInternational: this.isInternational
    })

    this.name = ''
    this.distance = ''
    this.isInternational = false
  }
}
</script>

<style lang="scss" scoped>
.new-delivery {
  display: flex;

  > * {
    margin-right: 10px;
  }

  &__submit {
    min-width: 130px;
  }
}
</style>
