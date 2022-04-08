import React, { Component } from 'react'
import { Row, Col ,Image } from 'antd';

import './index.css'
// import {UsergroupAddOutlined} from '@ant-design/icons'
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');
require('echarts/lib/chart/pie');
require('echarts/lib/component/grid');
require('echarts/lib/chart/line');

//折线图
const SmoothedListChart = (infoData,typeData)=>{
    var myChart = echarts.init(document.getElementById('SmoothedList'))
    myChart.setOption( 
        {
        xAxis: {
            type: 'category',
            data: typeData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: infoData,
            type: 'line',
            smooth: true
        }]
        }
   )

}

//饼图
const bingtu = (infoData)=>{
    var chartDom = echarts.init(document.getElementById('main'))
    chartDom.setOption(
        {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [25, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: infoData,
                }
            ]
        }
    )
}


export class cmsHome extends Component {
    state = {}
    
    //Echart 组件调用
    componentDidMount(){
        //0、Ajax 获取后端数据
        const ArticleCount = [
            {value: 40, name: 'rose 1'},
            {value: 38, name: 'rose 2'},
            {value: 32, name: 'rose 3'},
            {value: 30, name: 'rose 4'},
            {value: 28, name: 'rose 5'},
        ]
        const ViewData = [400,500,800,900,950];
        const DateType = ['周一','周二','周三','周四','周五','周六','周日']
        //1、饼图、折线图
        bingtu(ArticleCount)
        SmoothedListChart(ViewData,DateType)
    }

    render() {
        return (
            <div className="home-transform-box">
                {/* 顶部 --- 3个div 方块 */}
                <Row gutter={24}>
                    {/* 访问量 */}
                    <Col span={8}>
                        <div id="card-border">
                        <Row gutter={24}>
                            <Col span={16}> 
                            
                                    <Image width={85} src="https://beego-xiaomi-store.oss-cn-shenzhen.aliyuncs.com/static/RESTfulApi/upload/%E7%94%A8%E6%88%B7.png"/>
                               
                            </Col>
                            <Col span={6}>
                                <div className="card-desc">
                                    <div id="card-title">访问量</div><div id="card-count">12345</div>
                                </div>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    {/*  帖子数量 */}
                    <Col span={8}>
                    <div id="card-border">
                        <Row gutter={24}>
                            <Col span={16}> <Image width={85} src="https://beego-xiaomi-store.oss-cn-shenzhen.aliyuncs.com/static/RESTfulApi/upload/%E6%96%87%E7%AB%A0.png"/></Col>
                            <Col span={6}>
                                <div className="card-desc">
                                    <div id="card-title">访问量</div><div id="card-count">12345</div>
                                </div>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    {/* 留言量 */}
                    <Col span={8}>
                    <div id="card-border">
                        <Row gutter={24}>
                            <Col span={16}> <Image width={85} src="https://beego-xiaomi-store.oss-cn-shenzhen.aliyuncs.com/static/RESTfulApi/upload/%E7%95%99%E8%A8%80.png"/></Col>
                            <Col span={6}>
                                <div className="card-desc">
                                    <div id="card-title">访问量</div><div id="card-count">12345</div>
                                </div>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                </Row>
                {/* 中间 */}
                {/* <Row gutter={8}><button onClick={this.clickHandler}>按钮点击</button></Row> */}
                <Row gutter={16}>
                    <Col span={16}>
                        <div id="SmoothedList" style={{ width: 800, height: 450 }}></div>
                    </Col>
                    <Col span={8}>
                        <div id="main" style={{ width: 400, height: 400 }}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default cmsHome
