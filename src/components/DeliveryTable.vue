<template>
  <div class="table card">
    <div class="table__header">
      <delivery-table-row header />
    </div>

    <div class="table__body">
      <delivery-table-row
        v-for="delivery in deliveries"
        :key="delivery.id"
        :delivery="delivery"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DeliveryCollection } from "@/types"
import { DeliveryTableRow } from '@/components'

@Component({
  components: {
    DeliveryTableRow
  }
})
export default class App extends Vue {
  @Prop({ required: true }) private deliveries!: DeliveryCollection
}
</script>
