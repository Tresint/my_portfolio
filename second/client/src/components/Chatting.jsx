import {Component} from 'react';
import {socket} from '../service/Socket';
import ChatForm from './ChatForm';
import Clock from 'react-live-clock'
import '../css/chat.css';




class Chatting extends Component{

    constructor(props){
        super(props);
        this.state = {
           logs : []
        }
    }

    componentDidMount() {
        socket.on('chat-msg',(obj) => {
            const logs2 =this.state.logs
            obj.key = 'key_' + (this.state.logs.length + 1)
            console.log(obj);
            console.log(this.state.logs);
            console.log(logs2);
            logs2.unshift(obj)
            this.setState({logs : logs2})
        })
    }

    render(){

        const messages = this.state.logs.map(k => (
        
            <div key={k.key}>
            <p>&nbsp;{k.nickname} : {k.message}</p>
            </div>
            ))
        return(
            <div style={{textAlign:"center", margin:"15%"}} style={{backgroundColor:"white"}}>
            <br/>
            <div className="col-md-7 col-xs-12 col-md-offset-6">    
                <div className="panel" id="chat">
            <div className="panel-heading">
              <h3 className="panel-title">
                실시간 채팅&nbsp;&nbsp;&nbsp;
                (현재시간 : <Clock format={'HH:mm:ss'} ticking={true}/>&nbsp;) 
              </h3>
              <br/>
              <p>실시간으로 사용자들과 소통을 해보세요!</p>
              <hr/>
            </div>
            <br/>
            </div>
            <div style={{border:'1px solid',borderRadius:'10px',overflow:'auto',width:'100%',height:'400px'}} >
            {messages.reverse()}
            </div>
            <br/>
             <ChatForm/>
            </div>
            </div>
        )
    }
}


export default Chatting;