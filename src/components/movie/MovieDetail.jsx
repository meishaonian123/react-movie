import React from 'react'
import { Button, Icon,Spin, Alert  } from 'antd';
import fetchJSONP from 'fetch-jsonp'


export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            info:{},
            isloading:true
        }
    }

    componentWillMount(){
        console.log(this.props.match.params.id)
        // fetchJSONP('https://api.douban.com/v2/movie/subject/'+ this.props.match.params.id)
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data)
        //     this.setState({
        //         info:data,
        //         isloading:false
        //     })
        // })
        const data = require('../test_data/movie_detail.json')
        setTimeout(()=>{
            this.setState({
                info:data,
                isloading:false
            })
        },2000)
            
        
    }

    render(){
    return  <div>
                <Button type="primary" onClick = {this.getback}>
                    <Icon type="left" />
                    返回电影列表页面
                </Button>
                
                {this.renderinfo()}
            </div>
    }

    // 返回上一页
    getback = ()=>{
        console.log(this.props.history.go(-1))
    }

    // 渲染详情页面
    renderinfo = ()=>{
        // console.log(this.state.isloading)
            if(this.state.isloading){
                return <Spin tip="Loading...">
                    <Alert
                    message="正在加载"
                    description="精彩内容马上开始...."
                    type="info"
                    />
                </Spin>
            }else{
                return <div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <h1>{this.state.info.title}</h1>

                        <img src='https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2581403670.webp' alt="" />
                    </div>

                     <p style={{ textIndent: '2em', lineHeight: '30px' }}>{this.state.info.summary}</p>

                </div>
            }
    }

}