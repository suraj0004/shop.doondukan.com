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

    setStatusPaidUrl(){
        const apiUrl = '/retail/setStatusPaid';
        return this.baseUrl + apiUrl;
    }


    percentageAndMoreUrl(){
        const apiUrl = '/retail/report/percentage';
        return this.baseUrl + apiUrl;
    }

    
    topHighestSellingProductsUrl(){
        const apiUrl = '/retail/report/top-highest-selling-products';
        return this.baseUrl + apiUrl;
    }

    topLowestSellingProductsUrl(){
        const apiUrl = '/retail/report/top-lowest-selling-products';
        return this.baseUrl + apiUrl;
    }

    topProfitableProductsUrl(){
        const apiUrl = '/retail/report/top-profitable-products';
        return this.baseUrl + apiUrl;
    }

    topLessProfitableProductsUrl(){
        const apiUrl = '/retail/report/top-less-profitable-products';
        return this.baseUrl + apiUrl;
    }

    topLooselyProductsUrl(){
        const apiUrl = '/retail/report/top-loosely-products';
        return this.baseUrl + apiUrl;
    }


    saleVsProfitUrl(){
        const apiUrl = '/retail/report/sale-vs-profit';
        return this.baseUrl + apiUrl;
    }

    quantityVsSaleUrl(){
        const apiUrl = '/retail/report/quantity-vs-sale';
        return this.baseUrl + apiUrl;
    }

    quantityVsProfitUrl(){
        const apiUrl = '/retail/report/quantity-vs-profit';
        return this.baseUrl + apiUrl;
    }

    ALL_inOneUrl(){
        const apiUrl = '/retail/report/all-in-one';
        return this.baseUrl + apiUrl;
    }



    saleGrowthUrl(){
        const apiUrl = '/retail/report/sale-growth';
        return this.baseUrl + apiUrl;
    }

    purchaseGrowthUrl(){
        const apiUrl = '/retail/report/purchase-growth';
        return this.baseUrl + apiUrl;
    }

    profitGrowthUrl(){
        const apiUrl = '/retail/report/profit-growth';
        return this.baseUrl + apiUrl;
    }

    DashboardUrl(){
        const apiUrl = '/retail/dashboard';
        return this.baseUrl + apiUrl;
    }


    AddCustomeProductUrl(){
        const apiUrl = '/retail/add-user-custom-product';
        return this.baseUrl + apiUrl;
    }

    GetCustomeProductListUrl(){
        const apiUrl = '/retail/get-user-custom-product-list';
        return this.baseUrl + apiUrl;
    }
    

  


    

}
export default new UrlService();