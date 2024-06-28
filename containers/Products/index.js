import ProductsList from '@/components/ProductsList/ProductsList';
import React from 'react';
import TopMenu from '@/components/FilterMenu/TopMenu';
import SideMenu from '@/components/FilterMenu/SideMenu';
import StoreTopBar from '@/components/top/StoreTopBar';

function Products() {
  return (
    <div className="w-full flex justify-center bg-white">
      {/* Küçük ekranlarda üst menü, büyük ekranlarda yan menü gösteriliyor */}
      <div className="md:flex">
        <div className="">
          <SideMenu />
        </div>
        <div className="md:w-4/4 "> {/* Yan menü ile ürün listesi arasına padding eklendi */}
          <TopMenu />
          <ProductsList />
        </div>
      </div>
    </div>
  );
}

export default Products;
