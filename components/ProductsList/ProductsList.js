"use client";
import React from "react";
import { useEffect, useState } from "react";
import styles from '../FilterMenu.module.css'
import ProductCard from "./ProductCard";
export default function ProductsList() {

const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            if (!response.ok) {
              throw new Error('API hatası: ' + response.status);
            }
            const data = await response.json();
            setProducts(data.data);
          } catch (error) {
            console.error('Veri çekme hatası: ', error);
          }
        };
        fetchData();
      }, []);
    






  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}