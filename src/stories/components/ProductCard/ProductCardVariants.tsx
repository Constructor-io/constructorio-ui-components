import React from 'react';
import { ProductCardProps } from '../../../types/productCardTypes';

// Complete custom override component
export const CompleteCustomOverrideCard: React.FC<ProductCardProps> = (props) => (
  <div className='cio:bg-gradient-to-br cio:from-purple-50 cio:to-blue-50 cio:p-6 cio:rounded-3xl cio:shadow-xl cio:max-w-sm'>
    <div className='cio:relative cio:mb-4'>
      <img
        src={props.product.imageUrl}
        alt={props.product.name}
        className='cio:w-full cio:object-cover cio:rounded-2xl'
      />
      <div className='cio:absolute cio:top-3 cio:right-3 cio:bg-red-500 cio:text-white cio:px-2 cio:py-1 cio:rounded-full cio:text-xs cio:font-bold'>
        SALE
      </div>
    </div>

    <div className='cio:space-y-3'>
      <h3 className='cio:text-xl cio:font-bold cio:text-gray-800 cio:m-0'>{props.product.name}</h3>

      <div className='cio:flex cio:items-center cio:justify-between'>
        <div className='cio:flex cio:items-baseline cio:gap-2'>
          <span className='cio:text-2xl cio:font-bold cio:text-purple-600'>
            {props.priceCurrency}
            {props.product.salePrice}
          </span>
          <span className='cio:text-sm cio:text-gray-400 cio:line-through'>
            {props.priceCurrency}
            {props.product.price}
          </span>
        </div>

        <div className='cio:flex cio:items-center cio:gap-1 cio:text-yellow-500'>
          <span>⭐</span>
          <span className='cio:text-sm cio:font-medium'>{props.product.rating}</span>
          <span className='cio:text-xs cio:text-gray-500'>({props.product.reviewsCount})</span>
        </div>
      </div>

      <p className='cio:text-gray-600 cio:text-sm cio:m-0'>{props.product.description}</p>

      <div className='cio:flex cio:gap-2 cio:flex-wrap'>
        {props.product.tags?.map((tag) => (
          <span
            key={tag}
            className='cio:bg-purple-100 cio:text-purple-700 cio:px-2 cio:py-1 cio:rounded-full cio:text-xs'>
            {tag}
          </span>
        ))}
      </div>

      <div className='cio:flex cio:gap-2 cio:pt-2'>
        <button
          onClick={(e) => props.onAddToCart?.(e, props.product)}
          className='cio:flex-1 cio:bg-purple-600 cio:hover:bg-purple-700 cio:text-white cio:py-2 cio:px-4 cio:rounded-xl cio:font-medium cio:transition-colors cio:cursor-pointer cio:border-0'>
          Add to Cart
        </button>
        <button
          onClick={(e) => props.onAddToWishlist?.(e, props.product)}
          className='cio:bg-gray-100 cio:hover:bg-gray-200 cio:p-2 cio:rounded-xl cio:transition-colors cio:cursor-pointer cio:border-0'>
          ❤️
        </button>
      </div>
    </div>
  </div>
);

// Compact list style component
export const CompactListStyleCard: React.FC<ProductCardProps> = (props) => (
  <div className='cio:flex cio:items-center cio:bg-white cio:border cio:border-gray-200 cio:rounded-lg cio:p-3 cio:max-w-lg cio:hover:bg-gray-50 cio:transition-colors'>
    <img
      src={props.product.imageUrl}
      alt={props.product.name}
      className='cio:w-16 cio:object-cover cio:rounded-lg cio:mr-4'
    />
    <div className='cio:flex-1'>
      <h3 className='cio:font-semibold cio:text-gray-800 cio:m-0'>{props.product.name}</h3>
      <div className='cio:flex cio:items-center cio:gap-2 cio:mt-1'>
        <div className='cio:flex cio:items-baseline cio:gap-1'>
          <span className='cio:font-bold cio:text-red-600'>
            {props.priceCurrency}
            {props.product.salePrice}
          </span>
          <span className='cio:text-sm cio:text-gray-400 cio:line-through'>
            {props.priceCurrency}
            {props.product.price}
          </span>
        </div>
        <div className='cio:flex cio:items-center cio:gap-1 cio:text-xs'>
          <span className='cio:text-yellow-500'>⭐</span>
          <span>{props.product.rating}</span>
        </div>
      </div>
    </div>
    <button
      onClick={(e) => props.onAddToCart?.(e, props.product)}
      className='cio:bg-blue-500 cio:hover:bg-blue-600 cio:text-white cio:px-4 cio:py-2 cio:rounded-lg cio:text-sm cio:font-medium cio:transition-colors cio:ml-4 cio:cursor-pointer cio:border-0'>
      Add to Cart
    </button>
  </div>
);
