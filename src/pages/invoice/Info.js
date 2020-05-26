import React from 'react';

function Info(props) {
    const { label, data } = props;
    var address = "";
    if(data.address){
        address = "Address :"+data.address; 
    }
    return (
        <div className="col-sm-3 invoice-col">
            {label}
            <address>
                <strong>{data.name}</strong><br />
                        Phone: {data.mobile}<br />
                        Email: {data.email} <br />
                        {address}
            </address>
        </div>
    );
}

export default Info;