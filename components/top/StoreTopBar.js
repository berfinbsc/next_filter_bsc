import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StoreTopBar = () => {
  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mağaza Adı */}
        <div className="text-lg font-bold">ÇALIŞKAN ARILAR</div>

        {/* Arama Kutusu */}
        <div className="flex items-center bg-white rounded-md px-2">
          <input
            type="text"
            placeholder="Ürün arayın..."
            className="py-1 px-2 bg-transparent border-none focus:outline-none w-40"
          />
          <button className="flex items-center justify-center bg-gray-600 text-white rounded-md p-1">
            <SearchIcon />
          </button>
        </div>

        {/* Sepet ve Kullanıcı Hesabı Bilgileri */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="text-white">
              <ShoppingCartIcon />
            </button>
            <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-1">
              0
            </span>
          </div>
          <div>
            <button className="text-white">Hesabım</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTopBar;
