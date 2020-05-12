import React from 'react';

function PageLoader(props) {
  const style = {
               position: 'fixed',
               top: '0px',
               left: '0px',
               bottom: '0px',
               right: '0px',
               background: 'black',
               zIndex: 9999999,
               opacity: 0.8,
               textAlign: 'center',
               paddingTop: '23%',
           };
           
    return (
        (props.isLoader)
        ?<div style={style}>
          <div class="spinner-border text-light" role="status" >
             <span class="sr-only">Loading...</span>
         </div>
       </div>
       :<div></div>
    );
}

export default PageLoader;