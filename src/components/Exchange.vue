<template>
  <div class="container-fluid">
    <p class="h2">Exchanges</p>
    <div class="row flex-nowrap d-flex justify-content-around">
        
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;" v-for="exchange of ex" v-bind:key="exchange">
            <div class="card-header">{{exchange}}</div>
            <div class="card-body">
            <p class="card-text">Participación de Mercado: {{dataEx[exchange]['porcentaje']}}%</p>
            <p class="card-text">Volumen Compra: {{dataEx[exchange]['v_compra']}}</p>
            <p class="card-text">Volumen Venta: {{dataEx[exchange]['v_venta']}}</p>
            <p class="card-text">Total transado: {{dataEx[exchange]['v_total']}}</p>
            <p class="card-text">Cantidad de empresas: {{dataEx[exchange]['companies'].length}}</p>
            </div>
            
            
      </div>
      
    </div>
</div>
</template>
<script>
import {mapMutations, mapState} from 'vuex';

export default {
    name: 'Exchange',
    computed: {
      ...mapState(['conectado', 'dataEx', 'dataStocks', 'ex', 'stocks'])
    },
    methods: {
      ...mapMutations(['Conectar']),
    }
}
</script>