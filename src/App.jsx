import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
// 导入layout布局
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

import styles from './css/app.scss'

// 导入 路由相关的组件页面
import HomeContainer from './components/home/HomeContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'
import AboutContainer from './components/about/AboutContainer.jsx'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  componentWillMount(){
    console.log(window)
  }
  render(){
    return <HashRouter>
         <Layout className="layout" style={{height:'100%'}}>
            <Header>
              <div className={styles.logo} />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="home"><Link to='/home'>首页</Link></Menu.Item>
                <Menu.Item key="movie"><Link to='/movie'>电影</Link></Menu.Item>
                <Menu.Item key="about"><Link to='/about'>关于</Link></Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px',flex:1 }}>
                <Route path='/home' component={HomeContainer}></Route>
                <Route path='/movie' component={MovieContainer}></Route>
                <Route path='/about' component={AboutContainer}></Route>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by 黑马程序员</Footer>
     </Layout>
    </HashRouter>
  }
}