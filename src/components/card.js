import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Card, Avatar } from 'antd';
import './header.css'
import { LikeFilled,LikeOutlined,DislikeFilled, DislikeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import {AiFillLike} from 'react-icons/ai'
import {AiFillDislike} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
const { Meta } = Card;

export default class Card_ extends React.Component{
    constructor(props){
        super(props)
    }
    
render(){
    let like_color,discolor,star_color
    if(this.props.isliked == true)
    like_color = "blue"
    else
    like_color = "black"
    if(this.props.isdislike == true)
    discolor = "blue"
    else
    discolor = "black"
    if(this.props.isstared == true)
    star_color = "blue"
    else
    star_color = "black"
    return(
        <div className="card" >
            <img src={this.props.img_url} style={{borderRadius:'1rem'}} ></img>
            <h3>{this.props.name}</h3>
            <p>{this.props.status}</p>
            <button style={{width : '6rem' , float : 'left' , border:'none',color:like_color}} ><AiFillLike size="2rem"  /></button>
            <button style={{width : '6rem' , float : 'left',position:'relative',left:'85px',top:'-30px',border:'none',color:discolor}} ><AiFillDislike size="2rem" /></button>
            <button style={{width : '6rem' , float : 'left',position:'relative',left:'180px',top:'-62px',border:'none',color:star_color}} ><AiFillStar size="2rem" /></button>
        </div>
    )

}
}