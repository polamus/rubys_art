import React         from 'react';
// import {DeleteCan}  from 'sm_shared';

const CategoriesColumns= (context) => [
  {
    Header: props => <input type = "checkbox" checked={context.state.selectAll} onClick={(e) => {context.selectAll(this)}}/>,
    accessor: '',
    width: 30,
    sortable: false,
    filterable: false,
    style: {
      textAlign: "center"
    },
    Cell: row => (
      <input type="checkbox" checked = {context.isSelected(row)} value={row.value} onChange={(e) => {
        if(context.isSelected(row)){
          context.deselectRow(row)
        }
        else {
          context.selectRow(row)
        }
      }}
      />
    )
  },
  {
    Header: '',
    accessor: "groupnum",
    maxWidth: 75 
  },
  {
    Header: <strong>Categories</strong>,
    accessor: "groupnm",
    width: '100%'
  },
  {
    Header: props => 'Remove',
    accessor: 'groupnum',
    width: 100,
    sortable: false,
    filterable: false,
    show: !context.unassignedCategorySelect(),
    style:{
      textAlign: "center"
    },
    Cell: (row, value) => {
      if(context.props.isAdmin){
       
      }
      
    }
  }
];
 
export default CategoriesColumns;