import {Component} from 'react';
import Background from '../img/hotel.jpg';
import axios from 'axios';

class JoinPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            pw : '',
            r_pw : '',
            email : '',
            e_msg : '',
            t_msg : ''
        }
    }

    sendBackend(){
        axios.post('http://localhost:5000/user/inquiry',{
            id : this.state.id
        })
        .then(res=>{
            if(res.data === 1){
                this.setState({e_msg : '이미 존재하는 아이디입니다.'});
                return false;
            }else{
                if(this.state.pw !== this.state.r_pw){
                    alert('비밀번호가 일치하지 않습니다.');
                    return false;
                }
                axios.post('http://localhost:5000/user/join',{
                    id : this.state.id,
                    pw : this.state.pw,
                    email : this.state.email
                })
                .then(res=> {
                    alert('회원가입에 성공하였습니다.');
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })        
            }
        })
    }

    join = (e) => {
        e.preventDefault();
        this.sendBackend();
    }

    TextChange = (e) => {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    render(){

        return(
        <div className='container' style={{textAlign:'center',backgroundImage:`url(${Background})`}}>
        <br/><br/><br/>
        <form onSubmit={this.join}>
            <h3 style={{color:"white"}}>회원가입</h3>
            <br></br>
            <p style={{color:'red'}}>{this.state.e_msg}</p>
            <p style={{color:'green'}}>{this.state.t_msg}</p>
            <div className="form-group">
                <label style={{color:"white"}}>UserID : &nbsp;&nbsp;</label>
                <input type="text" style={{width:"300px"}} name="id" value={this.state.id} onChange={this.TextChange}  placeholder="Enter your id" />
            </div>
            <div className="form-group" style={{marginRight:'18px'}}>
                <label style={{color:"white"}}>Password : &nbsp;&nbsp;</label>
                <input type="password" name="pw" value={this.state.pw} onChange={this.TextChange} style={{width:"300px"}} placeholder="Enter your password" />
            </div>
            <div className="form-group" style={{marginRight:'35px'}}>
                <label style={{color:"white"}}>(R)Password : &nbsp;&nbsp;</label>
                <input type="password" name="r_pw" value={this.state.r_pw} onChange={this.TextChange} style={{width:"300px"}} placeholder="Enter your password" />
            </div>
            <div className="form-group"  style={{marginLeft:'18px'}}>
                <label style={{color:"white"}}>Email : &nbsp;&nbsp;</label>
                <input type="email" name="email" value={this.state.email} onChange={this.TextChange} style={{width:"300px"}} placeholder="Enter your Email" />
            </div>
            <button type="submit" style={{width:"100px",marginRight:'10px'}} className="btn btn-dark ">회원가입</button>
        </form>

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        )
    }
}

export default JoinPage;