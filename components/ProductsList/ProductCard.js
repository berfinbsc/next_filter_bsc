"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from '../FilterMenu.module.css'

export default function ProductCard({product}){
const [productDetails, setProduct] = useState([]);

useEffect(() => {
    setProduct(product)
},[product])
    return (
                  <div className={styles.productCardContent}> {/* İçeriği saran div */}
                <p >{productDetails.STKKOD}</p>
                <p className="text-lg">{productDetails.STKCINSI}</p>
                <p className="text-lg">{productDetails.STKOZKOD1}</p>
                <p className="text-lg">{productDetails.STKOZKOD3}</p>
                <p className="text-lg">{productDetails.STKOZKOD5}</p>
                </div>

    )
    
} 
