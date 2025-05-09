// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");
//   const fetchProductData = async () => {

//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Image */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal">
//             {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2">
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_icon} alt="" className="w-3 5" />
//             <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//             <p className="pl-2">(122)</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   className={`border py-2 px-4 bg-gray-100 ${
//                     item === size ? "border-orange-500" : ""
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
//             ADD TO CART
//           </button>
//           <hr className="mt-8 sm:w-4/5 border-gray-300" />
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original Product.</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>
//       {/* Description and review section */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>
//             An e-commerce website is an online platform that facilitates the
//             buying and selling of products or services over the internet. It
//             serves as a virtual marketplace where businesses and individuals can
//             showcase their products, interact with customers, and conduct
//             transactions without the need for a physical presence. E-commerce
//             websites have gained immense popularity due to their convience,
//             accessibility, and the global reach they offer.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along
//             with detailed descriptions, images, prices and any available
//             variations (e.g., sizes, colors). Each product usually has its own
//             dedicated page with relevant information.
//           </p>
//         </div>
//       </div>
//       {/* display related products */}

//    <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setMainImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 md:h-[500px] scrollbar-hide">
            {productData.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 rounded-md p-1 transition-all ${mainImage === img ? 'border-orange-500' : 'border-gray-200'
                  } hover:border-orange-300`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={mainImage}
              alt={productData.name}
              className="w-full h-full object-contain max-h-[500px]"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="★" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="☆" className="w-4" />
            <span className="text-sm text-gray-500 ml-1">(122)</span>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600">{productData.description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            disabled={!selectedSize}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ADD TO CART
          </button>

          {/* Product Policies */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>✓ 100% Original product</p>
              <p>✓ Cash on delivery available</p>
              <p>✓ Easy return and exchange within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
         <div className="flex">
           <b className="border px-5 py-3 text-sm">Description</b>
           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
         </div>
         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
           <p>
             An e-commerce website is an online platform that facilitates the
             buying and selling of products or services over the internet. It
             serves as a virtual marketplace where businesses and individuals can
             showcase their products, interact with customers, and conduct
             transactions without the need for a physical presence. E-commerce
             websites have gained immense popularity due to their convience,
             accessibility, and the global reach they offer.
           </p>
           <p>
             E-commerce websites typically display products or services along
            with detailed descriptions, images, prices and any available
             variations (e.g., sizes, colors). Each product usually has its own
             dedicated page with relevant information.
           </p>
         </div>
       </div>
       {/* display related products */}

    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  )
};

export default Product;
