import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function Table(props) {
    const data = props.data ? props.data : [];

    return (
        <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Weight</th>
      <th scope="col">Added On</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {
          data.map((row,index) => {
              const status = row.deleted_at?<span className="badge badge-success">Moved to Primary</span>:<span className="badge badge-warning">Added to Custom Product List</span>;
              return (
                <tr key={(row.id).toString()}>
                <th scope="row"> {index + 1} </th>
                <td>{ row.name }</td>
                <td>  {row.weight + " " + row.weight_type} </td>
                <td>   <Moment 
                     local
                     format="D MMM, YYYY h:mm a"
                        date={ row.created_at }
                     /> 
                </td>
                <td>  {status} </td>
                <td> <button type="button" className="btn btn-info" onClick={() => props.showEditModal(row)}> <i className="fa fa-edit"></i> </button> </td>
              </tr>
              )
          })
      }
  
   
  </tbody>
</table>
    );
}

export default Table;