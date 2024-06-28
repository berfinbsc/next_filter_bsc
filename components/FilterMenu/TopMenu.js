import filterStore from '@/utils/filterStore';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../FilterMenu.module.css';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const TopMenu = () => {
  const [filter, setFilter] = useState([]);
  const { selectedFilters, updateFilter } = filterStore();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const filterArray = [
      {
        name: '1.SINIF',
        categories: ['HİKAYE', 'SET','TATIL','KAZANIM','INGILIZCE']
      },
      {
        name: '2.SINIF',
        categories: ['HİKAYE', 'SET','TATIL','KAZANIM','INGILIZCE']
      },
      {
        name: '3.SINIF',
        categories: ['HİKAYE', 'SET','TATIL','KAZANIM','INGILIZCE']
      },
      {
        name: '4.SINIF',
        categories: ['HİKAYE', 'SET','TATIL','KAZANIM','INGILIZCE']
      },
      {
        name: 'İNGİLİZCE',
        categories: ['1.SINIF','2.SINIF','3.SINIF','4.SINIF']
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
    <div className="bg-white sticky text-darkBabyBlue top-0 z-50 w-full flex justify-center md:hidden">
      {/* Üst Menü */}
        {filter.map((item, index) => (
          <div key={index} className={`hover:text-LightBlue  relative group mx-2 rounded-md ${activeIndex === index && isDropdownOpen ? 'shadow-md' : 'shadow-md'}`}>
            <button
              className="rounded-md p-2 flex items-center"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => toggleDropdown(index)}
            >
              <span>{item.name}</span>
              {activeIndex === index && isDropdownOpen ? (
                <HiOutlineChevronUp className="ml-1" />
              ) : (
                <HiOutlineChevronDown className="ml-1" />
              )}
            </button>
            {activeIndex === index && isDropdownOpen && (
              <div
                className=" absolute -mt-2 bg-white left-0 mt-7 w-48 shadow-md rounded-md z-50" // mt-10 ile menüyü aşağı kaydırdık
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.categories.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className={` ${styles.category} -mt-2 rounded-md  cursor-pointer  `}
                    onClick={() => handleCheckboxChange(item.name, category)}
                  >
                    <div
                      className={` ${styles.checkbox} ${isFilterSelected(item.name, category) ? styles.checked : ''}`}
                    />
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
  );
};

export default TopMenu;
