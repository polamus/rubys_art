        {this.state.newModal &&
          <DeleteModal showDeleteModal={this.state.newModal}
            rowNum={this.state.reqItem.original.id}
            handleCloseModal={this.handleCloseDeleteModal}
            confirmDelete={this.deletePlaybook} 
            authToken={this.props.authToken}
          />
        }
