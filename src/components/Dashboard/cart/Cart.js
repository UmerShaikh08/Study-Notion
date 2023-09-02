import React from "react";
import CartCard from "./CartCard";

import { useSelector } from "react-redux";

const Cart = () => {
  const { items, totalItems, totalPrice } = useSelector((store) => store.cart);
  return (
    <div className="flex flex-col gap-3">
      <div>
        {" "}
        <h1 className="text-3xl text-richblack-5">My Cart</h1>{" "}
      </div>
      <p className="text-sm text-richblack-200 font-semibold">
        {" "}
        {totalItems} courses in cart
      </p>
      <div className="border border-richblack-700 flex flex-row"></div>

      {/* cart list container */}

      {totalItems > 0 ? (
        <div className="flex flex-col lg:flex-row   ">
          <div>
            {items.map((course) => {
              return <CartCard data={course} />;
            })}
          </div>
          <div className="flex flex-col gap-4 bg-richblack-800 text-white h-[180px]  w-full md:mx-auto md:w-[30%] rounded-md p-3  border border-richblack-600 ">
            <p className="text-richblack-600">Total : </p>
            <h1 className="text-yellow-100 text-2xl font-semibold">
              Rs. {totalPrice}
            </h1>

            <button className=" bg-yellow-100 text-richblack-900 text-lg gap-3 py-2 px-3 mb-4 rounded-lg transition-all duration-200 hover:scale-95">
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <div className="text-4xl text-richblack-200 text-center">
          Your Cart is Empty
        </div>
      )}
      {/* total price and buy now container */}
    </div>
  );
};

export default Cart;
