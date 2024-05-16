<script setup lang="ts">
import { reactive ,onMounted} from 'vue';
import * as echarts from 'echarts';
 let head_list =reactive([
    {id:1 , title: "总点单量" ,number:11455},
    {id:2 , title: "今日成交额" ,number:114514545},
    {id:3 , title: "季度物资成本" ,number:114514545},
    {id:4 , title: "季度平均利润率" ,number:114514545},
    {id:5 , title: "月度工时统计" ,number:114514545}
 ])
const option1 = reactive({
  title: {
    text: '物料管理'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['包装袋', '吸管', '纸杯', '糖浆', '牛奶', '咖啡豆']
  },
  series: [
    {
      name: '仓位值',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '警戒值',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
    },
)
const option2 =reactive({
  title: {
    text: '销量统计'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})
const option3=reactive({
  title: {
    text: '开支与收入情况占比',
    subtext: 'Fake Data',
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
      name: 'Radius Mode',
      type: 'pie',
      radius: [20, 140],
      center: ['25%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 40, name: '员工薪资' },
        { value: 33, name: '设备维护' },
        { value: 28, name: '物料采购' },
        { value: 22, name: '场地租金' },
        { value: 20, name: '折损消耗' },
      ]
    },
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 140],
      center: ['75%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: '产品 1' },
        { value: 28, name: '产品 2' },
        { value: 26, name: '产品 3' },
        { value: 24, name: '产品 4' },
        { value: 22, name: '产品 5' },
        { value: 20, name: '产品 6' },
      ]
    }
  ]
})
const option4 =reactive({
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
},

)
onMounted(() => {
  let myChart1 = echarts.init(document.getElementById("myChart1"));
  let myChart4 = echarts.init(document.getElementById("myChart4"));
  window.addEventListener('resize', function() {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
  },);
   let myChart2 = echarts.init(document.getElementById("myChart2"));
   let myChart3 = echarts.init(document.getElementById("myChart3"));

     myChart1.setOption(option1);
     myChart2.setOption(option2);
     myChart3.setOption(option3);
     myChart4.setOption(option4);
  })
  console.log
</script>

<template>
<div class="main">
    <div class="head">
    <h1>首页</h1>
    </div>
    <div class="head1">
      <div class="categoty" v-for="value in head_list" :key="value.id">
      <span >{{ value.title }}</span>
      <hr>
      <br>
      <span>{{ value.number }}</span>
    </div> 
  </div>
    <div class="main1">
       <div id="myChart1" style="width:500px; height: 300px "></div>
       <div>
        <span>最新表单列表：</span>
        <table width="500px" border="1">
          <tr>
            <td>第三季度财报</td>
          </tr>
          <tr>
            <td>物料采购清单</td>
          </tr>
          <tr>
            <td>员工绩效考核报表</td>
          </tr>
        </table>
        </div>
       <div id="myChart4" style="width: 400px; height: 300px ;"></div>
       <div id="myChart2" style="width: 600px; height: 300px"></div>
       <div id="myChart3" style="width: 800px; height: 300px"></div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.main{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
 
 .head{
    display: flex;
    height: 100px;
    width: 100%;
    margin-right: auto;
    border-bottom: 2px solid black;
    font-size: 50px;  
    font-weight: 600;
    user-select: none;
    justify-content: space-evenly;
    flex-wrap: wrap;
 }
 .head1{
    display: flex;
    flex-direction: row;  
    justify-content: center;
    
    .categoty{
    background-color: #ebeb6e;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    margin-right: 30px;
    width: 220px;
    height: 100px;
    margin-left: 10px ;
    margin-top: 5px;
    span{
      font-size:20px;
      line-height: 40px;
      text-align: center; 
    }
   
 }
}
.main1{
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start ;
  div{
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    margin-left: auto;
    height:300px;
     span{
      font-size: 30px;
     }
    }
  }
}

</style>