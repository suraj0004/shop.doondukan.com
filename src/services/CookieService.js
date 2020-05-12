import Cookie from 'universal-cookie';
const cookie = new Cookie();

class CookieService{
    set(key,value, options){
        cookie.set(key,value,options);
    }
    get(key){
       return cookie.get(key);
    }
    remove(key){
        cookie.remove(key);
    }
}

export default new CookieService();