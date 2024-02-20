<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <VueDatePicker
                    v-model="startDate"
                    format="yyyy-MM-dd HH:mm"
                    :placeholder="'Start Date'"
                    auto-apply>
                </VueDatePicker>
            </v-col>
            <v-col cols="12" sm="6">
                <VueDatePicker
                    v-model="endDate"
                    format="yyyy-MM-dd HH:mm"
                    :placeholder="'End Date'"
                    auto-apply>
                </VueDatePicker>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-sheet class="pa-2 ma-2">
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet class="pa-2 ma-2">
                    <v-btn-toggle v-model="selectedInterval" mandatory>
                        <v-btn :disabled="loading" @click="selectInterval('1 hour')">1 Hour</v-btn>
                        <v-btn :disabled="loading" @click="selectInterval('3 hours')">3 Hours</v-btn>
                        <v-btn :disabled="loading" @click="selectInterval('1 day')">1 Day</v-btn>
                        <v-btn :disabled="loading" @click="selectInterval('1 week')">1 Week</v-btn>
                    </v-btn-toggle>
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet class="pa-2 ma-2">
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row justify="center" align="center">
                    <v-progress-circular
                        indeterminate
                        color="#0277BD"
                        size="64"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                        v-if="loading"
                    ></v-progress-circular>
                    <canvas id="chartCanvas" ref="chartCanvas"></canvas>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chart from 'chart.js/auto'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

export default {
    components: { VueDatePicker },
    data () {
        return {
            loading: false,
            graphData: [],
            chartInstance: null,
            startDate: moment().startOf('day').toDate(),
            endDate: moment().endOf('day').toDate(),
            selectedInterval: null,
        }
    },

    mounted () {
        this.fetchGraphData()
    },

    watch: {
        startDate (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.fetchGraphData()
            }
        },
        endDate (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.fetchGraphData()
            }
        },
    },

    methods: {
        renderChart () {
            this.loading = true

            if (this.chartInstance) {
                this.chartInstance.destroy()
            }

            if (this.$refs.chartCanvas && this.graphData.data) {
                const ctx = document.getElementById('chartCanvas').getContext('2d')

                const labels = this.graphData.data.map(price => price.created_at) ?? []
                const data = this.graphData.data.map(price => price.price) ?? []

                this.chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'BTC price',
                            data: data,
                            fill: false,
                            borderColor: '#0277BD',
                            tension: 0.1,
                        }],
                    },
                    options: {
                        animation: {
                            onComplete: () => {
                                this.loading = false
                            },
                        },
                    },
                })
            }
        },
        performParams () {
            return {
                startDate: this.startDate,
                endDate: this.endDate,
            }
        },
        fetchGraphData () {
            axios.get('prices', {
                params: this.performParams(),
            }).then(response => {
                this.graphData = response.data
                if (!this.loading) {
                    this.renderChart()
                }
            }).catch(error => {
                console.error('Error fetching graph data:', error)
            })
        },
        selectInterval (interval) {
            this.endDate = moment().toDate()
            switch (interval) {
            case '1 hour':
                this.startDate = moment().subtract(1, 'hour').toDate()
                break
            case '1 day':
                this.startDate = moment().subtract(1, 'day').toDate()
                break
            case '3 hours':
                this.startDate = moment().subtract(3, 'hours').toDate()
                break
            case '1 week':
                this.startDate = moment().subtract(3, 'hours').toDate()
                break
            default:
                break
            }
        },
    },
}
</script>
