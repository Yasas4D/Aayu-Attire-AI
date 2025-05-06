
import { ProductType } from "@/components/product/ProductCard";

export const products: ProductType[] = [
  {
    id: 1,
    name: "Elegant Maxi Dress",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dresses",
    colors: ["#000000", "#6B7280", "#FFFFFF"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dresses",
    colors: ["#FFFFFF", "#F9A8D4", "#FEF08A"],
    sizes: ["S", "M", "L"],
    isNew: true
  },
  {
    id: 3,
    name: "Essential Black Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dresses",
    colors: ["#000000"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true
  },
  {
    id: 4,
    name: "Bohemian Maxi Dress",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dresses",
    colors: ["#FFFFFF", "#D1FAE5", "#FEF9C3"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Outerwear",
    colors: ["#1D4ED8", "#000000"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Oversized Sweater",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Tops",
    colors: ["#FFFFFF", "#D1D5DB", "#000000"],
    sizes: ["S", "M", "L"],
    isNew: true
  },
  {
    id: 7,
    name: "High-Waist Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Bottoms",
    colors: ["#1D4ED8", "#000000", "#D1D5DB"],
    sizes: ["24", "26", "28", "30", "32"]
  },
  {
    id: 8,
    name: "Silk Blouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Tops",
    colors: ["#FFFFFF", "#FB7185", "#000000"],
    sizes: ["XS", "S", "M", "L"],
    isFeatured: true
  }
];

export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Summer Collection 2025",
    subtitle: "Discover our new collection of elegant and lightweight dresses perfect for the summer season.",
    cta: "Shop Now",
    link: "/shop"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Elegant Essentials",
    subtitle: "Timeless pieces designed to elevate your everyday style with comfort and sophistication.",
    cta: "Explore Collection",
    link: "/shop"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Sustainable Fashion",
    subtitle: "Eco-conscious clothing made with care for both you and the planet.",
    cta: "Learn More",
    link: "/about"
  }
];

export const filterOptions = {
  categories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Blue", value: "#1D4ED8" },
    { name: "Gray", value: "#6B7280" },
    { name: "Pink", value: "#FB7185" },
    { name: "Yellow", value: "#FEF08A" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  priceRange: [0, 200] as [number, number],
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterProducts = (filters: Record<string, any>) => {
  return products.filter(product => {
    // Filter by search term
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !product.category.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0 && 
        !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Filter by colors
    if (filters.colors && filters.colors.length > 0 && 
        !product.colors.some((color: string) => filters.colors.includes(color))) {
      return false;
    }
    
    // Filter by sizes
    if (filters.sizes && filters.sizes.length > 0 && 
        !product.sizes.some((size: string) => filters.sizes.includes(size))) {
      return false;
    }
    
    // Filter by price
    if (filters.price && (product.price < filters.price[0] || product.price > filters.price[1])) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by different criteria
    if (filters.sortBy === "price_low_high") {
      return a.price - b.price;
    } else if (filters.sortBy === "price_high_low") {
      return b.price - a.price;
    } else if (filters.sortBy === "name_asc") {
      return a.name.localeCompare(b.name);
    } else if (filters.sortBy === "name_desc") {
      return b.name.localeCompare(a.name);
    }
    
    // Default: newest (id as proxy for newest)
    return b.id - a.id;
  });
};
