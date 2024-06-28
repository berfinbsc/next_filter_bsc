"use client";
import React, { useEffect, useState } from "react";
import ProductCardB from "./ProductCardB";
import filterStore from "@/utils/filterStore";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const { selectedFilters } = filterStore();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/products');
        if (!response.ok) {
          throw new Error('API hatası: ' + response.status);
        }
        const data = await response.json();
        const productsList = data.data;
        const inStockProducts = productsList.filter(product => product.STKOZKOD1 === 'A');
        setCurrentProducts(inStockProducts);
        setProducts(inStockProducts);
      } catch (error) {
        console.error('Veri çekme hatası: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      let filteredProducts = [];
      selectedFilters.forEach(filter => {
        products.forEach(product => {
          if (filter.category === product.STKOZKOD3 && filter.filter.includes(product.STKOZKOD2)) {
            if (!filteredProducts.some(p => p.STKKOD === product.STKKOD)) {
              filteredProducts.push(product);
            }
          }
          else{
            setCurrentProducts(products);

          }
        });
      });
      setCurrentProducts(filteredProducts);
    } else {
      setCurrentProducts(products);
    }
  }, [selectedFilters, products]);

  return (
    <div className="bg-white w-full flex justify-center">
      <ProductCardB selectedCategory={currentProducts} />
    </div>
  );
};

export default ProductsList;
