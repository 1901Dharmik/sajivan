"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

// Add dummy data
interface ProductImage {
  url: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  totalrating: number;
  images: ProductImage[];
  care_for: string[];
}

const dummyProduct: Product = {
  _id: "1",
  title: "Herbal Wellness Package",
  price: 2999,
  totalrating: 4.5,
  images: [
    {
      url: "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338581/uxyn00vejgrp0so0kall.jpg",
    },
    {
      url: "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416910/ghi5wjjzgv0ok76fon9f.jpg",
    },
  ],
  care_for: ["Immunity", "Digestion", "Stress Relief"],
};

const ProductCard = () => {
  // Add state and handlers
  const [item] = useState(dummyProduct);

  const handleAddToWishlist = () => {
    console.log("Added to wishlist");
  };

  const handleBuyNow = () => {
    console.log("Buy now clicked");
  };

  const handleAddToCart = () => {
    console.log("Added to cart");
  };

  return (
    <>
      {/* <div className="grid xl:grid-cols-4 gap-3 pl-6 pt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-scroll"> */}
      {/* {loading ? (
        <div className="animate-pulse">
          <div class="cards ">
            <div class="card is-loading shadow-md rounded-3xl animate-pulse">
              <div class="image"></div>
              <div class="content">
                <h2></h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
      {/* // h-[220px] */}

      <div className="max-w-xs mb-12 mt-2 overflow-hidden border border-gray-200 rounded-[20px] dark:bg-gray-800 dark:border-gray-700 hover:shadow-custom-shadow">
        <Link href={`/product/${item?._id}`} className="link">
          <div className="w-full border-b border-gray-200 overflow-hidden bg-cover bg-no-repeat rounded-t-[20px]">
            <div className="cards">
              <div className="image h-[400px]">
                {/* <span className="">New Season</span> */}
                {/* <Link className="link" to="/Products/1"> */}

                <Image
                  src={item?.images[0]?.url}
                  alt="Product main image"
                  width={400}
                  height={400}
                  className="mainImg bg-opacity-75"
                  style={{ transition: "all .5s" }}
                  priority
                />
                <Image
                  src={item?.images[1]?.url}
                  alt="Product secondary image"
                  width={400}
                  height={400}
                  className="secondImg border-none"
                  style={{ transition: "all .5s ease-in" }}
                />

                {/* </Link> */}
              </div>
            </div>

            {/* <img
                    class="h-[220px]  w-full transition duration-300 ease-in-out hover:scale-110  "
                    src={
                     
                      item.attributes?.img?.data?.attributes?.url
                    }
                    alt=""
                    draggable="false"
                    style={{transition: 'all .5s'}}
                  /> */}
          </div>
        </Link>
        <div className="px-4 pt-5 bg-image-productcard">
          <button
            onClick={handleAddToWishlist}
            className="absolute right-4 top-4 z-10 p-1.5  rounded-full bg-white"
          >
            <Heart className={`h-5 w-5 text-gray-500`} />
          </button>
          <h5 className="mb-0 text-lg  font-semibold  text-gray-900  dark:text-white">
            {item?.title}
          </h5>
          {/* <p
              className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></p> */}
          {/* </a> */}
          <li className="list-none flex justify-between font-[200] my-1">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      ratingValue <= Math.round(item?.totalrating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
            </div>
            {/* <span className="font-lg">4.6</span>
              <img
                class="h-[16px] w-[16px]  ml-1"
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/reviewstar.png?v=1629806756"
                alt="Vigyanveda Review Star"
              />{" "} */}
            <span className="mt-1.5  text-sm">11000+ People Using</span>
          </li>
          {/* <li class="list-none flex font-[300] mt-1 "><span className="font-semibold text-lg">₹</span><h5 className="mt-[1px] pl-1 font-semibold text-lg">5000</h5>
                         < className="font-semibold text-slate-500 text-lg mt-[6px] ml-8 leading-tight line-through">₹</ span>
                               <h5 className="mt-1 pl-1 font-semibold text-lg  text-slate-500 line-through  ">8000</h5></li> */}
          <li className="list-none flex pb-2">
            <h6 className="font-semibold text-lg py-1 mb-0 dark:text-white">
              ₹{item?.price}
            </h6>
            <h6 className="font-small text-lg py-1 mb-0 line-through pl-4 text-gray-500">
              ₹{(item?.price * 1.05).toFixed(2)}
            </h6>
          </li>

          <li className="flex flex-wrap  list-none overflow-hidden mb-3">
            <span className="font-light text-[15px] text-green-800 mr-2">
              Care For
            </span>

            {item?.care_for?.map((careItem, index) => (
              <span key={careItem} className="text-[15px] font-light pr-1">
                {careItem}
                {index !== item.care_for.length - 1 && ","}
              </span>
            ))}

            {/* <h6 className="text-[15px] font-light mt-[2px] pl-2 mb-4">
                Gas, Acidity, Constipation
              </h6> */}
          </li>
        </div>
        <li className="list-none flex ">
          {/* <button
              onClick={(e) => {
                addToWish(item?._id);
              }}
              className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
            >
              
              Add To Wishlist
            </button> */}
          <button
            onClick={handleBuyNow}
            className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
          >
            {/* <Link to={`/product/${item._id}`}>Know More</Link> */}
            Buy Now
          </button>

          <button
            className="bg-[#206c43] dark:bg-gray-700 py-[10px] w-[50%] rounded-br-[19px] text-white font-semibold"
            onClick={handleAddToCart}
            // onClick={() => {
            //   alreadyAdded ? navigate("/cart") : handleAddToCart;
            // }}
          >
            Add To Cart
          </button>
        </li>
      </div>
      <div className="max-w-xs mb-12 mt-2 overflow-hidden border border-gray-200 rounded-[20px] dark:bg-gray-800 dark:border-gray-700 hover:shadow-custom-shadow">
        <Link href={`/product/${item?._id}`} className="link">
          <div className="w-full border-b border-gray-200 overflow-hidden bg-cover bg-no-repeat rounded-t-[20px]">
            <div className="cards">
              <div className="image h-[400px]">
                {/* <span className="">New Season</span> */}
                {/* <Link className="link" to="/Products/1"> */}

                <Image
                  src={item?.images[0]?.url}
                  alt="Product main image"
                  width={400}
                  height={400}
                  className="mainImg bg-opacity-75"
                  style={{ transition: "all .5s" }}
                  priority
                />
                <Image
                  src={item?.images[1]?.url}
                  alt="Product secondary image"
                  width={400}
                  height={400}
                  className="secondImg border-none"
                  style={{ transition: "all .5s ease-in" }}
                />

                {/* </Link> */}
              </div>
            </div>

            {/* <img
                    class="h-[220px]  w-full transition duration-300 ease-in-out hover:scale-110  "
                    src={
                     
                      item.attributes?.img?.data?.attributes?.url
                    }
                    alt=""
                    draggable="false"
                    style={{transition: 'all .5s'}}
                  /> */}
          </div>
        </Link>
        <div className="px-4 pt-5 bg-image-productcard">
          <button
            onClick={handleAddToWishlist}
            className="absolute right-4 top-4 z-10 p-1.5  rounded-full bg-white"
          >
            <Heart className={`h-5 w-5 text-gray-500`} />
          </button>
          <h5 className="mb-0 text-lg  font-semibold  text-gray-900  dark:text-white">
            {item?.title}
          </h5>
          {/* <p
              className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></p> */}
          {/* </a> */}
          <li className="list-none flex justify-between font-[200] my-1">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      ratingValue <= Math.round(item?.totalrating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
            </div>
            {/* <span className="font-lg">4.6</span>
              <img
                class="h-[16px] w-[16px]  ml-1"
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/reviewstar.png?v=1629806756"
                alt="Vigyanveda Review Star"
              />{" "} */}
            <span className="mt-1.5  text-sm">11000+ People Using</span>
          </li>
          {/* <li class="list-none flex font-[300] mt-1 "><span className="font-semibold text-lg">₹</span><h5 className="mt-[1px] pl-1 font-semibold text-lg">5000</h5>
                         < className="font-semibold text-slate-500 text-lg mt-[6px] ml-8 leading-tight line-through">₹</ span>
                               <h5 className="mt-1 pl-1 font-semibold text-lg  text-slate-500 line-through  ">8000</h5></li> */}
          <li className="list-none flex pb-2">
            <h6 className="font-semibold text-lg py-1 mb-0 dark:text-white">
              ₹{item?.price}
            </h6>
            <h6 className="font-small text-lg py-1 mb-0 line-through pl-4 text-gray-500">
              ₹{(item?.price * 1.05).toFixed(2)}
            </h6>
          </li>

          <li className="flex flex-wrap  list-none overflow-hidden mb-3">
            <span className="font-light text-[15px] text-green-800 mr-2">
              Care For
            </span>

            {item?.care_for?.map((careItem, index) => (
              <span key={careItem} className="text-[15px] font-light pr-1">
                {careItem}
                {index !== item.care_for.length - 1 && ","}
              </span>
            ))}

            {/* <h6 className="text-[15px] font-light mt-[2px] pl-2 mb-4">
                Gas, Acidity, Constipation
              </h6> */}
          </li>
        </div>
        <li className="list-none flex ">
          {/* <button
              onClick={(e) => {
                addToWish(item?._id);
              }}
              className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
            >
              
              Add To Wishlist
            </button> */}
          <button
            onClick={handleBuyNow}
            className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
          >
            {/* <Link to={`/product/${item._id}`}>Know More</Link> */}
            Buy Now
          </button>

          <button
            className="bg-[#206c43] dark:bg-gray-700 py-[10px] w-[50%] rounded-br-[19px] text-white font-semibold"
            onClick={handleAddToCart}
            // onClick={() => {
            //   alreadyAdded ? navigate("/cart") : handleAddToCart;
            // }}
          >
            Add To Cart
          </button>
        </li>
      </div>
    </>
  );
};

export default ProductCard;
