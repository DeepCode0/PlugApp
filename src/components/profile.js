import React from "react";
import 'antd/dist/antd.css';
import { auth } from '../firebase/firebase.utils';
import { getDatabase, ref, set , onValue } from "firebase/database";
import axios from "axios";
import Card__ from "./cars_new";
import { Card, Avatar } from 'antd';
import { LikeFilled,LikeOutlined,DislikeFilled, DislikeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
const database = getDatabase();
const { Meta } = Card;
const { Grid } = Card;
export default class EditStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={status : ''}
    }
    writeUserData(userId) {
        const db = getDatabase();
        set(ref(db, 'deep_users/' + userId +'/status'),this.state.status);
      }
    render(){
        // alert(this.props.current_user_data.status)
        
        return(
            <div>
               
                <div style={{margin: "auto",width: "35%",padding: "10px"}}>
                <h1>Your Profile : </h1>
                <Card
      style={{ width: 300,borderWidth:"6px"}}
      cover={
        <img
          alt="example"
          src={this.props.current_user_data.profile_picture}
        />
      }
      size={"small"}
    >
      <Meta title={this.props.current_user_data.username} description={this.props.current_user_data.status} />
    </Card>
                
            
            <div style={{margin:'1rem'}} >
                    <textarea style={{width : '60%'}} placeholder="Change your status" value={this.state.status} onChange={(e)=>{
                        this.setState({status : e.target.value})
                    }} /><br/>
                    <button className="update" onClick={(e)=>{
                        e.preventDefault()
                        this.writeUserData(this.props.cid)
                    }} >Update status</button>

            </div>
            </div>
            <hr></hr>
            <h1>Users : </h1>
            </div>
        )
    }
}