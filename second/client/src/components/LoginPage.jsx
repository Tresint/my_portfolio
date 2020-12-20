import {Component} from 'react';
import Background from '../img/hotel.jpg';
import axios from 'axios'
import {withRouter} from 'react-router-dom';
class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : '',
            pw : '',
            msg : '',
            token : ''
        }
    }
    naver_login(){
        axios.get('http://localhost:5000/user/naverlogin')
        .then(res=>{
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/user/login',{
            id : this.state.id,
            pw : this.state.pw
        })
        .then(res => {
            if(res.data === 0){
                this.setState({
                    msg : '아이디가 존재하지 않습니다.'
                })
            }else if(res.data === 2){
                this.setState({
                    msg : '비밀번호가 일치하지 않았습니다.'
                })
            }else{
            console.log(res);
            const {token, user_id} = res.data;
            window.sessionStorage.setItem('nickname',user_id);
            window.sessionStorage.setItem('token',token);
            window.location.href = '/home';
        }
        })
        .catch(err => {
            console.log(err);
        })
    }    

    TextChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){

        return(
        <div className='container' style={{textAlign:'center',backgroundImage:`url(${Background})`}}>
        <br/><br/><br/><br/><br/><br/><br/>
        <form onSubmit={this.login}>
            <h3 style={{color:"white"}}>로그인</h3>
            <br></br>
            <div className="form-group">
                <p style={{color:"red"}}>{this.state.msg}</p>
                <label style={{color:"white"}}>UserID : &nbsp;&nbsp;</label>
                <input type="text" style={{width:"300px"}} name="id" value={this.state.id} onChange={this.TextChange}  placeholder="Enter your id" />
            </div>
            <div className="form-group" style={{marginRight:'18px'}}>
                <label style={{color:"white"}}>Password : &nbsp;&nbsp;</label>
                <input type="password" style={{width:"300px"}} name="pw" value={this.state.pw} onChange={this.TextChange} placeholder="Enter your password" />
            </div>
            <button type="submit" style={{width:"100px",marginRight:'10px'}} className="btn btn-dark ">로그인</button>
        </form>
       
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        )
    }
}

export default withRouter(LoginPage);