import React from 'react';
import { ProductCardProps } from '../../../types/productCardTypes';

// Complete custom override component
export const CompleteCustomOverrideCard: React.FC<ProductCardProps> = (props) => (
  <div className='bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-3xl shadow-xl max-w-sm'>
    <div className='relative mb-4'>
      <img
        src={props.product.imageUrl}
        alt={props.product.name}
        className='w-full object-cover rounded-2xl'
      />
      <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
        SALE
      </div>
    </div>

    <div className='space-y-3'>
      <h3 className='text-xl font-bold text-gray-800 m-0'>{props.product.name}</h3>

      <div className='flex items-center justify-between'>
        <div className='flex items-baseline gap-2'>
          <span className='text-2xl font-bold text-purple-600'>
            {props.priceCurrency}
            {props.product.salePrice}
          </span>
          <span className='text-sm text-gray-400 line-through'>
            {props.priceCurrency}
            {props.product.price}
          </span>
        </div>

        <div className='flex items-center gap-1 text-yellow-500'>
          <span>⭐</span>
          <span className='text-sm font-medium'>{props.product.rating}</span>
          <span className='text-xs text-gray-500'>({props.product.reviewsCount})</span>
        </div>
      </div>

      <p className='text-gray-600 text-sm m-0'>{props.product.description}</p>

      <div className='flex gap-2 flex-wrap'>
        {props.product.tags?.map((tag) => (
          <span key={tag} className='bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs'>
            {tag}
          </span>
        ))}
      </div>

      <div className='flex gap-2 pt-2'>
        <button
          onClick={props.onAddToCart}
          className='flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-colors cursor-pointer border-0'>
          Add to Cart
        </button>
        <button
          onClick={props.onAddToWishlist}
          className='bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors cursor-pointer border-0'>
          ❤️
        </button>
      </div>
    </div>
  </div>
);

// Compact list style component
export const CompactListStyleCard: React.FC<ProductCardProps> = (props) => (
  <div className='flex items-center bg-white border border-gray-200 rounded-lg p-3 max-w-lg hover:bg-gray-50 transition-colors'>
    <img
      src={props.product.imageUrl}
      alt={props.product.name}
      className='w-16 object-cover rounded-lg mr-4'
    />
    <div className='flex-1'>
      <h3 className='font-semibold text-gray-800 m-0'>{props.product.name}</h3>
      <div className='flex items-center gap-2 mt-1'>
        <div className='flex items-baseline gap-1'>
          <span className='font-bold text-red-600'>
            {props.priceCurrency}
            {props.product.salePrice}
          </span>
          <span className='text-sm text-gray-400 line-through'>
            {props.priceCurrency}
            {props.product.price}
          </span>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <span className='text-yellow-500'>⭐</span>
          <span>{props.product.rating}</span>
        </div>
      </div>
    </div>
    <button
      onClick={props.onAddToCart}
      className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-4 cursor-pointer border-0'>
      Add to Cart
    </button>
  </div>
);
