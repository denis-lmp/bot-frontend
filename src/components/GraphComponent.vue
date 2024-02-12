<template>
    <v-btn @click="renderChart()">Get data</v-btn>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
import axios from 'axios'

export default {
    props: ['data'], // Data received from parent component

    data () {
        return {
            graphData: [],
            chartInstance: null,
        }
    },

    mounted () {
        this.fetchGraphData()
    },

    methods: {
        renderChart () {
            if (this.chartInstance) {
                this.chartInstance.destroy()
            }
            const ctx = this.$refs.chartCanvas.getContext('2d')

            if (this.graphData.data) {
                const labels = this.graphData.data.map(price => price.created_at) ?? []
                const data = this.graphData.data.map(price => price.price) ?? []

                // Create a new chart with received data
                this.chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Graph Data',
                            // data: this.data.values,
                            data: data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        }],
                    },
                })
            }
        },
        fetchGraphData () {
            axios.get('prices')
                .then(response => {
                    this.graphData = response.data
                    this.renderChart()
                })
                .catch(error => {
                    console.error('Error fetching graph data:', error)
                })
        },
    },
}
</script>
