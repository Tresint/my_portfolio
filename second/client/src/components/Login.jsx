import {Component} from 'react';
import {Button} from 'antd';
import {socket} from '../service/Socket';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
           users : 0
        }
    }

    componentDidMount() {
        socket.on('user',(obj) => {
            this.setState({
                users : obj
            })
        })
    }

    logout = () => {
        window.sessionStorage.removeItem('nickname');
        window.sessionStorage.removeItem('token');
        window.location.href = '/home';
    }

    render(){

        return(
            <div style={{textAlign:"right"}}>
                (현재 접속자 수 :  &nbsp; {this.state.users} &nbsp;명)&nbsp;&nbsp;
            {window.sessionStorage.getItem('nickname')}&nbsp;님이 로그인하셨습니다.&nbsp;&nbsp;
            <Button style={{marginRight:"1%"}} onClick={this.logout}>로그아웃</Button>
            </div>
        )
    }
}


export default Login;