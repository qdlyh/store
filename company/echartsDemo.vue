<template>
    <div class="hello">
        <div class="page">
            <input type="number" v-model="num" @keyup.enter="jup()">
            <span @click="jup">跳页</span>
            <span>
                <i>{{page}}</i>
                <i>{{total}}</i>
            </span>
            <button @click="btn">-</button>
            <button @click="btns">+</button>
        </div>
        <Button type="error" @click="isShow">Error</Button>

        <div id="main" style="width: 600px;height:400px;" v-show="show"></div>

        <div id="mains" style="width: 800px;height:600px;" v-show="!show"></div>

        <Tabs value="name1">
            <TabPane label="标签一" name="name1">标签一的内容</TabPane>
            <TabPane label="标签二" name="name2">标签二的内容</TabPane>
            <TabPane label="标签三" name="name3">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
export default {
    name: "HelloWorld",
    data() {
        return {
            myChart: null,
            show: true,
            num: 1,
            page: 1,
            total: 10,
            theme1: "light"
        };
    },
    mounted() {
        // 引入柱状图
        require("echarts/lib/chart/bar");
        // 引入提示框和标题组件
        require("echarts/lib/component/tooltip");
        require("echarts/lib/component/title");
        this.harts();
    },
    watch: {
        num(val) {
            this.num = this.num.replace(/\D|^0/g, "1");
        },
        show() {
            if (this.show) {
                this.myChart = echarts.init(document.getElementById("main"));
            } else {
                this.myChart = echarts.init(document.getElementById("mains"));
            }
            this.harts();
        }
    },
    methods: {
        btn() {
            if (this.page > 1) {
                this.page--;
            }
        },
        btns() {
            if (this.page < this.total) {
                this.page++;
            }
        },
        jup(e) {
            if (this.num > this.total) {
                this.page = this.total;
            } else {
                this.page = this.num;
            }
        },
        isShow() {
            this.show = !this.show;
        },
        harts() {
            if (this.show) {
                this.myChart = echarts.init(document.getElementById("main"));
            }
            // 绘制图表
            this.myChart.setOption({
                title: {
                    text: "ECharts 入门示例"
                },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
}
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
