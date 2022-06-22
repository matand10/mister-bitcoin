<template>
    <section>
        <div v-if="btcInfo" class="chart-info">
            <h1>{{ btcInfo.name }}</h1>
            <h1>Daily Charts</h1>
            <h1>{{ btcInfo.description }}</h1>
        </div>
        <LineChart />
        <chart />
    </section>

</template>

<script>
import Chart from '../components/Chart.vue'
import LineChart from '../components/LineChart.vue'
import { bitcoinService } from '../services/bitcoin.service'

export default {
    data() {
        return {
            btcInfo: null
        }
    },
    async created() {
        const data = await bitcoinService.bitcoinRate()
        this.btcInfo = {
            name: data.name,
            period: data.period,
            description: data.description
        }
    },
    components: {
        Chart,
        LineChart,
    }
}
</script>

<style lang="scss">
.chart-info {
    background-color: #202124;
    padding: 10px;
    border: 1px solid white;
    text-align: center;
    color: white;
}
</style>