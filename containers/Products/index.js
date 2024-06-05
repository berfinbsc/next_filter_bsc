'use client';

import FilterMenu from '@/components/FilterMenu/FilterMenu';
import ProductsList from '@/components/ProductsList/ProductsList';
import React from 'react'
import styles from '../../components/FilterMenu.module.css'
function Products() {
  return (
   


  <div className={styles.container}>
      <h1>Hoşgeldiniz</h1>
      <div className={styles.mainContent}>
        <FilterMenu />
        <ProductsList  />
      </div>
    </div>



)
}

export default Products