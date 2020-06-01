import React from 'react';
import Pagination from 'react-js-pagination';
import Card from './Card';
function PaginatedData(props) {

    var { data, current_page, per_page, total } = props.data;

    const cards =   data.map((bill) => {
        return <Card key={bill.id} bill={bill} />
    });
    return (
        <div className="card card-solid">
            {
                (props.response !== '')
                ?<h5 className="text-danger text-center mt-3"> {props.response}</h5>
                :null
            }
            <div className="card-body pb-0">
                <div className="row d-flex align-items-stretch">

                    {
                      (props.response === "")
                      ? cards
                      :null
                    }

                </div>
            </div>

            <div className="card-footer">
                <nav aria-label="Contacts Page Navigation">
                    <Pagination
                        activePage={current_page}
                        itemsCountPerPage={per_page}
                        totalItemsCount={total}
                        onChange={(pageNumber) => props.getBills(pageNumber)}
                        innerClass="pagination justify-content-center m-0"
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </nav>
            </div>
        </div>
    );
}

export default PaginatedData;