import {Component} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import {Comment} from 'antd';
class ReviewForm extends Component{

    

    render(){

        const {Text} = Typography;
        return(
            <div className="container">
                  <Comment
                    author={<p style={{margin:"10px"}}><b>{this.props.nickname} 님</b></p>}
                    avatar={<UserOutlined/>}
                    content={<p><Text mark>후기</Text>
                        <br/><br/>{this.props.comment}</p>}/>
            <div style={{fontSize:'10px',textAlign:"right"}}>
                <span><a href='https://pcmap.place.naver.com/place/12159697/review/visitor?entry=pll&from=map&ts=20201214'>댓글 더 보러가기</a></span>
            </div>
            <hr></hr>
            </div>
        )
    }
}

export default ReviewForm;