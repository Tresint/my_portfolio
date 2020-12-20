import {Component} from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import {socket} from '../service/Socket';

class N_login extends Component{

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

    render(){

        return(
            <div style={{textAlign:"right"}}>
            (현재 접속자 수 :  &nbsp; {this.state.users} &nbsp;명)&nbsp;&nbsp;
            <Button style={{marginRight:"1%"}}><Link to='/login'>로그인</Link></Button>
            <Button style={{marginRight:"1%"}}><Link to='/register'>회원가입</Link></Button>
            </div>
        )
    }
}


export default N_login;