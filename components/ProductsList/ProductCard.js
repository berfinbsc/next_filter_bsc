"use client";
import React, { useState } from "react";
import styles from '../FilterMenu.module.css'
import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaPlus } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(product.count);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div key={product.STKKOD} className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <Link href="">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoFlAxVE8y3npp0rwvV2k4uMP3PNkjjPSjQ&s"
            alt=""
            className={styles.productImage}
            width={400}
            height={350}
          />
        </Link>
      </div>
      <div className={styles.productInfo}>
        <Link href="" className={styles.productName}>
          <p>{product.STKCINSI}</p>
        </Link>
        <p className={styles.productPrice}>250₺</p>
        {product.STKOZKOD1 === 'A' ? (
          <div className={styles.actions}>
            <div className={styles.quantityWrapper}>
              <button className={styles.quantityButton} onClick={decreaseQuantity}>-</button>
              <span className={styles.quantityDisplay}>1</span>
              <button className={styles.quantityButton} onClick={increaseQuantity}>+</button>
            </div>
            <button className={styles.addToCartButton}>
              Sepete Ekle
              <span className={styles.iconSpan}>
                <FaPlus />
              </span>
            </button>
          </div>
        ) : (
          <p className={styles.outOfStock}>Stokta Yok</p>
        )}
      </div>


    
    </div>
  )
}
