<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps, watch, ref, onMounted } from 'vue';

const props = defineProps({
    chartTitle: {
        type: String,
    },
    chartData: {
        type: Array,
    },
    chartLegend: {
        type: Array,
    },
    value: {
        type: String,
    }
});
watch(props.chartData, (newValue, oldValue) => {
    if (newValue.length > 0) {
        initChart();
    }
});

const chart = ref();//dom引用

const option = reactive({
    title: {
        text: props.chartTitle,
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        bottom:-5,
        data: props.chartLegend,
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '收入占比',
            type: 'pie',
            radius: [20, 70],
            roseType: 'area',
            data: props.chartData,
        }
    ],
    itemStyle: {
        borderRadius: 5
    },
})

const initChart = () => {
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
onMounted(() => {
    initChart();
});

</script>

<template>
    <div ref="chart" style="width: 100%;height: 100%;"></div>
</template>

<style lang="scss" scoped></style>