import React, { Component } from 'react';
import { Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Api from '../api/Api';


export default class CategoryFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }


  handleValidSubmit() {
     let playbookId = this.props.rowNum.original.id
     debugger
     Api.delete(this.props.authToken, playbookId)
        .then(
/**  Check response for errors, if no errors call this method **/
          this.props.updateDeleteData.bind(this, this.props.rowNum, this.state.data)
        )
        .catch((e) => console.log(e));

      this.props.handleCloseModal()

}
 
  render() {
    return (
      <div>
        <Modal isOpen={this.props.newModal} toggle={this.props.handleCloseModal} >
          <ModalHeader toggle={this.props.handleCloseModal} >Are you Sure</ModalHeader>
          <ModalBody>
            <AvForm id="add_form" onValidSubmit={this.handleValidSubmit} onSubmit={this.handleSubmit}>
              
              <AvGroup className="text-right">
                <Button color="primary" onClick={this.handleValidSubmit}>Confirm</Button>{' '}
                <Button color="secondary" onClick={this.props.handleCloseModal}>Cancel</Button>
              </AvGroup>
            </AvForm>
          </ModalBody>
          
        </Modal>
      </div>  
    );
  }
}