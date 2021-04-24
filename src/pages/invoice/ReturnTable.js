import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function ReturnTable(props) {
    var total = props.total;
    var discount = props.discount;
    var return_amount = 0,current_return_date = null ,previous_return_date = null ;
    const { main, temp, main_latest, temp_latest } = props;


    const main_data = main.map((row, index) => {
        return_amount += (row.price * row.quantity);
        previous_return_date = row.created_at;
        return (
            <tr key={row.id}>
                <td> {index + 1} </td>
                <td> {row.product.name + " | " + row.product.weight + row.product.weight_type + " | " + (row.product.brand ? row.product.brand.brand_name : "")} </td>
                <td> {row.quantity} Pcs. </td>
                <td> Rs. {row.price} /- per Pcs. </td>
                <td> Rs. {row.price * row.quantity} /-</td>
            </tr>
        );
    });

    const temp_data = temp.map((row, index) => {
        return_amount += (row.price * row.quantity);
        previous_return_date = row.created_at;
        return (
            <tr key={row.id}>
                <td> {index + 1} </td>
                <td> {row.temp_product.name + " | " + row.temp_product.weight + row.temp_product.weight_type + " | " + (row.temp_product.brand ? row.temp_product.brand.brand_name : "")} </td>
                <td> {row.quantity} Pcs. </td>
                <td> Rs. {row.price} /- per Pcs. </td>
                <td> Rs. {row.price * row.quantity} /-</td>
            </tr>
        );
    });



    var current_return_ammount = 0;

    const main_data_latest = main_latest.map((row, index) => {
        return_amount += (row.price * row.quantity);
        current_return_date = row.created_at;

        current_return_ammount += (row.price * row.quantity);

        return (
            <tr key={row.id}>
                <td> {index + 1} </td>
                <td> {row.product.name + " | " + row.product.weight + row.product.weight_type + " | " + (row.product.brand ? row.product.brand.brand_name : "")} </td>
                <td> {row.quantity} Pcs. </td>
                <td> Rs. {row.price} /- per Pcs. </td>
                <td> Rs. {row.price * row.quantity} /-</td>
            </tr>
        );
    });

    const temp_data_latest = temp_latest.map((row, index) => {
        return_amount += (row.price * row.quantity);
        current_return_date = row.created_at;

        current_return_ammount += (row.price * row.quantity);

        return (
            <tr key={row.id}>
                <td> {index + 1} </td>
                <td> {row.temp_product.name + " | " + row.temp_product.weight + row.temp_product.weight_type + " | " + (row.temp_product.brand ? row.temp_product.brand.brand_name : "")} </td>
                <td> {row.quantity} Pcs. </td>
                <td> Rs. {row.price} /- per Pcs. </td>
                <td> Rs. {row.price * row.quantity} /-</td>
            </tr>
        );
    });

    var data = [] ,tr;
    if(main_data.length === 0 && temp_data.length === 0 ){
      data = main_data_latest.concat(temp_data_latest);
    }else{
        tr = <tr className="text-center" > <th colSpan='5'> __________Perivous Return ( <Moment local format="D MMM, YYYY h:mm a" date={previous_return_date} /> ) __________ </th> </tr>;
        data.push(tr);
        data = data.concat(main_data);
        data = data.concat(temp_data);

        tr = <tr className="text-center" > <th colSpan='5'> __________Current Return ( <Moment local format="D MMM, YYYY h:mm a" date={current_return_date} /> ) __________ </th> </tr>;
        data.push(tr);

        data = data.concat(main_data_latest);
        data = data.concat(temp_data_latest);
    }

    console.log(main_data);

    const discount_adjustment = ((discount/total) * return_amount).toFixed(4) ;

    const current_discount_adjustment = ((discount/total) * current_return_ammount).toFixed(4) ;
    
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Return Product</th>
                                <th>Return Qty</th>
                                <th>Price ( Per Pcs )</th>
                                <th>Sub-total</th>
                            </tr>
                        </thead>
                        <tbody>

{
    data
}
                            {/* {main_data}
                            {temp_data} */}
                        </tbody>
                    </table>
                </div>

            </div>


            <div className="row">

                <div className="col-6">

                </div>

                <div className="col-6">


                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Return:</th>
                                    <td> Rs. {return_amount} /- </td>
                                </tr>
                                <tr>
                                    <th>Discount Adjustment:</th>
                                    <td> Rs. {discount_adjustment} /- </td>
                                </tr>
                                <tr>
                                    <th>Net Return ({(previous_return_date == null)?(<Moment local format="D MMM, YYYY h:mm a" date={current_return_date} />):'____________________________'}) :</th>
                                    <td> <strong> Rs. {return_amount - discount_adjustment} /- </strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>



<div style={{borderBottom : '3px dashed grey'}} ></div>

            <div className="row">



<div className="col-12">


    <div className="table-responsive">
        <table className="table">
            <tbody>
                <tr>
                    <th>Net total Amount :</th>
                    <td colSpan='2'> Rs. {total - discount} /- </td>
                
                </tr>
                <tr>
                    <th>Net Return Amount:</th>
                    <td><span style={{ padding:'5px', border: '2px solid red'}}> Rs. {return_amount - discount_adjustment} /-</span> </td>
                    <th>
                    <span style={{ padding:'5px', border: '4px dashed yellow'}}>
                    Current Net Return Amount: Rs. {current_return_ammount - current_discount_adjustment} /- 
                    </span>
                       </th>
                </tr>
                <tr>
                    <th>Final Net Bill/Total Amount (<Moment local format="D MMM, YYYY h:mm a" date={current_return_date} />) : </th>
                    <td colSpan='2'> <span style={{ padding:'5px', border: '2px solid green'}}><strong> Rs. {((total - discount) - (return_amount - discount_adjustment)).toFixed(4)} /- </strong></span>
                    </td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>

</div>
        </React.Fragment>
    );
}

export default ReturnTable;