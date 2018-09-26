import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AvForm, AvGroup, AvField} from 'availity-reactstrap-validation';


export default class CategoryFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbooks: Object.assign([], this.props.data)
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event, errors, values){
    let playbookId = values['id'];
    this.props.assignCategories(playbookId)
    this.props.handleAssignCloseModal()
  }
 
  render() {
    var playbooks = this.state.playbooks;
    playbooks.shift();
    var model={id: playbooks[0].id}
    return (
      <div>
        <Modal isOpen={this.props.showPlaybooksModal} toggle={this.props.handleAssignCloseModal} >
         <ModalHeader toggle={this.props.handleAssignCloseModal}> Assign Categories</ModalHeader>
          <ModalBody>
            <AvForm model={model} id="add_form" onSubmit={this.handleSubmit}>
            <AvField type="select" name="id" label="Select a playbook">
            {playbooks.map(function(obj, key){
              return <option key={key} value={obj.id}>{obj.name}</option>
            })}
            </AvField>
            <AvGroup className="text-right">
              <Button color="primary"> Confirm </Button>{'  '}
              <Button color="secondary" onClick={this.props.handleAssignCloseModal}> Cancel</Button>
            </AvGroup>
            </AvForm>
          </ModalBody>
        </Modal>
      </div>  
    );
  }
}