import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

function ProductCardB({selectedCategory} ) {


  const [hoveredIndex, setHoveredIndex] = useState(null);
  //sepet içindeki ürünleri cart items tutuyor
  const [cartItems, setCartItems] = useState([]);
  const [updatingItems, setUpdatingItems] = useState({});
const availableStock =20;
  useEffect(() => {
    // component mount olduğunda localStorage'dan sepet verilerini çek
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Ürünün indirimli fiyatını hesaplar
  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount > 0) {
      const discountedAmount = (price * discount) / 100;
      return (price - discountedAmount).toFixed(2);
    }
    return price;
  };

  // Ürünün sepette olup olmadığını kontrol eder
  const isItemInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Sepetteki ürünün miktarını getirir
  const getCartItemQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

     //sepete ekleme fonksiyonu
  const addToCart = (product, quantity) => {
    setUpdatingItems({ ...updatingItems, [product.STKKOD]: true });
    setTimeout(() => {
      let updatedCartItems = [...cartItems];
      const existingItemIndex = updatedCartItems.findIndex(
        (item) => item.id === product.STKKOD
      );

      // Eğer ürün sepette zaten varsa, mevcut miktarını al
      const existingQuantity =
        existingItemIndex !== -1
          ? updatedCartItems[existingItemIndex].quantity
          : 0;
      const totalQuantity = existingQuantity + quantity;
      // Eğer toplam miktar stoktan fazlaysa hata mesajı göster
  
      if (totalQuantity > product.stock) {
        toast.error(`En fazla ${product.stock} adet ekleyebilirsiniz`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdatingItems({ ...updatingItems, [product.id]: false });
        return;
      } 
     

      if (existingItemIndex !== -1) {
        // Ürün sepette zaten var, sadece miktarını artır
        updatedCartItems[existingItemIndex].quantity += quantity;
      } else {
        // Ürün sepette yok, yeni ürün olarak ekle
        const newItem = { ...product, quantity };
        updatedCartItems.push(newItem);
      }

      // Local storage güncelle
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);

      // Sepet güncellendiğinde event dispatch et
      const event = new Event("cartChange");
      window.dispatchEvent(event);

      // updatingItems'i false olarak ayarla, işlem tamamlandı
      setUpdatingItems({ ...updatingItems, [product.STKKOD]: false });

      toast.success("Ürün sepete eklendi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 2000);
  };

  return (
    <div className="bg-white w-screen md:w-[750px] lg:w-[970px] xl:w-[1188px] pt-[30px] lg:pt-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center sm:mx-[35px] mb-[30px] px-[15px]">
        {selectedCategory.map((product, index) => {
          const cartQuantity = getCartItemQuantity(product.STKKOD);
         // const availableStock = product.stock - cartQuantity || 5;
          return (
            <div
              key={product.STKKOD}
              className="relative p-[10px] sm:p-[20px] border border-ProductsBorder rounded-md shadow-sm transition duration-300 ease-in-out transform hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-row sm:flex-col items-center sm:justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
             
      

              {isItemInCart(product.STKKOD) && (
                <p className="absolute flex flex-row items-center gap-2 top-0 left-0 transform  stext-[12px] sm:text-[16px] font-bold text-LightBlue py-2 px-4 z-1000 bg-white rounded-md">
                  <FaShoppingCart className="" />
                  <span>Sepette</span>
                </p>
              )}

              <div className="w-2/5 sm:w-full mr-[10px] sm:mr-0">
                <Link
                 // href={product.link}
                 href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoFlAxVE8y3npp0rwvV2k4uMP3PNkjjPSjQ&s"//{product.imagesrc}

                  className="flex items-center justify-center"
                >
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoFlAxVE8y3npp0rwvV2k4uMP3PNkjjPSjQ&s"//{product.imagesrc}
                    alt={product.STKCINSI}
                    className="object-cover w-[140px] md:w-[210px] h-[140px] md:h-[210px]"
                    width={210}
                    height={210}
                  />
                </Link>
              </div>

              <div className="w-3/5 sm:w-full flex flex-col justify-between">
                <div
                 // className={`text-left md:pt-[15px] min-h-12 md:min-h-20 ${
                   // product.discount ? "mr-12 sm:mr-0" : ""  }`}
                >
                  <Link
                    //href={product.link}
                    href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoFlAxVE8y3npp0rwvV2k4uMP3PNkjjPSjQ&s"
                    //{product.imagesrc}
                    className="font-bold text-[14px] md:text-[16px] text-CustomGray leading-tight"
                  >
                    <p>{product.STKCINSI}</p>
                  </Link>
                </div>
                <div className="flex-none">
                  <div>
                    {product.STKOZKOD5 && (
                      <p className="italic text-LightBlue text-[20px] md:text-[23px] sm:pt-[20px] font-semibold">
                        <span>₺</span>
                        {calculateDiscountedPrice(
                          product.STKOZKOD5.replace(",", "."),
                         // product.discount
                        )}
                      </p>
                    )}
                  </div>
                  {
                    <>
                      <div className="flex mt-[20px]">
                        <Formik
                          initialValues={{ quantity: 1 }}
                          validationSchema={Yup.object({
                            quantity: Yup.number()
                              .min(1, "En az 1 adet girebilirsiniz")
                              .max(
                                availableStock,
                                `En fazla ${availableStock} adet girebilirsiniz`
                              )
                              .required("Bir miktar girin"),
                          })}
                          onSubmit={(values) => {
                            addToCart(product, values.quantity);
                          }}
                        >
                          {({ errors, touched, values, setFieldValue }) => (
                            <Form>
                              <div className="flex flex-col items-center justify-center text-LightBlue">
                                <div className="flex flex-row items-center justify-center">
                                  <div className="flex flex-row rounded-full">
                                   
                                   
                                   
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentValue = values.quantity;
                                        const newValue =
                                          currentValue > 1
                                            ? currentValue - 1
                                            : 1;
                                        setFieldValue("quantity", newValue);
                                      }}
                                      className="text-sm sm:text-md text-LightBlue hover:scale-110 transition duration-500 ease-in-out transform"
                                    >
                                      <FaMinus />
                                    </button>
                                    <Field
                                      min="1"
                                      max={availableStock}
                                      name="quantity"
                                      className="w-6 text-center outline-none text-CustomGray"
                                    />


                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentValue = values.quantity;
                                        const newValue =
                                          currentValue < availableStock
                                            ? currentValue + 1
                                            : availableStock;
                                        setFieldValue("quantity", newValue);
                                        if (newValue === availableStock) {
                                          toast.error(
                                            "Bu üründen daha fazla eklenemez. Sınırlı stok.",
                                            {
                                              position: "top-right",
                                              autoClose: 2000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                            }
                                          );
                                        }
                                      }}
                                      className={`text-sm sm:text-md ${
                                        values.quantity >= availableStock
                                          ? "text-gray-400 cursor-not-allowed"
                                          : "text-LightBlue hover:scale-110"
                                      } transition duration-500 ease-in-out transform`}
                                      disabled={
                                        values.quantity >= availableStock
                                      }
                                    >
                                      <FaPlus />
                                    </button>



                                  </div>












                                  <button
                                    type="submit"
                                    className="flex flex-row items-center justify-center gap-2 ml-2 sm:ml-4 lg:ml-2 text-white font-bold hover:scale-105 transition-all transform easy-in-out duration-500 cursor-pointer bg-LightBlue/75 pl-2 pr-9 py-2 rounded-full relative w-[130px] sm:w-[160px] h-[40px] text-[13px] sm:text-[15px]"
                                  >
                                    {updatingItems[product.STKKOD] ? (
                                      <div className="flex flex-row items-center justify-center gap-1">
                                        <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                        <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                        <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                      </div>
                                    ) : (
                                      "Sepete Ekle"
                                    )}
                                    <span
                                      className={`absolute -top-1 -right-2 text-white bg-gradient-to-r from-sky-600 to-cyan-700 p-3 border-4 border-white rounded-full transition-all duration-500 ease-out transform`}
                                    >
                                      {isItemInCart(product.STKKOD) ? (
                                        <FaCheck
                                          className={`transition-all duration-1000 ease-out transform ${
                                            isItemInCart(product.STKKOD)
                                              ? "scale-100"
                                              : "scale-0"
                                          }`}
                                        />
                                      ) : (
                                        <FaPlus />
                                      )}
                                    </span>
                                  </button>
                                </div>
                                {errors.quantity && touched.quantity && (
                                  <div className="text-red-500">
                                    {errors.quantity}
                                  </div>
                                )}
                              </div>
                            </Form>
                          )}

















                        </Formik>
                      </div>
                    </>



                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductCardB;