class UrlService{

    constructor(){
        this.baseUrl = "http://localhost/shopinventorymanagement/public/api";
        this.imagePath = "http://localhost/shopinventorymanagement/public";
    }


    userImageUrl(){
        const folderName = "/profileimages/";
        return this.imagePath + folderName;
    }

    shopImageUrl(){
        const folderName = "/shopimages/";
        return this.imagePath + folderName;
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
        const apiUrl = "/retail/getAvailableGlobalStockList";
        return this.baseUrl + apiUrl;
    }

    generateBillUrl(){
        const apiUrl = "/retail/generateBill";
        return this.baseUrl + apiUrl;
    }

    saleListUrl(){
        const apiUrl = "/retail/saleList";
        return this.baseUrl + apiUrl;
    }

    billListUrl(){
        const apiUrl = "/retail/billList";
        return this.baseUrl + apiUrl;
    }

    profileShopSettingUrl(){
        const apiUrl = "/retail/updateShopProfile";
        return this.baseUrl + apiUrl;
    }

    profileUserSettingUrl(){
        const apiUrl = "/retail/updateProfile";
        return this.baseUrl + apiUrl;
    }

    profilegUrl(){
        const apiUrl = "/retail/profile";
        return this.baseUrl + apiUrl;
    }

    confirmPasswordUrl(){
        const apiUrl = "/retail/confirmPassword";
        return this.baseUrl + apiUrl;
    }

    invoiceUrl(){
        const apiUrl = "/retail/invoice/";
        return this.baseUrl + apiUrl;
    }




}
export default new UrlService();