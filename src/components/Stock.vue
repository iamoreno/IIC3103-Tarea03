<template>
<div>
    <p class="h2">Stocks</p>
    <div class="row row-cols-1 row-cols-md-3">
  <div class="col mb-4" v-for="st of stocks" v-bind:key="st">
    <div class="card h-100 text-white bg-dark">
      <Chart class="card-img-top" :st="st"></Chart>
      <div class="card-body">
        <h5 class="card-title">{{dataStocks[st]['company']}}</h5>
        <p class="card-text">Highest Value: {{dataStocks[st]['v_alto']}}</p>
        <p class="card-text">Lowest Value: {{dataStocks[st]['v_bajo']}}</p>
        <p class="card-text">Actual Price: {{dataStocks[st]['v_actual']}}</p>
        <p class="card-text">Variación: {{dataStocks[st]['variacion']}}%</p>
      </div>
    </div>
  </div>
</div>
</div>
    
</template>
<script>
import {mapMutations, mapState} from 'vuex';
import Chart from './Chart.vue';

export default {
    name: 'Stock',
    components: {
      Chart
    },
    computed: {
      ...mapState(['conectado', 'stocks', 'dataStocks', ''])
    },
    methods: {
      ...mapMutations(['desconectar', 'getExchanges', 'getStocks', 'getBuys', 'getSells', 'getUpdates']),

    }
}
</script>
