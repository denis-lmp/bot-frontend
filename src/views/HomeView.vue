<template>
  <dashboard-component></dashboard-component>
</template>

<script>
import { defineComponent } from 'vue'

// Components
import DashboardComponent from '../components/DashboardComponent.vue'

export default defineComponent({
    name: 'HomeView',

    components: {
        DashboardComponent,
    },
})
</script>
