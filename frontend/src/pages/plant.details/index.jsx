import Navbar from "../../components/nav-bar";
import React, { useState } from "react";

function ProductDetailPage({ product }) {
  const [mainImage, setMainImage] = useState(product.mainImage);

  return (
    <div className="flex flex-col gap-12 min-h-screen p-4">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4">
        <div className="w-full md:w-2/3 flex justify-center items-center p-4">
          <img
            src={product.mainImage}
            alt={product.name}
            className="object-cover w-full max-h-[590px]"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg">{product.type}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <p>{product.description}</p>

          {/* Detail Images */}
          <div className="flex flex-col gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} detail ${index + 1}`}
                className="object-cover w-full h-24 md:h-32"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
