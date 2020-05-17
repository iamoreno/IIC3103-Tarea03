<script>
import Chart from 'chart.js';
export default {
  name: 'monthly-sales-chart',
  props: {
    // Omitted...
  },
  data() {
    return {
      // Data that will hold the Chart.js instance.
      chart: null
    };
  },
  watch: {
    // Watch for the datasets changes.
    datasets(newDatasets) {
      // Replace the datasets and call the update() method on Chart.js
      // instance to re-render the chart.
      this.chart.data.datasets = newDatasets;
      this.chart.update();
    }
  },
  mounted() {
    // Store the created instance.
    this.chart = new Chart(this.$refs.myChart, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
  }
}
</script>