<template>
    <v-btn @click="fetchGraphData">Get data</v-btn>
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
            graphData: null,
        }
    },

    mounted () {
        this.renderChart()
        // this.fetchGraphData()
    },

    methods: {
        renderChart () {
            const ctx = this.$refs.chartCanvas.getContext('2d')

            // Create a new chart with received data
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    // labels: this.data.labels,
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Graph Data',
                        // data: this.data.values,
                        data: [12, 19, 3, 5, 2, 3],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    }],
                },
            })
        },
        fetchGraphData () {
            axios.get('/tradings')
                .then(response => {
                    // console.log(response.data)
                    this.graphData = response.data
                })
                .catch(error => {
                    console.error('Error fetching graph data:', error)
                })
        },
    },
}
</script>
