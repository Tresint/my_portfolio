import {Component} from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import CircularProgress from '@material-ui/core/CircularProgress';


class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            review : ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/review/list')
        .then(res => {
            this.setState({
                review : res.data
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    render(){
        
        return(
            <div className="container">
                <h1>최신 리뷰 모아보기</h1>
                <br/><hr></hr>
                {
                    this.state.review ? this.state.review.map(k =>{
                        return(<ReviewForm
                            key ={k.key}
                            nickname = {k.nickname}
                            comment = {k.comment}
                            />)
                    }) : <div style={{textAlign:"center",marginTop:"20%"}}><CircularProgress/></div>
                }
            </div>

        )
    }
}

export default Review;