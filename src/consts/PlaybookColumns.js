import React                    from 'react';
// import {EditPencil, DeleteCan}  from 'sm_shared';



const PlaybookColumns= (context) => [
  
  {
    Header: <strong>Playbook</strong>,
    accessor: "name",
    width: '100%',
    expander: true,
    Expander: ({ isExpanded, ...rest}) =>
      <div>
        {isExpanded
          ? <div  style={{"backgroundColor": "#8894a1"}}>{rest.original.name}</div>
          : <div>{rest.original.name}</div>}
      </div>,
    filterable: true

  },
  {
    Header: '',
    show: true, //this.props.isAdmin,
    filterable: false,
    width: 100,
    sortable: false,
    Cell: (row, value) => {
      if(row.original.id !== 'unassigned' && context.props.isAdmin){
        return(
          <div>
           
          </div>
        )
      }
    }, 
    className:"text-center"
  }
]  

export default PlaybookColumns;