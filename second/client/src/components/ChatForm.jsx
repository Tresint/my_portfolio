import {Component} from 'react';
import {socket} from '../service/Socket';


class ChatForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            nickname : '익명',
            message : ''
        }
    }

    componentDidMount(){
        if(window.sessionStorage.getItem('nickname') !== null){
            this.setState({
                nickname : window.sessionStorage.getItem('nickname')
            })
        }   
    }
    componentWillUnmount(){
        socket.close();
    }

    messageChange = (e) => {
      let nextState={};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    send = (e) => {
    e.preventDefault();
    if(this.state.message === ''){
        alert('채팅을 입력하세요.');
        return false;
    }
    socket.emit('chat-msg',{
    nickname : this.state.nickname,
    message : this.state.message
     })
     this.setState({message:''})
    }

    render(){
       
        return(
            <div className="panel-footer">
            <form>
              <div className="input-group">
                <input type="text" required className="form-control" name="message" value={this.state.message} onChange ={this.messageChange} placeholder="채팅을 입력하세요." />
                &nbsp;<span className="input-group-btn">
                  <button className="btn btn-primary" onClick={this.send}>보내기</button>
                </span>
              </div>
            </form>
          </div>
        )
    }
}


export default ChatForm;