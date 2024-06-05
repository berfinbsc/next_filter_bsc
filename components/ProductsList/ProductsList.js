"use client";
import React, { useEffect, useState } from "react";
import styles from '../FilterMenu.module.css';
import ProductCard from "./ProductCard";
import filterStore from "@/utils/filterStore";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const { selectedFilters } = filterStore();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
          throw new Error('API hatası: ' + response.status);
        }
        const data = await response.json();
        setProducts(data.data);
        setCurrentProducts(data.data);
      } catch (error) {
        console.error('Veri çekme hatası: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFilters && products.length > 0) {
      const filteredProducts = products.filter(product => {
        return selectedFilters.some(filter => {
          if (filter.name === product.STKOZKOD3) {
            return filter.categories.includes(product.STKOZKOD5);
          }
          return false;
        });
      });
      setCurrentProducts(filteredProducts.length > 0 ? filteredProducts : products);
    } else {
      setCurrentProducts(products);
    }
  }, [selectedFilters, products]);

  return (
    <div className={styles.productList}>
      {currentProducts.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
