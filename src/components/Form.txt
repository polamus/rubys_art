import React, { Component } from 'react';
import { Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import _debounce from 'lodash.debounce';
import Api from '../api/Api';


export default class CategoryFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
			playbookExists: false
    }
    this.dataSubmit = this.dataSubmit.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
  }

  dataSubmit() {

    if(this.props.rowNum < 0) {
      Api.create(this.props.authToken, this.state.data)
				.then((response) => {
					if(response.errors) {
						throw(response.errors)
					}
          this.props.updateData(this.props.rowNum, this.state.data);
					this.props.handleCloseModal();				
				})
        .catch((e) => {
					this.setState({
						playbookExists: true
					});
				});
    } else {
       Api.edit(this.props.authToken, this.state.data)
				.then(() => {
          this.props.updateData(this.props.rowNum, this.state.data);
					this.props.handleCloseModal();					
				})
      .catch((e) => console.log(e));
    }
  }

  handleValidSubmit(event, values) {
    this.setState({data: values});
    this.dataSubmit();
  }

   handleSubmit(event, errors, values) {
		 console.log(errors)
    this.setState({errors, data: values, playbookExists: false});
  }
	
  validate = _debounce((value, ctx, input, cb) => {
    // cancel pending 'network call'

    clearTimeout(this.timeout);
		if(this.state.playbookExists){
			cb('Playbook already exists!');
			this.setState({playbookExists: false})
		} else {
			cb(true);
		}
    
  }, 200);
 
  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.handleCloseModal} >
          <ModalHeader toggle={this.props.handleCloseModal} >{this.props.rowNum < 0 ? "Add" : "Update"} {this.props.type}</ModalHeader>
          <ModalBody>
            <AvForm id="add_form" onValidSubmit={this.handleValidSubmit} onSubmit={this.handleSubmit}>
               <AvGroup row>
                <Label for="name" md={4} className="text-right small">Name</Label>
                <Col md={8}>
                  <AvInput type="hidden" name="id" value={this.state.data.id}/>
                  <AvField type="text" name="name" validate={{async: this.validate, pattern: {value: /(?!^\d+$)^.+$/, errorMessage: 'Invalid name'}}} value={this.state.data.name} required maxLength="30"/>
                 	
                </Col>
              </AvGroup>
              <AvGroup row>
                <Label for="Playbook_type" md={4} className="text-right small">Description</Label>
                <Col md={8}>
                  <AvInput type="text" name="description" value={this.state.data.description}  required maxLength="30"/>
                  <AvFeedback>Required</AvFeedback>
                </Col>
              </AvGroup>
              <AvGroup className="text-right">
                <Button color="primary">Save</Button>{' '}
                <Button color="secondary" onClick={this.props.handleCloseModal}>Cancel</Button>
              </AvGroup>
            </AvForm>
          </ModalBody>
          
        </Modal>
      </div>  
    );
  }
}