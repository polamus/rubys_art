import React, { Component } from 'react';
import { Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Api from '../api/Api';


export default class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.dataSubmit = this.dataSubmit.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleButton() {
    return ("hello")  
  }
 
  render() {
    return (

      <div>

        <h1>this.state.data</h1>

      </div>
      
    );
  }
}