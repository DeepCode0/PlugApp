import React from "react";
import Header from "./Header";
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import { getDatabase, ref, set , onValue } from "firebase/database";
import axios from "axios";
import Card__ from "./cars_new";
import TextArea from "antd/lib/input/TextArea";
import EditStatus from "./profile";
import { Pagination } from "antd";
import firebase from 'firebase/compat/app';
const database = getDatabase();
export default class Home_Page extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUser: null,
            all_users : [],
            current_user_data_ : {},
            from : 0,
            to:0
          };
    }
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            console.log(user)
          this.setState({ currentUser: user });
          this.getData()
        });
        
        
      }
    
      componentWillUnmount() {
        this.unsubscribeFromAuth();
      }

      writeUserData(userId, name, email, imageUrl,like,dislike,bookmark, liked,disliked,bookmarked_by) {
        const db = getDatabase();
        set(ref(db, 'deep_users/' + userId), {
          username: name,
          email: email,
          profile_picture : imageUrl,
          like : like,
          dislike : dislike,
          bookmark : bookmark,
          liked : liked,
          disliked : disliked,
          bookmarked_by: bookmarked_by
        });
      }

    getData(){
        console.log('called')
        const db = getDatabase();
        const starCountRef = ref(db, 'deep_users/');
        let list_data = []
        let current_user_data = {}
        onValue(starCountRef, (snapshot) => {
            list_data = []
        const data = snapshot.val();
        // console.log(this.state.currentUser)
        if(this.state.currentUser){

            let user = this.state.currentUser.uid
            for(let val in data){
                if(val!=user){
                let obj = data[val]
                obj['uid'] = val
                list_data.push(obj)
                }
                else{
                    let obj = data[val]
                obj['uid'] = val
                current_user_data = obj
                }
            }
        
        
        
        console.log(data)
        list_data.sort((a,b)=>{
            // console.log(a)
            // console.log(data)
            if(a['uid'] in data[this.state.currentUser.uid]['bookmark']&& b['uid'] in data[this.state.currentUser.uid]['bookmark'])
            {
                if(Object.keys(b['liked']).length == Object.keys(a['liked']).length)
                return Object.keys(a['disliked']).length - Object.keys(b['disliked']).length
                return Object.keys(b['liked']).length - Object.keys(a['liked']).length 
            }
            else if(a['uid'] in data[this.state.currentUser.uid]['bookmark'])
            return -1
            else if(b['uid'] in data[this.state.currentUser.uid]['bookmark'])
            return 1
            else{
                if(Object.keys(b['liked']).length == Object.keys(a['liked']).length)
                return Object.keys(a['disliked']).length - Object.keys(b['disliked']).length
            return  Object.keys(b['liked']).length - Object.keys(a['liked']).length}
        })
        console.log(list_data)
        if(this.state.all_users.length == 0||this.state.to == 0)
        this.setState({all_users : list_data,current_user_data_:current_user_data,from:0,to:Math.min(10,list_data.length)})
        else
        this.setState({all_users : list_data,current_user_data_:current_user_data})
        // updateStarCount(postElement, data);
        // });
        }
    })
  
}

    

    render(){
    
        console.log(this.props.email)
        console.log(this.state.currentUser)

        console.log(this.state.all_users)
        if((this.state.currentUser==null)&&this.props.email!='x'&&this.props.password!='x')
        {
            console.log('hi')
            firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
  });
        }
        if(this.state.currentUser){
            let isliked = false;
            let isdisliked = false;
            let isbookmarked = false;

        return(
            <>
            <Header/>
            <EditStatus cid={this.state.currentUser.uid} current_user_data={this.state.current_user_data_}/>
            <div style={{margin: "auto",padding: "10px"}}>
                <br></br>
             <Pagination
                total={this.state.all_users.length}
                onChange={(page_no,page_size)=>{
                    console.log(page_no)
                    console.log(page_size)
                    if (page_no==0)
                    page_no = 1
                    this.setState({from:(page_no-1)*page_size,to:Math.min(page_no*page_size,this.state.all_users.length)})
                }}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} users`}
  />
  <br></br>
  <br></br>
            </div>
            <div >
            {
                this.state.all_users.slice(this.state.from,this.state.to).map((data)=>{
                    console.log(data)
                    isliked = false
                    isdisliked = false
                    isbookmarked = false
                    if(this.state.currentUser.uid in data.liked)
                    isliked = true
                    if(this.state.currentUser.uid in data.bookmarked_by)
                    isbookmarked = true
                    if(this.state.currentUser.uid in data.disliked)
                    isdisliked = true

                    return(
                        <div  style={{float : 'left' , padding : "6px"}} >
                            <Card__ name={data.username} img_url={data.profile_picture} is_liked={isliked} is_disliked={isdisliked} is_bookmarked={isbookmarked} userId={data.uid} cuid={this.state.currentUser.uid} status = {data.status} likecount = {Object.keys(data['liked']).length} dislikecount = {Object.keys(data['disliked']).length}/>
                        </div>
                    )
                })
            }
            </div>
            
            </>
        );
    }else{
        return(
            <>

            </>
        );
    }
}
}