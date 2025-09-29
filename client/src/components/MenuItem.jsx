import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  const isOutOfStock = item.stockCount === 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 flex flex-col justify-between ${isOutOfStock ? 'opacity-50' : ''}`}>
      <div>
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-700 text-lg font-bold mb-2">₹{item.price}</p>
        <p className={`text-sm ${item.stockCount < 10 ? 'text-red-500' : 'text-green-600'}`}>
          {isOutOfStock ? 'Out of Stock' : `${item.stockCount} available`}
        </p>
      </div>
      <button
        onClick={() => addToCart(item)}
        disabled={isOutOfStock}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;