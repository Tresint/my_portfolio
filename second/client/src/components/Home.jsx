import {Component} from 'react';

class Home extends Component{

    render(){

        return(
            <>
            <div style={{marginLeft:"5%"}}>
            <br></br>
            <h1>호텔 소개사이트</h1>
            <br/><hr></hr>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9400527496477!2d127.00397281564774!3d37.556476132461114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2ed7f0d9e75%3A0x49ec999d2ee31371!2z7Iug65287Zi47YWUIOyEnOyauA!5e0!3m2!1sko!2skr!4v1607764148864!5m2!1sko!2skr" title="map" width="600" height="400" frameBorder="0"  allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            <br></br>
            <hr></hr>
            <h2>개요</h2>
            <p>신라호텔은 남산이 있는 동대입구역에 위치하고 있습니다.<br></br>
            정확한 주소는 <b>서울특별시 중구 장충동 동호로 249번지</b>에 위치하고 있습니다.<br></br>
            남산을 잘 아시는 분이라면 1,2번 출구에 나오자마자 바로 보실 수 있는 걸 아실테고, 모르시는 분이라도
            위에 지도를 보고 잘 찾아오시면 쉽게 찾으실 수 있습니다.
            </p>
            </div>
            </>
        )   
    }
}


export default Home;