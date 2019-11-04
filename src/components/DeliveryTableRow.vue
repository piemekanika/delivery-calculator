<template>
  <div class="table-row" :class="{'table-row--header': header}">
    <div class="table-row__item">
      {{ header ? 'Name' : delivery.name }}
    </div>

    <div class="table-row__item">
      {{ header ? 'Distance' : delivery.distance + ' km' }}
    </div>

    <div class="table-row__item">
      {{ typeName }}
    </div>

    <div class="table-row__item">
      {{ header ? 'Cost' : delivery.distance * multiplicator + '₽' }}
    </div>

    <div class="table-row__item item--actions">
      <span v-if="header">
        Actions
      </span>

      <span v-else>
        <button
          class="btn btn-primary"
          @click="$emit('edit-clicked', delivery.id)"
        >
          Edit
        </button>

        <button
          class="btn btn-danger"
          @click="handleDelete(delivery.id)"
        >
          Remove
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Delivery } from '@/types'
import { Action } from 'vuex-class'

@Component
export default class App extends Vue {
  @Prop() private delivery!: Delivery
  @Prop({type: Boolean}) private header!: boolean

  @Action('deleteDelivery') deleteDelivery!: any

  get multiplicator () {
    return this.delivery.isInternational
      ? 5
      : 3
  }

  get typeName () {
    if (this.header) {
      return 'Type'
    } else {
      return this.delivery.isInternational
        ? 'International'
        : 'Domestic'
    }
  }

  private handleDelete (id: number) {
    const message: string = 'Are you sure you want to delete this delivery?'
    const confirmation = window.confirm(message)

    if (confirmation) {
      this.deleteDelivery(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  grid-template-columns: 1fr 150px 150px 100px 190px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,.125);
  }

  &__item {
    padding: 10px 20px;

    display: flex;
    align-items: center;

    &.item--actions {
      span {
        min-width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &--header {
    background: hsl(0, 0%, 90%);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
  }
}
</style>
