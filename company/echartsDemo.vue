<style scoped lang="less">
.index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    h1 {
        height: 150px;
        img {
            height: 100%;
        }
    }
    h2 {
        color: #666;
        margin-bottom: 200px;
        p {
            margin: 0 0 50px;
        }
    }
    .ivu-row-flex {
        height: 100%;
    }
}
</style>
<template>
    <div class="index">
        <div v-for="(items,index) in cityListBox" :key="index">
            <Select v-for="(selects,index) in items.childr" :key="index" v-model="selects.model1" @on-change="selectBtn" style="width:200px">
                <Option v-for="item in selects.cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
            <div @click="add(items)">++</div>
            <div @click="btn(items)">--</div>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h1>
                <img src="../images/logo.png">
            </h1>
            <h2>
                <p>Welcome to your iView app!</p>
                <Button @click="handleStart">Start iView</Button>
            </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cityListBox: [
                {
                    childr: [
                        {
                               model1: [],
                            cityList: [
                                {
                                    value: "New York000000000",
                                    label: "New York"
                                },
                                {
                                    value: "London",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                               model1: [],
                            cityList: [
                                {
                                    value: "New York111111111111111",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                               model1: [],
                            cityList: [
                                {
                                    value: "New York222222222",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        }
                    ]
                },
                                {
                    childr: [
                        {
                            model1: [],
                            cityList: [
                                {
                                    value: "New York000000000",
                                    label: "New York"
                                },
                                {
                                    value: "London",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                            cityList: [
                                {
                                    value: "New York111111111111111",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                            cityList: [
                                {
                                    value: "New York222222222",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        }
                    ]
                }
            ],
            // model1: [],
            data: {
                    childr: [
                        {
                            cityList: [
                                {
                                    value: "New York000000000",
                                    label: "New York"
                                },
                                {
                                    value: "London",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                            cityList: [
                                {
                                    value: "New York111111111111111",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        },
                        {
                            cityList: [
                                {
                                    value: "New York222222222",
                                    label: "New York"
                                },
                                {
                                    value: "Londonxxxxxxxxxxxxx",
                                    label: "London"
                                },
                                {
                                    value: "Sydney",
                                    label: "Sydney"
                                },
                                {
                                    value: "Ottawa",
                                    label: "Ottawa"
                                },
                                {
                                    value: "Paris",
                                    label: "Paris"
                                },
                                {
                                    value: "Canberra",
                                    label: "Canberra"
                                }
                            ]
                        }
                    ]
                },
        };
    },
    watch: {
        model1(data) {
            console.log(data);
        }
    },
    methods: {
        selectBtn(data){
            for(let key in this.cityListBox){
                console.log(this.cityListBox[key])
                // for(let keys in this.cityListBox[key].childr){
                //     console.log(this.cityListBox[key].childr[keys])
                // }
            }
        },
        add(items){
            this.cityListBox.push(this.data)
        },
        btn(items){
            this.cityListBox.splice(items,1)
        },
        handleStart() {
            this.$Modal.info({
                title: "Bravo",
                content: "Now, enjoy the convenience of iView."
            });
        }
    }
};
</script>
