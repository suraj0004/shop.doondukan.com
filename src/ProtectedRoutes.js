import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from './services/AuthService';
export const ProtectedRoutes = ( {component: Component, ...rest} ) => {
    // Auto close sidebar while navigation
    document.body.classList.remove('sidebar-open');
    document.body.classList.add('sidebar-closed');
    document.body.classList.add('sidebar-collapse');
    return(
      <Route  {...rest} render={
          (props) => {
              if(auth.isAuthenticated()){
                return <Component  {...props} />
              }else{
                   return <Redirect to={
                       {
                           pathname : '/login',
                           state : {
                               from : props.location
                           }
                       }
                   } />
              }
           
          }
      } />
    );
}
