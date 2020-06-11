import React,{useRef} from 'react';
import UrlService from '../../services/UrlService';
function Card(props) {
    const {userImage,userName,shopImage,shopName,type} = props.data;
    var image,name;
    
    if(type === 'retailer'){
         image = UrlService.userImageUrl()+userImage;
         name = userName; 
    
       
    }else{
         image = UrlService.shopImageUrl()+shopImage;
         name = shopName;
       
    }

    const imageRef = useRef();
    const setErrorImage = () => {
      imageRef.current.src = "/asset/dist/img/user2-160x160.jpg";
    }
   

 

    return (
        <div className="card card-primary card-outline">
        <div className="card-body box-profile">
          <div className="text-center">
            <img className="profile-user-img img-fluid img-circle"
                 src={image}
                 ref={imageRef}
                 onError={() => setErrorImage()}
                 alt="User profile picture"
                 style={{height:"120px",width:"120px"}}
                 />
          </div>

         <h3
          className="profile-username text-center">{ name} 
         </h3>

        <p className="text-muted text-center">{type[0].toUpperCase() + type.slice(1) }</p>

          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
              <b>Total Product</b> <a className="float-right">1,622</a>
            </li>
            <li className="list-group-item">
              <b>In Stock</b> <a className="float-right">1413</a>
            </li>
         
          </ul>

         
        </div>
        
      </div>
    );
}

export default Card;