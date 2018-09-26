import React, { Component } from 'react';
// import 'font-awesome/css/font-awesome.min.css';
// import {Header}  from 'sm_shared'; 
// import {Footer}  from 'sm_shared'; 


//* ========= Your Code Here ========= 
import ListContainer     from './containers/ListContainer';


//* ================================== 

class App extends Component {
  constructor() {
    super()
    this.state = {
      authToken: '',
      isAdmin: false
    }
  }
  
  //* NEED ADD CALL TO API TO GET APP PERMISSIONS
  componentWillMount() {
    let storage = window.localStorage 
    
    if (storage !== undefined && storage.smuser !== undefined) {
      this.setState({
        authToken: storage.smtoken
      })
      this.checkAdmin()
    }
  }
  
  checkAdmin() {
    let appId = ['isAdmin'];
    let isAdmin = appId && appId.length && appId.indexOf('isAdmin') !== -1
    this.setState({
      isAdmin: isAdmin
    })
  }
  
  render() {
    let pageStyle = { padding: "20px 20px 0px 20px" };

    return (
      <div className="App">
        <div style={pageStyle} >
{/* ========= Your Code Here ========= */}
        <ListContainer authToken={'ewrafsdfsdgegrgsdkvjkdfjgserjgesgre'} isAdmin={true}/>
{/* ================================== */}
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

export default App;
