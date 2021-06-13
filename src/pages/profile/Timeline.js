import React from 'react';

function Timeline(props) {
    return (
        <div className="timeline timeline-inverse">
                      
                      <div className="time-label">
                        <span className="bg-danger">
                          Today: 21 May, 2020
                        </span>
                      </div>
                      
                      
                      <div>
                        <i className="fas fa-arrow-right bg-primary"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 12:05</span>

                          <h3 className="timeline-header"><span>Maggie | 100gm | Nestly </span>purchased 200 pcs @ Rs 10 /- per pic. </h3>

                        
                         
                        </div>
                      </div>
                      
                      
                      <div>
                        <i className="fas fa-user bg-info"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 5 mins ago</span>

                          <h3 className="timeline-header border-0"><span>#DoonDukan-19287</span> Bill Generated
                          </h3>
                        </div>
                      </div>
                      
                      
                 
                      
                      
                   
                      
                      <div>
                        <i className="far fa-clock bg-gray"></i>
                      </div>
                    </div>
    );
}

export default Timeline;