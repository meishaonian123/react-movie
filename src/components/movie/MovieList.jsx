import React from 'react'

import { Spin, Alert, Pagination  } from 'antd';

// 导入第三方包解决fetchAPI跨域的问题
import fetchJSONP from 'fetch-jsonp'

import MovieItem from './MovieItem.jsx'
import { func } from 'prop-types';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
        movies:[],
        nowPage:parseInt(this.props.match.params.id) || 1,
        pageSize:22,
        total:0,
        isloading:true,
        movieType:this.props.match.params.type

    }
  }
  componentWillMount(){
    //   Es6中fetchApi
    //  fetch("https://api.douban.com/v2/movie/in_theaters").then(response=>{
    //     return response.json()
    //   }).then(data=>{
    //       console.log(data)
    //   }) 
    // setTimeout(()=>{
    //     this.setState({
    //         isloading: false
    //     })
    // },1000)
    this.loadMovieListByTypeAndPage()
  }

  // 组件将要接受新的属性
  componentWillReceiveProps(nextProps){
    this.setState({
      nowPage:parseInt(nextProps.match.params.id) || 1,
      isloading:true,
      movieType:nextProps.match.params.type
    },function(){
      this.loadMovieListByTypeAndPage()
    })

  }


  loadMovieListByTypeAndPage = () => {

    const start = this.state.pageSize * (this.state.nowPage - 1)
    const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
    fetchJSONP(url).then(response=>response.json())
    // fetchJSONP("https://douban.uieee.com/v2/movie/in_theaters").then(response=>response.json())
    .then(data=>{
        console.log(data)
        this.setState({
            isloading: false, // 将 loading 效果隐藏
            movies: data.subjects, // 为电影列表重新赋值
            total: data.total // 把总条数，保存到 state 上
          })
        console.log(this.state.movies)
    })
    // const data =require('../test_data/theaters.json')
    // setTimeout(()=>{
    //     this.setState({
    //         isloading: false, // 将 loading 效果隐藏
    //         movies: data.subjects, // 为电影列表重新赋值
    //         total: data.total // 把总条数，保存到 state 上
    //     })
    //     console.log(this.state.movies)
    // },2000)
   
  }

onChange = (pageNumber)=> {
    // console.log('Page: ', pageNumber);
    // window.location.href = '/#/movie/' + this.state.movieType + '/' + pageNumber
   this.props.history.push('/movie/'+ this.state.movieType + '/' + pageNumber)
  // console.log(this.props)
  }



  renderList(){
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
              <div style={{display:"flex",flexWrap:"wrap"}}>
                {this.state.movies.map(item=>{
                    return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                })}           
            </div>
            <Pagination showQuickJumper defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} 
            showQuickJumper={true}	 total={this.state.total} onChange={this.onChange} />
          </div>
         
      }
  }
  render(){
    return <div>
        {this.renderList()}
    </div>
  }
}