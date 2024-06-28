import filterStore from '@/utils/filterStore';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../FilterMenu.module.css';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const SideMenu = () => {
  const [filter, setFilter] = useState([]);
  const { selectedFilters, updateFilter } = filterStore();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const filterArray = [
      {
        name: '1.SINIF',
        categories: ['HİKAYE', 'SET', 'TATIL', 'KAZANIM', 'INGILIZCE']
      },
      {
        name: '2.SINIF',
        categories: ['HİKAYE', 'SET', 'TATIL', 'KAZANIM', 'INGILIZCE']
      },
      {
        name: '3.SINIF',
        categories: ['HİKAYE', 'SET', 'TATIL', 'KAZANIM', 'INGILIZCE']
      },
      {
        name: '4.SINIF',
        categories: ['HİKAYE', 'SET', 'TATIL', 'KAZANIM', 'INGILIZCE']
      },
      {
        name: 'İNGİLİZCE',
        categories: ['1.SINIF', '2.SINIF', '3.SINIF', '4.SINIF']
      },
      {
        name: 'ANA SINIFI',
        categories: []
      }
    ];
    setFilter(filterArray);
  }, []);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveIndex(index);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const toggleDropdown = (index) => {
    if (activeIndex === index && isDropdownOpen) {
      setIsDropdownOpen(false);
      setActiveIndex(null);
    } else {
      setIsDropdownOpen(true);
      setActiveIndex(index);
    }
  };

  const handleCheckboxChange = (category, filter) => {
    try {
      updateFilter(category, filter);
    } catch (error) {
      console.log(error);
    }
    console.log(selectedFilters);
  };

  const isFilterSelected = (category, filter) => {
    const categoryObj = selectedFilters.find((item) => item.category === category);
    return categoryObj ? categoryObj.filter.includes(filter) : false;
  };

  return (
    <div className="bg-white sticky top-0 z-50 shadow-lg hidden md:block  -mt-2  top-0  ">
      {/* Yan Menü (Büyük Ekranlar İçin) */}
        <div className="mx-auto w-full" style={{ padding: '20px' }}>
          {filter.map((item, index) => (
            <div key={index}>
              <div className={`${styles.menuItem} rounded-md -mb-4`}>
                <span>{item.name}</span>
              </div>
              <div className={`${styles.dropdown} -ml-2`}>
                {item.categories.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className={`${styles.category} rounded-md  -mb-4 cursor-pointer`}
                    onClick={() => handleCheckboxChange(item.name, category)}
                  >
                    <div
                      className={`${styles.checkbox} ${isFilterSelected(item.name, category) ? styles.checked : ''}`}
                    />
                    {category}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default SideMenu;
