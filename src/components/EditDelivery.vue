<template>
  <form
    class="edit card"
    @submit.prevent="handleSubmit"
  >
    <div class="edit__header">
      Editing delivery
    </div>

    <input
      required
      placeholder="Please enter delivery name"
      v-model="name"
      type="text"
      class="form-control"
    >

    <input
      required
      placeholder="Please enter delivery distance"
      v-model="distance"
      type="text"
      class="form-control"
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

    <div class="edit__actions">
      <button
        class="btn btn-light"
        @click.prevent="$emit('closed')"
      >
        Cancel
      </button>

      <button
        type="submit"
        class="btn btn-success"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { Delivery } from '@/types'
import { Action } from 'vuex-class'

@Component
export default class App extends Vue {
  @Prop() private delivery!: Delivery

  @Action('updateDelivery') updateDelivery!: any

  private name: string = ''
  private distance: string | number = ''
  private isInternational: boolean = false
  private id: number = -1

  mounted () {
    this.changeEditingDelivery()
  }

  @Watch('delivery')
  changeEditingDelivery (val?: any) {
    const change = () => {
      this.name = this.delivery.name
      this.distance = this.delivery.distance
      this.isInternational = this.delivery.isInternational || false
      this.id = this.delivery.id
    }

    if (val) {
      const message: string = 'Are you sure you want to edit another delivery?'
      const confirmation = window.confirm(message)

      if (confirmation) {
        change()
      }
    } else {
      change()
    }
  }

  @Emit('closed')
  private handleSubmit () {
    this.updateDelivery({
      id: this.id,
      delivery: {
        name: this.name,
        distance: this.distance,
        isInternational: this.isInternational
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.edit {
  padding: 20px;

  display: grid;
  grid-row-gap: 10px;

  &__header {
    text-transform: uppercase;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
