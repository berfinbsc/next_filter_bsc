"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from '../FilterMenu.module.css'
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({product}){


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
            <h>{product.STKCINSI}</h>
          </Link>
          <p className={styles.productPrice}>250₺</p>
          {product.STKOZKOD1=='A' ? (
            <button  className={styles.addToCartButton}>
                Sepete Ekle
            </button>
          ) : (
            <p className={styles.outOfStock}>Stokta Yok</p>
          )}
        </div>
      </div>


    )
    
} 
