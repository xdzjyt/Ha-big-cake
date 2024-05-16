<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps, watch, ref } from 'vue';

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
});
watch(props.chartData, (newValue, oldValue) => {
    if (newValue.length > 0) {
        initChart();
    }
});

const chart = ref();//dom引用

const option = reactive({
    title: {
        text: '开支与收入情况占比',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
        ]
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false,
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 40, name: '员工薪资' },
                { value: 33, name: '设备维护' },
                { value: 28, name: '物料采购' },
                { value: 22, name: '场地租金' },
                { value: 20, name: '折损消耗' },
            ]
        }
    ],
    itemStyle: {
        borderRadius: ['5%', '5%'],
    },
    radius: ['40%', '70%'],
})

const initChart = () => {
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
onMounted(()=>{
    initChart();
});

</script>

<template>
    <div ref="chart" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></div>
</template>

<style lang="scss" scoped></style>