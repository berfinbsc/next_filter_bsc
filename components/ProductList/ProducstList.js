"use client";
import React from "react";
import { useEffect, useState } from "react";
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
    <div className="py-5 px-5 bg-BaseLight text-LightBlue">
    
    {
        products.map((product,index) => (
            <div className="flex flex-col" key={index}>
                <p className="text-lg">{product.STKKOD}</p>
                <p className="text-lg">{product.STKCINSI}</p>
                <p className="text-lg">{product.STKOZKOD1}</p>
                <p className="text-lg">{product.STKOZKOD3}</p>
                <p className="text-lg">{product.STKOZKOD5}</p>
            </div>
        ))

    }





    </div>
  )
}