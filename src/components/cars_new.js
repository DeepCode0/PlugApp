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
import { getDatabase, ref, set , onValue } from "firebase/database";
const { Meta } = Card;
const database = getDatabase();

export default class Card__ extends React.Component{
    constructor(props){
        super(props)
    }
    
    writeUserDataLiked(userId, cuid) {
      const db = getDatabase();
      set(ref(db, 'deep_users/' + userId+'/liked/'+cuid),"abcd");
      set(ref(db, 'deep_users/' + userId+'/disliked/'+cuid),null);
    }
    writeUserDataDisliked(userId, cuid) {
      const db = getDatabase();
      set(ref(db, 'deep_users/' + userId+'/disliked/'+cuid),"abcd");
      set(ref(db, 'deep_users/' + userId+'/liked/'+cuid),null);
    }
    writeUserDataBookmark(userId, cuid) {
      const db = getDatabase();
      set(ref(db, 'deep_users/' + userId+'/bookmarked_by/'+cuid),"abcd");
      set(ref(db, 'deep_users/' + cuid+'/bookmark/'+userId),"abcd");
    }
    updateUserData(userId, cuid, action) {
      const db = getDatabase();
      set(ref(db, 'deep_users/' + userId+action+cuid),null);
    }
    updateUserDataBookmark(userId, cuid, action) {
      const db = getDatabase();
      set(ref(db, 'deep_users/' + userId+action+cuid),null);
      set(ref(db, 'deep_users/' + cuid+'/bookmark/'+userId),null);
    }
    
    
render(){
    let arr = []
    if(this.props.is_liked)
    arr.push(<div><LikeFilled onClick={(e)=>{
      this.updateUserData(this.props.userId,this.props.cuid,'/liked/')
    }} style={{color:"blue"}}/> <span>{this.props.likecount-1}</span></div>)
    else
    arr.push(<div><LikeOutlined onClick={(e)=>{
      this.writeUserDataLiked(this.props.userId,this.props.cuid)
    }} /> <span>{this.props.likecount-1}</span></div> )
    if(this.props.is_disliked)
    arr.push(<div><DislikeFilled onClick={(e)=>{
      this.updateUserData(this.props.userId,this.props.cuid,'/disliked/')
    }} style={{color:"blue"}}/> <span>{this.props.dislikecount-1}</span></div>)
    else
    arr.push(<div><DislikeOutlined onClick={(e)=>{
      this.writeUserDataDisliked(this.props.userId,this.props.cuid)
    }} /> <span>{this.props.dislikecount-1}</span></div>)
    if(this.props.is_bookmarked)
    arr.push(<StarFilled onClick={(e)=>{
      this.updateUserDataBookmark(this.props.userId,this.props.cuid,'/bookmarked_by/')
    }} style={{color:"yellow"}}/>)
    else
    arr.push(<StarOutlined onClick={(e)=>{
      this.writeUserDataBookmark(this.props.userId,this.props.cuid)
    }} />)

    return(
        <Card
    style={{ width: 300 ,borderWidth:"6px"}}
    cover={
      <img
        alt="example"
        src={this.props.img_url}
      />
    }
    actions={arr}
  >
    <Meta
      title={this.props.name}
      description={this.props.status}
    />
  </Card>
    )

}
}