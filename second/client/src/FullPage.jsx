import {Component} from 'react';
import { Layout, Menu} from 'antd';
import { EditOutlined,HomeOutlined,AliwangwangOutlined} from '@ant-design/icons';
import Home from './components/Home';
import N_login from './components/N_login';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import JoinPage from './components/JoinPage';
import {Link,Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Review from './components/Review';
import Chatting from './components/Chatting';
import BtnGroup from './components/BtnGroup';


const { Header, Content, Footer, Sider } = Layout;


class FullPage extends Component{
 
  constructor(props){
    super(props);
    this.state = {
      collapsed : false,
    }
    if(window.sessionStorage.getItem('value') === null){
    window.sessionStorage.setItem('value','1')
    }
  }

  componentDidMount(){
    if(window.location.pathname === '/'){
      window.location.href = '/home'
    }
  }

  v1(){
    window.sessionStorage.removeItem('value');
    window.sessionStorage.setItem('value','1');
  }

  v2(){
    window.sessionStorage.removeItem('value');
    window.sessionStorage.setItem('value','2');
  }
  v3(){
    window.sessionStorage.removeItem('value');
    window.sessionStorage.setItem('value','3');
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };


  render() {
    const { collapsed } = this.state;
    return (
    <Router> 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[window.sessionStorage.getItem('value')]} mode="inline">
            <Menu.Item key="1" onClick={this.v1} icon={<HomeOutlined />}>
            <Link to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.v2} icon={<EditOutlined />}>
            <Link to='/review'>Review</Link> 
            </Menu.Item>
            <Menu.Item key="3" onClick={this.v3} icon={<AliwangwangOutlined />}>
            <Link to='/chat'>Chatting</Link> 
            </Menu.Item>                
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            
          {/*
            (function(){
              if(window.sessionStorage.getItem('nickname') !== null){
                return <Login /> ;
              }else{
                return <N_login /> ;
              }
            })()
          */}
          <BtnGroup/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route exact path='/home' component={Home}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={JoinPage}/>
            <Route path='/review' component={Review}/>
            <Route path='/chat' component={Chatting}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Mini HomePage ©2020 Created by 배고프면 개발하는 사람</Footer>
        </Layout>
      </Layout>
      </Router>
    );
  } 
}


export default FullPage;