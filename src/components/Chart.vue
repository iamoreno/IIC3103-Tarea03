<template>
  <div>
  <h2>{{this.st}}</h2>
  <div class="chart" :id="st"></div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts';
import { mapState } from 'vuex';
export default {
  name: 'Chart',
  components: {},
  props: ['st'],
  data() {
    return {
      inserted: new Set(),
    };
  },
  created() {},
  computed: {
    ...mapState(['dataUpdate']),
  },
  mounted() {
    const chart = createChart(document.getElementById(this.st), {});
    chart.applyOptions({
        layout: {
          textColor: '#007bff',
          backgroundColor: 'black'
        },
        grid: {
          vertLines: {
            color: 'gray'
          },
          horzLines: {
            color: 'gray'
          }
        },
        crosshair: {
          vertLine: {
            color: '#ffffff'
          },
          horzLine: {
            color: '#ffffff'
          }
        }

    })
    this.lineSeries = chart.addLineSeries();
  },
  methods: {
    add_Data(data) {
      if (data['ticker'] === this.st) {
        this.lineSeries.update({
          time: data['time'],
          value: data['value'],
        });
      }
    },
  },
  watch: {
    dataUpdate: function() {
      this.dataUpdate.forEach((dato) => {
        if (!this.inserted.has(dato['ticker']+ dato['time']+'')) {
          this.add_Data(dato);
          this.inserted.add(dato['ticker']+ dato['time']+'');
        }
      });
    },
  },
};
</script>
<style>
.chart {
  background-color:black;
  margin: 10px;
  height: 305px;
  width: 460px;
  display: inline-flex;
}
</style>