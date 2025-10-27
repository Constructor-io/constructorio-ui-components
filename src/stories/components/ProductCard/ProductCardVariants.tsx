import React from 'react';

// Type for the props passed to render prop functions
export interface ProductCardRenderProps {
  itemId?: string;
  itemVariationId?: string;
  itemName?: string;
  itemImageUrl?: string;
  itemPrice?: string;
  itemSalePrice?: string;
  itemPriceCurrency?: string;
  itemRating?: number;
  itemReviewsCount?: number;
  itemDescription?: string;
  itemTags?: string[];
  onAddToCart?: (e?: React.MouseEvent) => void;
  onAddToWishlist?: (e?: React.MouseEvent) => void;
  onItemClick?: () => void;
  addToCartText?: string;
  isInWishlist?: boolean;
}

// Complete custom override component
export const CompleteCustomOverrideCard: React.FC<ProductCardRenderProps> = (props) => (
  <div className='bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-3xl shadow-xl max-w-sm'>
    <div className='relative mb-4'>
      <img
        src={props.itemImageUrl}
        alt={props.itemName}
        className='w-full h-48 object-cover rounded-2xl'
      />
      <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
        SALE
      </div>
    </div>

    <div className='space-y-3'>
      <h3 className='text-xl font-bold text-gray-800'>{props.itemName}</h3>

      <div className='flex items-center justify-between'>
        <div className='flex items-baseline gap-2'>
          <span className='text-2xl font-bold text-purple-600'>
            {props.itemPriceCurrency}
            {props.itemSalePrice}
          </span>
          <span className='text-sm text-gray-400 line-through'>
            {props.itemPriceCurrency}
            {props.itemPrice}
          </span>
        </div>

        <div className='flex items-center gap-1 text-yellow-500'>
          <span>⭐</span>
          <span className='text-sm font-medium'>{props.itemRating}</span>
          <span className='text-xs text-gray-500'>({props.itemReviewsCount})</span>
        </div>
      </div>

      <p className='text-gray-600 text-sm'>{props.itemDescription}</p>

      <div className='flex gap-2 flex-wrap'>
        {props.itemTags?.map((tag) => (
          <span key={tag} className='bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs'>
            {tag}
          </span>
        ))}
      </div>

      <div className='flex gap-2 pt-2'>
        <button
          onClick={props.onAddToCart}
          className='flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-colors cursor-pointer'>
          Add to Cart
        </button>
        <button
          onClick={props.onAddToWishlist}
          className='bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors cursor-pointer'>
          ❤️
        </button>
      </div>
    </div>
  </div>
);

// Compact list style component
export const CompactListStyleCard: React.FC<ProductCardRenderProps> = (props) => (
  <div className='flex items-center bg-white border border-gray-200 rounded-lg p-3 max-w-lg hover:bg-gray-50 transition-colors'>
    <img
      src={props.itemImageUrl}
      alt={props.itemName}
      className='w-16 h-16 object-cover rounded-lg mr-4'
    />
    <div className='flex-1'>
      <h3 className='font-semibold text-gray-800'>{props.itemName}</h3>
      <div className='flex items-center gap-2 mt-1'>
        <div className='flex items-baseline gap-1'>
          <span className='font-bold text-red-600'>
            {props.itemPriceCurrency}
            {props.itemSalePrice}
          </span>
          <span className='text-sm text-gray-400 line-through'>
            {props.itemPriceCurrency}
            {props.itemPrice}
          </span>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <span className='text-yellow-500'>⭐</span>
          <span>{props.itemRating}</span>
        </div>
      </div>
    </div>
    <button
      onClick={props.onAddToCart}
      className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-4 cursor-pointer'>
      Add to Cart
    </button>
  </div>
);
