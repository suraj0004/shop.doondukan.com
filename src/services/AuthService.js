import axios from 'axios';
import CookieService from './CookieService';
import UrlService from './UrlService';

class AuthService {
   constructor(){
       const token = CookieService.get('token');
       if(token === undefined){
        this.authenticated = false;
       }
       else{
        this.authenticated = true;
        this.isValidToken( (res) => {
            this.authenticated = !res;
            if(this.authenticated  === false){
                this.afterLogout();
            }
        } );
       }
       
   }

    login(postData,callback){
       
       try {
            axios.post( UrlService.loginUrl() , postData, {
                headers : {
                  "Accept" : "application/json",
                  "Content-Type" : "application/json",

                }
            })
            .then( (response) => {
                
                 callback(response.data);

            } )
            .catch( (error) => {
              console.log(error);
                callback(error.response.data);
                
            } );
          
       } catch (error) {
        console.log(error);
           callback( {success: false, message: error.message } );
       }
       
   }

   afterLogin(response, remember){
       var options;
       if(remember){

            let date = new Date();
            const expiryAfterDays = 7;
            date.setTime( date.getTime()  + ( 1000 * 60 * 60 * 24 * expiryAfterDays) );
            options = { path : '/',expires : date };
         
       }else{
            options = { path : '/' };
       }
       console.log(response)
       CookieService.set('token',response.data.accessToken,options);
       CookieService.set('name',response.data.name,options);
       const image = response.data.id + '/' +response.data.image;
       CookieService.set('image',image,options);
       this.authenticated = true;
       return true;
   }

   logout(cb){
       try {
        
           axios.post( UrlService.logoutUrl() ,{} ,{
               headers : this.apiHeader()
           })
           .then( (res) => {
            // console.log(res.data);

            if(res.data.success){
               cb(true);
            }else{
               cb(false);
            }
            
           })
           .catch( (err) => {
               console.log(err.response.data);

               if(err.response.data.message === "Unauthenticated."){
                   cb(true);
               }
               else{
                  cb(false);
               }
           } )
       } catch (error) {
        console.log(error.message);
           cb(false);
       }
   }

   afterLogout(){
       this.authenticated = false;
       CookieService.remove("token");
   }

   isAuthenticated(){
       return this.authenticated;
   }

   isValidToken(cb){
      axios.get( UrlService.authUrl(), {
          headers : this.apiHeader()
      }  ).then( (res) => {
        //   console.log(res);
          cb(false);

      } ).catch( (err) => {
          console.log(err);
          cb(true);
      } );
   }

   apiHeader(){
    const headers = {
        'Authorization': 'Bearer ' + CookieService.get("token") 
      };

      return headers;
   }
}

export default new AuthService();