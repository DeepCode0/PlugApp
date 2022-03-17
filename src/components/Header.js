import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiOutlined } from '@ant-design/icons'
import { auth } from '../firebase/firebase.utils';
import './header.css'
class Header extends React.Component
{
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
    
  }
  render()
  {
    if(this.state.currentUser){
    return (
      <nav style={{backgroundColor:'green'}} class="navbar navbar-expand-sm " id="navbar">
      
      <h2 style={{color :"white",marginLeft : '1rem'}}>Plug</h2>
      <ApiOutlined style= { {color: "white"}} />
      <h1 id="names"> </h1>
      <button id="logout" onClick={() => auth.signOut()}>logout</button>
      
    </nav>
      
    )
    }else{
      return(
      <nav style={{backgroundColor:'green'}} class="navbar navbar-expand-sm " id="navbar">
      
      <h2 style={{color :"white",marginLeft : '1rem'}}>Plug</h2>
      <ApiOutlined style= { {color: "white"}} />
      <h1 id="names"> </h1>
      </nav>
      )
    }
  }
}
export default Header;