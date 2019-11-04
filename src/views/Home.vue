<template>
  <div class="page page--home">
    <h1 class="page__header">
      Delivery cost calculator
    </h1>

    <div class="page__content">
      <new-delivery />

      <delivery-table
        :deliveries="deliveries"
        @edit-clicked="hadnleEditClick"
      />
    </div>

    <div class="page__footer">
      <edit-delivery
        v-if="editingDelivery"
        :delivery="editingDelivery"
        @closed="editingDelivery = null"
      />

      <span class="total card">
        <span class="total__header">
          Total cost
        </span>

        <span class="total__cost text--bold">
          {{ totalCost }}₽
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NewDelivery, EditDelivery, DeliveryTable } from '@/components'
import { DeliveryCollection, Delivery } from '@/types'
import { Getter } from 'vuex-class'

@Component({
  components: {
    DeliveryTable,
    NewDelivery,
    EditDelivery
  }
})
export default class App extends Vue {
  @Getter('deliveries') deliveries!: DeliveryCollection
  @Getter('totalCost') totalCost!: number

  private editingDelivery: Delivery | null = null

  private hadnleEditClick (deliveryId: number) {
    this.editingDelivery = this.deliveries.filter(el => el.id === deliveryId)[0]
  }
}
</script>

<style lang="scss" scoped>
.page {
  &__header {
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  &__content {
    display: grid;
    grid-row-gap: 20px;
  }

  &__footer {
    margin-top: 10px;
    
    display: flex;
    justify-content: space-between;

    .total {
      margin-left: auto;
      margin-bottom: auto;
      padding: 20px;
      text-align: right;

      &__header {
        text-transform: uppercase;
      }

      &__cost {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>
