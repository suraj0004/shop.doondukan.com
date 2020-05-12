class UrlService{

    constructor(){
        this.baseUrl = "http://localhost/shopinventorymanagement/public/api";
    }

    loginUrl(){
        const apiUrl = "/login";
        return this.baseUrl + apiUrl;
    }

    logoutUrl(){
        const apiUrl = "/retail/logout";
        return this.baseUrl + apiUrl;
    }

    authUrl(){
        const apiUrl = "/retail/isAuthenticated";
        return this.baseUrl + apiUrl;
    }

    myRequestUrl(){
        const apiUrl = "/retail/myRequest";
        return this.baseUrl + apiUrl;
    }

    globalProductListUrl(){
        const apiUrl = "/retail/globalProductList";
        return this.baseUrl + apiUrl;
    }

    addPurchaseUrl(){
        const apiUrl = "/retail/addPurchase";
        return this.baseUrl + apiUrl;
    }

    purchasedListUrl(){
        const apiUrl = "/retail/purchasedList";
        return this.baseUrl + apiUrl;
    }

    globalStockListUrl(){
        const apiUrl = "/retail/globalStockList";
        return this.baseUrl + apiUrl;
    }
 
    setPriceUrl(){
        const apiUrl = "/retail/setStockprice";
        return this.baseUrl + apiUrl;
    }

    stockListUrl(){
        const apiUrl = "/retail/getstocklist";
        return this.baseUrl + apiUrl;
    }


    globalAvailableStockListUrl(){
        const apiUrl = "/retail/globalAvailableStockList";
        return this.baseUrl + apiUrl;
    }

    generateBillUrl(){
        const apiUrl = "/retail/generateBill";
        return this.baseUrl + apiUrl;
    }



}
export default new UrlService();