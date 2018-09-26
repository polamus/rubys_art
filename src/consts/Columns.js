import React from 'react';

const Columns = (context) => [
    
      
      {
        Header: '',
        show: context.props.isAdmin,
        filterable: false,
        Cell: (row) => (
                  <div>
                      <span> <i className="fa fa-pencil fa-lg" title="Edit" style={{"color":"#F3B24D"}} onClick={context.openModal.bind(this,row)}></i></span>
                     <span> <i className="fa fa-trash-o fa-lg" title="Delete" onClick={context.openModal.bind(this,row)} ></i></span>
                  </div>
                  ),
        className:"text-center"
      },

      {
        Header: 'MerchGroup',
        accessor: 'groupnm'
      }
    ] 

export default Columns;
