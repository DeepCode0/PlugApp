// App.js
import React from 'react';
import './App.css';
import Home_Page from './components/homepage';
import { signInWithGoogle } from './firebase/firebase.utils';
import { auth } from './firebase/firebase.utils';
import Header from './components/Header';
import { getDatabase, ref, set,  child, get  } from "firebase/database";
import axios from 'axios';
import firebase from 'firebase/compat/app';
const database = getDatabase();
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null,
      email : 'x',
      password : 'x'
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log('city')
      if(user)
      this.setState({ currentUser: user });
      else
      this.setState({ currentUser: user ,email:'x',password:'x'});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  writeUserData(userId, name, email, imageUrl,like,dislike,bookmark,liked,disliked,bookmarked_by) {
    const db = getDatabase();
    set(ref(db, 'deep_users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl,
      like : like,
      dislike : dislike,
      bookmark : {"userid" : "abcd"},
      liked : {"userid": "abcd"},
      disliked : {"userid":"abcd"},
      bookmarked_by : {"userid":"abcd"},
      status:"Hi there I am using this app"
    });
  }
  login_with_email_pass(email,password,name,img_url){
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    
    this.writeUserData(user.uid,name,user.email , img_url ,0,0,0,0,0,0)
    firebase.auth().signInWithEmailAndPassword(email, password)
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
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  

  }

  render() {
    if (this.state.currentUser||(this.state.email!='x'&&this.state.password!='x'))
    {
      // console.log("hello")
      
      return (
        <Home_Page email={this.state.email} password={this.state.password}/>
      );
    }
    else{
      console.log(localStorage.getItem("email"))
      console.log(localStorage.getItem("password"))

      if((localStorage.getItem("email"))&&(localStorage.getItem("password"))){
      return (
        <div className='user-info'>
          <Header/>

              <div style={{textAlign:"center", padding : "10rem"}}>
              <button onClick={(e)=>{signInWithGoogle().then((user)=>{
                console.log(user);
      //           localStorage.removeItem('email');
      // localStorage.removeItem('password');
                const dbRef = ref(getDatabase());
get(child(dbRef, `deep_users/${user.user.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val())
    const db = getDatabase();
        set(ref(db, 'deep_users/' + '/'+user.user.uid+'/' + '/bookmark/' + 'userid'),Date.now());
  } else {
    this.writeUserData(user.user.uid , user.user.displayName , user.user.email,  user.user.photoURL , 0,0,0,0,0,0)
    
  }
}).catch((error) => {
  console.error(error);
});


               
                
              })}} style={{borderRadius: "12px" , backgroundColor:"White", padding:"10px"}}><img src="https://img.icons8.com/color/16/000000/google-logo.png"></img>  SIGN IN USING GOOGLE</button>
              <br/><br/>
              <button onClick={(e)=>{
                e.preventDefault()
                axios.get("https://randomuser.me/api/").then((data)=>{
                  console.log(data.data['results'][0]['email'])
                this.login_with_email_pass(data.data['results'][0]['email'],data.data['results'][0]['login']['password'],data.data['results'][0]['name']['first']+" "+data.data['results'][0]['name']['last'],data.data['results'][0]['picture']['medium'])
                
                localStorage.setItem('email', data.data['results'][0]['email'])
                localStorage.setItem('password', data.data['results'][0]['login']['password'])
                }).catch((err)=>{

                })

              
              }}  style={{borderRadius: "12px" , backgroundColor:"White", padding:"10px"}}>SIGN IN ANONYMOUSLY</button>

              <br></br>
              <br></br>
              
              <button onClick={(e)=>{
                e.preventDefault()
                const emails = localStorage.getItem("email");
                const passwords = localStorage.getItem("password");
                console.log(emails)
                console.log(passwords)
                if(emails&&passwords) {
                  this.setState({email: emails, password:passwords})
                  
  
                }
              //   else{
              //   axios.get("https://randomuser.me/api/").then((data)=>{
              //     console.log(data.data['results'][0]['email'])
              //   this.login_with_email_pass(data.data['results'][0]['email'],data.data['results'][0]['login']['password'],data.data['results'][0]['name']['first']+" "+data.data['results'][0]['name']['last'],data.data['results'][0]['picture']['medium'])
                
              //   localStorage.setItem('email', data.data['results'][0]['email'])
              //   localStorage.setItem('password', data.data['results'][0]['login']['password'])
              //   }).catch((err)=>{

              //   })

              // }
              }}  style={{borderRadius: "12px" , backgroundColor:"White", padding:"10px"}}>SIGN IN ANONYMOUSLY USING LAST ANONYMOUS PROFILE</button>

              </div>
        </div >
      );
            }
            else{
              return (
                <div className='user-info'>
                  <Header/>
        
                      <div style={{textAlign:"center", padding : "10rem"}}>
                      <button onClick={(e)=>{signInWithGoogle().then((user)=>{
                        console.log(user);
              //           localStorage.removeItem('email');
              // localStorage.removeItem('password');
                        const dbRef = ref(getDatabase());
        get(child(dbRef, `deep_users/${user.user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val())
            const db = getDatabase();
                set(ref(db, 'deep_users/' + '/'+user.user.uid+'/' + '/bookmark/' + 'userid'),Date.now());
          } else {
            this.writeUserData(user.user.uid , user.user.displayName , user.user.email,  user.user.photoURL , 0,0,0,0,0,0)
            
          }
        }).catch((error) => {
          console.error(error);
        });
        
        
                       
                        
                      })}} style={{borderRadius: "12px" , backgroundColor:"White", padding:"10px"}}><img src="https://img.icons8.com/color/16/000000/google-logo.png"></img>  SIGN IN USING GOOGLE</button>
                      <br/><br/>
                      <button onClick={(e)=>{
                        e.preventDefault()
                        axios.get("https://randomuser.me/api/").then((data)=>{
                          console.log(data.data['results'][0]['email'])
                        this.login_with_email_pass(data.data['results'][0]['email'],data.data['results'][0]['login']['password'],data.data['results'][0]['name']['first']+" "+data.data['results'][0]['name']['last'],data.data['results'][0]['picture']['medium'])
                        
                        localStorage.setItem('email', data.data['results'][0]['email'])
                        localStorage.setItem('password', data.data['results'][0]['login']['password'])
                        }).catch((err)=>{
        
                        })
        
                      
                      }}  style={{borderRadius: "12px" , backgroundColor:"White", padding:"10px"}}>SIGN IN ANONYMOUSLY</button>
        
                      </div>
                </div >
              );
            }
    }
    
  }
}


export default App;
