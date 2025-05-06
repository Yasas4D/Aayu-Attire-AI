import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  productReviews, type ProductReview, type InsertProductReview,
  contactMessages, type ContactMessage, type InsertContactMessage,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Product Review methods
  getProductReviews(productId: number): Promise<ProductReview[]>;
  createProductReview(review: InsertProductReview): Promise<ProductReview>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private productReviews: Map<number, ProductReview>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private reviewCurrentId: number;
  private messageCurrentId: number;
  private subscriptionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.productReviews = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.reviewCurrentId = 1;
    this.messageCurrentId = 1;
    this.subscriptionCurrentId = 1;
    
    // Initialize with demo products
    this.initDemoProducts();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured
    );
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Product Review methods
  async getProductReviews(productId: number): Promise<ProductReview[]> {
    return Array.from(this.productReviews.values()).filter(
      (review) => review.productId === productId
    );
  }
  
  async createProductReview(insertReview: InsertProductReview): Promise<ProductReview> {
    const id = this.reviewCurrentId++;
    const review: ProductReview = { ...insertReview, id };
    this.productReviews.set(id, review);
    
    // Update the product's review count
    const product = this.products.get(review.productId);
    if (product) {
      const productReviews = await this.getProductReviews(product.id);
      const reviewCount = productReviews.length;
      const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
      const avgRating = totalRating / reviewCount;
      
      await this.updateProduct(product.id, {
        rating: avgRating,
        reviews: reviewCount
      });
    }
    
    return review;
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
  
  // Newsletter methods
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email
    );
    
    if (existingSubscription) {
      return existingSubscription;
    }
    
    const id = this.subscriptionCurrentId++;
    const subscription: NewsletterSubscription = { ...insertSubscription, id };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  // Initialize demo data
  private initDemoProducts() {
    const demoProducts: InsertProduct[] = [
      {
        name: "Floral Summer Dress",
        description: "A beautiful floral dress perfect for summer days and special occasions. Made from lightweight, breathable fabric with a flattering fit.",
        price: 59.99,
        category: "dresses",
        images: [
          "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["blue", "pink", "green"],
        rating: 4.5,
        reviews: 24,
        isFeatured: true,
        isNew: true,
        isSale: false,
        isBestSeller: false,
        stock: 50
      },
      {
        name: "Casual Linen Blouse",
        description: "A comfortable and stylish linen blouse perfect for casual outings. Features a relaxed fit and breathable fabric.",
        price: 45.99,
        category: "tops",
        images: [
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["white", "blue", "black"],
        rating: 4,
        reviews: 18,
        isFeatured: false,
        isNew: true,
        isSale: false,
        isBestSeller: false,
        stock: 35
      },
      {
        name: "Classic Denim Jeans",
        description: "Timeless denim jeans that combine style and comfort. Features a classic cut and durable material for everyday wear.",
        price: 79.99,
        category: "bottoms",
        images: [
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["blue", "black", "white"],
        rating: 5,
        reviews: 32,
        isFeatured: true,
        isNew: false,
        isSale: false,
        isBestSeller: false,
        stock: 60
      },
      {
        name: "Elegant Evening Gown",
        description: "A stunning evening gown perfect for special occasions. Features an elegant silhouette with fine detailing.",
        price: 129.99,
        category: "dresses",
        images: [
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["black", "red", "blue"],
        rating: 4.5,
        reviews: 15,
        isFeatured: true,
        isNew: false,
        isSale: false,
        isBestSeller: true,
        stock: 25
      },
      {
        name: "Cocktail Party Dress",
        description: "A chic and sophisticated dress perfect for cocktail parties and semi-formal events. Features an elegant cut and premium fabric.",
        price: 89.99,
        category: "dresses",
        images: [
          "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["black", "red", "blue"],
        rating: 4.5,
        reviews: 22,
        isFeatured: true,
        isNew: false,
        isSale: false,
        isBestSeller: false,
        stock: 40
      },
      {
        name: "Comfort Fit Tee",
        description: "A versatile and comfortable t-shirt perfect for everyday wear. Made from soft, breathable cotton for all-day comfort.",
        price: 29.99,
        category: "tops",
        images: [
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["white", "black", "blue", "green", "pink"],
        rating: 4,
        reviews: 28,
        isFeatured: true,
        isNew: false,
        isSale: false,
        isBestSeller: false,
        stock: 100
      },
      {
        name: "High-Waisted Pants",
        description: "Stylish high-waisted pants that flatter your silhouette. Perfect for both casual and semi-formal occasions.",
        price: 59.99,
        comparePrice: 79.99,
        category: "bottoms",
        images: [
          "https://pixabay.com/get/g1a869830b4d7dcc0ef565fc2aea5d2c5541d66a4a83b74476ec2512f84678e2a3149f9393e8f4510b84a7bf04564175577b5ce6d04162f7ba31c5cb2d1170172_1280.jpg",
          "https://pixabay.com/get/g1a869830b4d7dcc0ef565fc2aea5d2c5541d66a4a83b74476ec2512f84678e2a3149f9393e8f4510b84a7bf04564175577b5ce6d04162f7ba31c5cb2d1170172_1280.jpg",
          "https://pixabay.com/get/g1a869830b4d7dcc0ef565fc2aea5d2c5541d66a4a83b74476ec2512f84678e2a3149f9393e8f4510b84a7bf04564175577b5ce6d04162f7ba31c5cb2d1170172_1280.jpg",
          "https://pixabay.com/get/g1a869830b4d7dcc0ef565fc2aea5d2c5541d66a4a83b74476ec2512f84678e2a3149f9393e8f4510b84a7bf04564175577b5ce6d04162f7ba31c5cb2d1170172_1280.jpg"
        ],
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["black", "blue", "white"],
        rating: 3.5,
        reviews: 19,
        isFeatured: true,
        isNew: false,
        isSale: true,
        isBestSeller: false,
        stock: 45
      },
      {
        name: "Statement Necklace",
        description: "A bold and eye-catching necklace that adds a touch of elegance to any outfit. Crafted with attention to detail for a premium look.",
        price: 39.99,
        category: "accessories",
        images: [
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
        ],
        sizes: ["one-size"],
        colors: ["gold", "silver"],
        rating: 4,
        reviews: 14,
        isFeatured: true,
        isNew: false,
        isSale: false,
        isBestSeller: false,
        stock: 30
      }
    ];
    
    // Add demo products to storage
    demoProducts.forEach(product => {
      this.createProduct(product);
    });
    
    // Add demo reviews
    const demoReviews: InsertProductReview[] = [
      {
        productId: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        rating: 5,
        comment: "I love this dress! The fabric is high quality and the fit is perfect. I've received many compliments wearing it.",
        date: new Date().toISOString()
      },
      {
        productId: 1,
        name: "Emily Rodriguez",
        email: "emily@example.com",
        rating: 4,
        comment: "Beautiful dress, exactly as pictured. Runs slightly large but still looks great.",
        date: new Date().toISOString()
      },
      {
        productId: 2,
        name: "Michael Chen",
        email: "michael@example.com",
        rating: 4,
        comment: "Bought this for my wife and she loves it. The material is soft and it looks great on her.",
        date: new Date().toISOString()
      }
    ];
    
    demoReviews.forEach(review => {
      this.createProductReview(review);
    });
  }
}

export const storage = new MemStorage();
