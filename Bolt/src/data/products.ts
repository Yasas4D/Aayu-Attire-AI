import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Cotton Kurta",
    description: "A beautiful handcrafted cotton kurta designed for comfort and style. Perfect for both casual and formal occasions.",
    price: 59.99,
    images: [
      "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6626967/pexels-photo-6626967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Women", "Traditional", "Tops"],
    colors: ["White", "Blue", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: 2,
    name: "Embroidered Silk Saree",
    description: "Luxurious embroidered silk saree with intricate patterns and golden border. An elegant choice for special occasions.",
    price: 149.99,
    images: [
      "https://images.pexels.com/photos/12004537/pexels-photo-12004537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3386892/pexels-photo-3386892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Women", "Traditional", "Sarees"],
    colors: ["Red", "Green", "Blue", "Gold"],
    sizes: ["Standard"],
    isFeatured: true,
    stock: 15
  },
  {
    id: 3,
    name: "Modern Fitted Blazer",
    description: "A sleek, modern-cut blazer perfect for professional settings or evening occasions. Tailored to perfection.",
    price: 89.99,
    discountPrice: 69.99,
    images: [
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1192578/pexels-photo-1192578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Men", "Formal", "Outerwear"],
    colors: ["Black", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 30
  },
  {
    id: 4,
    name: "Printed Summer Dress",
    description: "Light and flowy summer dress with a beautiful floral print. Perfect for beach days or casual outings.",
    price: 49.99,
    images: [
      "https://images.pexels.com/photos/6626752/pexels-photo-6626752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6626764/pexels-photo-6626764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Women", "Casual", "Dresses"],
    colors: ["Floral", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    stock: 20
  },
  {
    id: 5,
    name: "Classic Linen Shirt",
    description: "Breathable linen shirt for a casual yet sophisticated look. Ideal for warm weather and relaxed settings.",
    price: 45.99,
    images: [
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1184590/pexels-photo-1184590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Men", "Casual", "Shirts"],
    colors: ["White", "Beige", "Light Blue"],
    sizes: ["S", "M", "L", "XL"],
    stock: 35
  },
  {
    id: 6,
    name: "Designer Lehenga Set",
    description: "Stunning designer lehenga set with detailed embroidery and matching dupatta. Perfect for weddings and celebrations.",
    price: 199.99,
    images: [
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2814491/pexels-photo-2814491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Women", "Traditional", "Sets"],
    colors: ["Red", "Pink", "Royal Blue"],
    sizes: ["S", "M", "L"],
    isFeatured: true,
    stock: 10
  },
  {
    id: 7,
    name: "Casual Denim Jacket",
    description: "Versatile denim jacket that pairs well with almost any outfit. A timeless addition to your wardrobe.",
    price: 69.99,
    discountPrice: 59.99,
    images: [
      "https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Unisex", "Casual", "Outerwear"],
    colors: ["Blue", "Light Blue", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 40
  },
  {
    id: 8,
    name: "Designer Suit Set",
    description: "Premium designer suit set including jacket, pants, and vest. Tailored for a perfect fit and elegant look.",
    price: 249.99,
    images: [
      "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1250426/pexels-photo-1250426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    categories: ["Men", "Formal", "Sets"],
    colors: ["Black", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isFeatured: true,
    stock: 15
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getCategories = (): string[] => {
  const allCategories = products.flatMap(product => product.categories);
  return [...new Set(allCategories)];
};