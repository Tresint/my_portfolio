import React,{Component} from 'react';
import Login from './Login';
import N_login from './N_login';
import axios from 'axios';

 class BtnGroup extends Component{

    constructor(props){
        super(props);
        this.state ={
            value : 1
            }
        }

        componentDidMount(){
            if(window.sessionStorage.getItem('token') !== null){
                this.setState({
                    value : 2
                })
            }
        }

   render() {
    var value = this.state.value;
    return(
        <>
        {
            (function(){
                if(value === 1){
                    return <N_login/>
                }else{
                    return <Login/>
                }
            })()
        }
        </>
    )
   }
}

export default BtnGroup;