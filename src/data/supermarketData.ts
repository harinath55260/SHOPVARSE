import { Product, SupermarketCategory, SellerProfile, Coupon, FestivalOffer, SmartShoppingList } from '../types';

export const SUPERMARKET_CATEGORIES: {
  id: SupermarketCategory;
  name: string;
  icon: string;
  itemCount: number;
  description: string;
  image: string;
}[] = [
  { id: 'Rice & Grains', name: 'Rice & Grains', icon: '🍚', itemCount: 42, description: 'Basmati, Sona Masoori, Atta, Maida, Sooji & Poha', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
  { id: 'Pulses & Dal', name: 'Pulses & Dal', icon: '🫘', itemCount: 35, description: 'Toor, Moong, Chana, Urad & Masoor Dal', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&q=80' },
  { id: 'Masala & Spices', name: 'Masala & Spices', icon: '🌶️', itemCount: 58, description: 'Pure ground spices, whole garam masalas & blends', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80' },
  { id: 'Cooking Oils & Ghee', name: 'Cooking Oils & Ghee', icon: '🛢️', itemCount: 28, description: 'Sunflower, Mustard, Groundnut oils & Desi Cow Ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
  { id: 'Dairy & Eggs', name: 'Dairy & Eggs', icon: '🥛', itemCount: 44, description: 'Farm fresh milk, butter, paneer, curd, cheese & eggs', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80' },
  { id: 'Biscuits & Cookies', name: 'Biscuits & Cookies', icon: '🍪', itemCount: 39, description: 'Marie, Digestive, Cream biscuits, Choco fills & Rusk', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
  { id: 'Snacks', name: 'Snacks', icon: '🍿', itemCount: 50, description: 'Potato chips, namkeen mixtures, popcorn & bhujia', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
  { id: 'Beverages', name: 'Beverages', icon: '🥤', itemCount: 46, description: 'Tea leaves, instant coffee, fruit juices & sodas', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' },
  { id: 'Chocolates & Sweets', name: 'Chocolates & Sweets', icon: '🍫', itemCount: 34, description: 'Dairy Milk, KitKat, Kaju Katli, Gulab Jamun & candies', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
  { id: 'Instant & Ready Foods', name: 'Instant & Ready Foods', icon: '🍜', itemCount: 37, description: '2-min noodles, Italian pasta, ready gravies & mixes', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },
  { id: 'Sauces & Spreads', name: 'Sauces & Spreads', icon: '🥫', itemCount: 31, description: 'Tomato ketchups, fruit jams, mango pickles & mayonnaise', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80' },
  { id: 'Home Cleaning', name: 'Home Cleaning', icon: '🧼', itemCount: 41, description: 'Floor disinfectants, dishwash gels, toilet cleaners', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80' },
  { id: 'Personal Care', name: 'Personal Care', icon: '🧴', itemCount: 52, description: 'Bathing soaps, herbal shampoos, face washes & lotions', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
  { id: 'Oral Care', name: 'Oral Care', icon: '🪥', itemCount: 25, description: 'Toothpastes, sensitive toothbrushes & antibacterial rinses', image: 'https://images.unsplash.com/photo-1559591937-e1032b4eb528?w=400&q=80' },
  { id: 'Paper & Household', name: 'Paper & Household', icon: '🧻', itemCount: 22, description: 'Facial tissues, multi-ply toilet rolls & kitchen towels', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400&q=80' },
  { id: 'Laundry', name: 'Laundry', icon: '🧺', itemCount: 29, description: 'Detergent powders, matic liquids & fabric softeners', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80' },
  { id: 'Kitchen Essentials', name: 'Kitchen Essentials', icon: '🍳', itemCount: 33, description: 'Airtight storage containers, chef knives & dinnerware', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80' },
  { id: 'Home Essentials', name: 'Home Essentials', icon: '🏠', itemCount: 27, description: 'Heavy-duty buckets, plastic mugs, cloth hangers & organizers', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80' },
  { id: 'Stationery', name: 'Stationery', icon: '✏️', itemCount: 30, description: 'School notebooks, gel pens, marker sets & highlighters', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80' },
  { id: 'Baby Care', name: 'Baby Care', icon: '👶', itemCount: 26, description: 'Tear-free shampoos, baby wipes, gentle soaps & diapers', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80' },
  { id: 'Beauty & Grooming', name: 'Beauty & Grooming', icon: '💄', itemCount: 38, description: 'Moisturizing skin creams, hair nourishment & shaving kits', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
  { id: 'Pet Care', name: 'Pet Care', icon: '🐶', itemCount: 20, description: 'Nutritious dog/cat food, non-slip bowls & grooming combs', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80' },
  { id: 'Packaged Foods', name: 'Packaged Foods', icon: '🧃', itemCount: 32, description: 'Whole rolled oats, corn flakes & nutritious seeds', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
  { id: 'Dry Fruits & Nuts', name: 'Dry Fruits & Nuts', icon: '🌾', itemCount: 27, description: 'California almonds, whole cashews, Arabian dates & raisins', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80' },
  { id: 'Frozen Foods', name: 'Frozen Foods', icon: '🧊', itemCount: 23, description: 'Frozen green peas, French fries, spring rolls & ice creams', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' },
  { id: 'Breakfast Items', name: 'Breakfast Items', icon: '☕', itemCount: 36, description: 'Cereals, multigrain breads, organic honey & hazelnut spreads', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80' },
  { id: 'Bakery', name: 'Bakery', icon: '🥖', itemCount: 24, description: 'Freshly baked whole wheat breads, pav buns & tea cakes', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { id: 'Salt & Sugar', name: 'Salt & Sugar', icon: '🧂', itemCount: 18, description: 'Iodised vacuum salts, rock salt, sulfurless sugar & jaggery', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&q=80' },
];

export const SUPERMARKET_PRODUCTS: Product[] = [
  // 01. RICE & GRAINS
  {
    id: 'prod-rg-01',
    name: 'India Gate Basmati Rice Feast Rozzana',
    slug: 'india-gate-basmati-rice-5kg',
    brand: 'India Gate',
    category: 'Rice & Grains',
    subcategory: 'Basmati Rice',
    mrp: 499,
    price: 389,
    discountPercentage: 22,
    finalPrice: 389,
    unit: '5 kg',
    stock: 150,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.6,
    reviewCount: 3840,
    sku: 'RICE-IG-5KG',
    barcode: '8901414002345',
    availability: 'In Stock',
    model3D: 'grain_sack',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Best Seller',
    isFeatured: true,
    isTrending: true,
    offer: 'Save ₹110 today',
    description: 'Aged long-grain aromatic Basmati rice ideal for everyday biryani, pulao, and fried rice. Non-sticky and fluffy texture after cooking.',
    ingredients: '100% Pure Aged Long Grain Basmati Rice',
    expiryDate: '24 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80'
    ],
    specifications: {
      'Grain Type': 'Long Grain Aged',
      'Cooking Time': '15-18 mins',
      'Aroma': 'Delicate Sweet Fragrance',
      'Packaging': 'Airtight Poly Bag with Handle'
    },
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-rg-02',
    name: 'Aashirvaad Superior MP Sharbati Atta',
    slug: 'aashirvaad-sharbati-atta-5kg',
    brand: 'Aashirvaad',
    category: 'Rice & Grains',
    subcategory: 'Atta & Flour',
    mrp: 320,
    price: 275,
    discountPercentage: 14,
    finalPrice: 275,
    unit: '5 kg',
    stock: 85,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.8,
    reviewCount: 6120,
    sku: 'ATTA-AASH-5KG',
    barcode: '8901725010041',
    availability: 'In Stock',
    model3D: 'grain_sack',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Pantry Essential',
    isFeatured: true,
    offer: 'Flat ₹45 OFF',
    description: 'Ground from 100% pure golden grains harvested from Madhya Pradesh Sehore fields. Makes exceptionally soft, golden rotis that stay tender for hours.',
    ingredients: '100% Whole Wheat Sharbati Grains',
    expiryDate: '6 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80'
    ],
    specifications: {
      'Processing': 'Traditional Stone Chakki Milled',
      'Fiber Content': 'Rich in Natural Dietary Fiber',
      'Roti Softness': 'Tested 6-Hour Softness Guarantee'
    },
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-rg-03',
    name: 'Fortune Thick Poha (Flattened Rice)',
    slug: 'fortune-thick-poha-1kg',
    brand: 'Fortune',
    category: 'Rice & Grains',
    subcategory: 'Poha & Flakes',
    mrp: 75,
    price: 58,
    discountPercentage: 22,
    finalPrice: 58,
    unit: '1 kg',
    stock: 220,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.5,
    reviewCount: 940,
    sku: 'POHA-FORT-1KG',
    barcode: '8906007281923',
    availability: 'In Stock',
    model3D: 'grain_sack',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    description: 'High quality hygienic flattened rice flakes, light on stomach, perfect for quick breakfast Kanda Poha.',
    ingredients: '100% Flattened Rice Flakes',
    expiryDate: '9 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&q=80'
    ],
    specifications: {
      'Grade': 'Thick Flattened Flakes',
      'Iron Fortified': 'Yes'
    },
    createdAt: '2026-01-15'
  },

  // 02. PULSES & DAL
  {
    id: 'prod-pd-01',
    name: 'Tata Sampann Unpolished Toor Dal',
    slug: 'tata-sampann-toor-dal-1kg',
    brand: 'Tata Sampann',
    category: 'Pulses & Dal',
    subcategory: 'Toor Dal',
    mrp: 195,
    price: 168,
    discountPercentage: 14,
    finalPrice: 168,
    unit: '1 kg',
    stock: 120,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.7,
    reviewCount: 2890,
    sku: 'DAL-TATA-TOOR-1KG',
    barcode: '8901015004123',
    availability: 'In Stock',
    model3D: 'pouch_dal',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Unpolished & Pure',
    isFeatured: true,
    description: 'Unpolished pigeon peas without artificial water, oil, or leather polish. Retains wholesome natural nutrients and authentic flavor.',
    ingredients: '100% Unpolished Arhar/Toor Dal',
    expiryDate: '12 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&q=80'
    ],
    specifications: {
      'Polish': 'Zero Chemical Polish',
      'Protein': '22g per 100g'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-pd-02',
    name: 'Tata Sampann Moong Dal Dhuli',
    slug: 'tata-sampann-moong-dal-1kg',
    brand: 'Tata Sampann',
    category: 'Pulses & Dal',
    subcategory: 'Moong Dal',
    mrp: 180,
    price: 149,
    discountPercentage: 17,
    finalPrice: 149,
    unit: '1 kg',
    stock: 90,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.6,
    reviewCount: 1430,
    sku: 'DAL-TATA-MOONG-1KG',
    barcode: '8901015004130',
    availability: 'In Stock',
    model3D: 'pouch_dal',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    description: 'High-protein yellow split moong dal, easy to digest and perfect for comforting dal tadka, khichdi, and soups.',
    ingredients: '100% Split Washed Moong Dal',
    expiryDate: '12 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=600&q=80'
    ],
    specifications: {
      'Dietary Preference': 'Vegetarian, High Protein',
      'Packaging': 'Poly Pouch'
    },
    createdAt: '2026-01-18'
  },

  // 03. MASALA & SPICES
  {
    id: 'prod-ms-01',
    name: 'Everest Tikhalal Red Chilli Powder',
    slug: 'everest-tikhalal-chilli-powder-200g',
    brand: 'Everest',
    category: 'Masala & Spices',
    subcategory: 'Chilli Powder',
    mrp: 98,
    price: 82,
    discountPercentage: 16,
    finalPrice: 82,
    unit: '200 g',
    stock: 240,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 4210,
    sku: 'SPICE-EV-TIKH-200G',
    barcode: '8901786001201',
    availability: 'In Stock',
    model3D: 'spice_jar',
    sellerId: 'sel-02',
    sellerName: 'Masala Kendra Direct',
    badge: 'Sharp Spice',
    description: 'Prepared from select sun-dried stemless red chillies, giving vibrant natural red color and sizzling pungent heat to curries.',
    ingredients: 'Ground Dried Red Chillies',
    expiryDate: '12 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'
    ],
    specifications: {
      'Heat Level': 'Medium High',
      'Preservatives': 'None'
    },
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-ms-02',
    name: 'MDH Deggi Mirch (Natural Color & Mild Heat)',
    slug: 'mdh-deggi-mirch-100g',
    brand: 'MDH',
    category: 'Masala & Spices',
    subcategory: 'Chilli Powder',
    mrp: 85,
    price: 74,
    discountPercentage: 13,
    finalPrice: 74,
    unit: '100 g',
    stock: 180,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 5120,
    sku: 'SPICE-MDH-DEG-100G',
    barcode: '8901282001018',
    availability: 'In Stock',
    model3D: 'spice_jar',
    sellerId: 'sel-02',
    sellerName: 'Masala Kendra Direct',
    description: 'Blend of selected red peppers and Kashmiri chillies that imparts glowing natural color and mild appetizing spice.',
    ingredients: 'Kashmiri Chillies, Red Pepper Blend',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'
    ],
    specifications: {
      'Origin': 'India',
      'Net Quantity': '100g'
    },
    createdAt: '2026-01-22'
  },

  // 04. COOKING OILS & GHEE
  {
    id: 'prod-og-01',
    name: 'Fortune Sunlite Refined Sunflower Oil Pouch',
    slug: 'fortune-sunflower-oil-1l',
    brand: 'Fortune',
    category: 'Cooking Oils & Ghee',
    subcategory: 'Sunflower Oil',
    mrp: 165,
    price: 139,
    discountPercentage: 16,
    finalPrice: 139,
    unit: '1 L',
    stock: 140,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.7,
    reviewCount: 7800,
    sku: 'OIL-FORT-SUN-1L',
    barcode: '8906007281008',
    availability: 'In Stock',
    model3D: 'oil_bottle',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Heart Friendly',
    isFeatured: true,
    description: 'Light, healthy, fortified with Vitamin A and Vitamin D. High smoke point ideal for frying and daily sautéing.',
    ingredients: 'Refined Sunflower Oil, Vitamin A, Vitamin D',
    expiryDate: '9 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80'
    ],
    specifications: {
      'Extraction': 'Refined Sunflower Seed',
      'Cholesterol': '0mg'
    },
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-og-02',
    name: 'Amul Pure Desi Ghee Tin',
    slug: 'amul-pure-ghee-1l',
    brand: 'Amul',
    category: 'Cooking Oils & Ghee',
    subcategory: 'Ghee',
    mrp: 650,
    price: 585,
    discountPercentage: 10,
    finalPrice: 585,
    unit: '1 L',
    stock: 65,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.9,
    reviewCount: 9200,
    sku: 'GHEE-AMUL-1L',
    barcode: '8901262010054',
    availability: 'In Stock',
    model3D: 'oil_bottle',
    sellerId: 'sel-03',
    sellerName: 'Amul Official Dairy Depot',
    badge: 'Aromatic Pure Ghee',
    isFeatured: true,
    description: 'Granular golden desi ghee crafted from pure fresh cream with mouth-watering aroma and rich traditional taste.',
    ingredients: 'Pure Milk Fat (Cow & Buffalo Milk)',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1589927986086-3d10faab4929?w=600&q=80'
    ],
    specifications: {
      'Texture': 'Granular Danedar',
      'Purity': '100% Pure Milk Ghee'
    },
    createdAt: '2026-01-15'
  },

  // 05. DAIRY & EGGS
  {
    id: 'prod-de-01',
    name: 'Amul Taaza Homogenised Toned Milk (Tetra Pak)',
    slug: 'amul-taaza-milk-1l',
    brand: 'Amul',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    mrp: 74,
    price: 72,
    discountPercentage: 3,
    finalPrice: 72,
    unit: '1 L',
    stock: 310,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 11200,
    sku: 'MILK-AMUL-TAAZA-1L',
    barcode: '8901262012010',
    availability: 'In Stock',
    model3D: 'milk_carton',
    sellerId: 'sel-03',
    sellerName: 'Amul Official Dairy Depot',
    badge: 'Daily Essential',
    isTrending: true,
    description: 'UHT treated homogenised toned milk in aseptic 6-layer Tetra Pak. Requires zero boiling before drinking; shelf-stable until opened.',
    ingredients: 'Toned Milk, Vitamin A, Vitamin D',
    expiryDate: '180 Days (Unopened)',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80'
    ],
    specifications: {
      'Fat': '3.0% Min',
      'SNF': '8.5% Min',
      'Storage': 'Room temperature until opened'
    },
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-de-02',
    name: 'Amul Pasteurised Salted Butter',
    slug: 'amul-butter-500g',
    brand: 'Amul',
    category: 'Dairy & Eggs',
    subcategory: 'Butter',
    mrp: 275,
    price: 260,
    discountPercentage: 5,
    finalPrice: 260,
    unit: '500 g',
    stock: 145,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 8400,
    sku: 'BUTTER-AMUL-500G',
    barcode: '8901262010016',
    availability: 'In Stock',
    model3D: 'milk_carton',
    sellerId: 'sel-03',
    sellerName: 'Amul Official Dairy Depot',
    badge: 'The Taste of India',
    isFeatured: true,
    description: 'Classic rich creamy pasteurised butter made from pure fresh milk cream and salt. Utterly butterly delicious on toast and parathas.',
    ingredients: 'Butter (Milk Fat 80%), Common Salt, Annatto color',
    expiryDate: '12 Months (Refrigerated)',
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80'
    ],
    specifications: {
      'Milk Fat': '80% minimum',
      'Storage': 'Keep refrigerated at 4°C'
    },
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-de-03',
    name: 'Farm Fresh White Table Eggs (Carton of 12)',
    slug: 'farm-fresh-white-eggs-12',
    brand: 'Farm Fresh',
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    mrp: 120,
    price: 99,
    discountPercentage: 18,
    finalPrice: 99,
    unit: 'Pack of 12',
    stock: 180,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.7,
    reviewCount: 3410,
    sku: 'EGGS-FF-12PK',
    barcode: '8904001928312',
    availability: 'In Stock',
    model3D: 'milk_carton',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'High Protein',
    description: 'Freshly sorted, washed and sanitised white eggs packed with 6g natural protein per egg. Carefully cushioned in recyclable egg carton.',
    ingredients: 'Farm Fresh Poultry White Eggs',
    expiryDate: '21 Days from Laying',
    images: [
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&q=80'
    ],
    specifications: {
      'Egg Count': '12 Pieces',
      'Protein': '6g per egg'
    },
    createdAt: '2026-01-20'
  },

  // 06. BISCUITS & COOKIES
  {
    id: 'prod-bc-01',
    name: 'Britannia Good Day Butter Cookies Value Pack',
    slug: 'britannia-good-day-butter-600g',
    brand: 'Britannia',
    category: 'Biscuits & Cookies',
    subcategory: 'Cookies',
    mrp: 140,
    price: 112,
    discountPercentage: 20,
    finalPrice: 112,
    unit: '600 g',
    stock: 210,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.7,
    reviewCount: 4600,
    sku: 'BISC-BRIT-GD-600G',
    barcode: '8901063013201',
    availability: 'In Stock',
    model3D: 'cookie_pack',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Smile Guarantee',
    description: 'Crispy butter cookies baked with real butter and adorned with signature smiling grooves. Perfect companion for afternoon tea.',
    ingredients: 'Refined Wheat Flour, Sugar, Butter (2%), Milk Solids',
    expiryDate: '6 Months',
    images: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80'
    ],
    specifications: {
      'Flavor': 'Butter & Cashew Notes',
      'Dietary': 'Vegetarian'
    },
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-bc-02',
    name: 'Oreo Original Vanilla Creme Sandwich Biscuits',
    slug: 'oreo-vanilla-creme-300g',
    brand: 'Cadbury Oreo',
    category: 'Biscuits & Cookies',
    subcategory: 'Cream Biscuits',
    mrp: 90,
    price: 75,
    discountPercentage: 17,
    finalPrice: 75,
    unit: '300 g',
    stock: 190,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 7800,
    sku: 'BISC-OREO-VAN-300G',
    barcode: '7622201419382',
    availability: 'In Stock',
    model3D: 'cookie_pack',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    description: 'Crisp chocolate biscuit discs filled with signature sweet vanilla cream. Twist, lick and dunk in chilled milk.',
    ingredients: 'Cocoa Solids, Sugar, Wheat Flour, Vanilla Creme',
    expiryDate: '9 Months',
    images: [
      'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&q=80'
    ],
    specifications: {
      'Flavor': 'Rich Cocoa & Sweet Cream',
      'Contains': 'Wheat & Soy'
    },
    createdAt: '2026-01-24'
  },

  // 07. SNACKS
  {
    id: 'prod-sn-01',
    name: "Lay's India's Magic Masala Potato Chips",
    slug: 'lays-magical-masala-chips-115g',
    brand: "Lay's",
    category: 'Snacks',
    subcategory: 'Chips & Crisps',
    mrp: 50,
    price: 45,
    discountPercentage: 10,
    finalPrice: 45,
    unit: '115 g',
    stock: 350,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 9800,
    sku: 'SNK-LAYS-MASALA-115G',
    barcode: '8901491102901',
    availability: 'In Stock',
    model3D: 'chips_bag',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Top Munchie',
    isTrending: true,
    description: 'Sliced from fresh farm potatoes, fried to golden crunch and dusted with aromatic blend of Indian herbs and spices.',
    ingredients: 'Potatoes, Edible Vegetable Oil, Spices & Condiments',
    expiryDate: '4 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80'
    ],
    specifications: {
      'Flavor': 'Spicy Tangy Magic Masala',
      'Net Weight': '115g'
    },
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-sn-02',
    name: "Haldiram's Nagpur Aloo Bhujia Sev",
    slug: 'haldirams-aloo-bhujia-400g',
    brand: "Haldiram's",
    category: 'Snacks',
    subcategory: 'Namkeen',
    mrp: 120,
    price: 99,
    discountPercentage: 18,
    finalPrice: 99,
    unit: '400 g',
    stock: 210,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 8400,
    sku: 'SNK-HALD-ALOO-400G',
    barcode: '8904004401201',
    availability: 'In Stock',
    model3D: 'chips_bag',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    description: 'Crispy crunchy potato and gram flour noodles tossed in tangy mint and spice seasoning. Classic chai companion.',
    ingredients: 'Potatoes, Gram Flour, Moth Dal, Mint Powder, Spices',
    expiryDate: '6 Months',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
    ],
    specifications: {
      'Vegetarian': '100% Veg',
      'Packaging': 'Nitrogen Flushed Pouch'
    },
    createdAt: '2026-01-26'
  },

  // 08. BEVERAGES
  {
    id: 'prod-bv-01',
    name: 'Tata Tea Gold Aromatic Leaf & CTC Tea',
    slug: 'tata-tea-gold-500g',
    brand: 'Tata Tea',
    category: 'Beverages',
    subcategory: 'Tea',
    mrp: 320,
    price: 279,
    discountPercentage: 13,
    finalPrice: 279,
    unit: '500 g',
    stock: 140,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 6540,
    sku: 'BEV-TATA-GOLD-500G',
    barcode: '8901052002341',
    availability: 'In Stock',
    model3D: 'beverage_can',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Royal Aroma',
    isFeatured: true,
    description: 'Exquisite blend of rich Assam CTC tea grains infused with 15% long gentle aroma leaves for an irresistible morning cup.',
    ingredients: 'CTC Black Tea (85%), Gently Rolled Long Tea Leaves (15%)',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80'
    ],
    specifications: {
      'Flavor Profile': 'Rich Kadak Taste with Floral Aroma',
      'Form': 'Granules & Whole Leaf Blend'
    },
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-bv-02',
    name: 'Nescafe Classic 100% Pure Instant Coffee Glass Jar',
    slug: 'nescafe-classic-coffee-100g',
    brand: 'Nescafe',
    category: 'Beverages',
    subcategory: 'Coffee',
    mrp: 230,
    price: 199,
    discountPercentage: 13,
    finalPrice: 199,
    unit: '100 g',
    stock: 160,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 7100,
    sku: 'BEV-NESC-CLASSIC-100G',
    barcode: '8901058852309',
    availability: 'In Stock',
    model3D: 'beverage_can',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    description: 'Distinctive roast gives deep, full aroma and robust coffee flavor that jumpstarts your mornings instantly.',
    ingredients: '100% Pure Natural Coffee Granules',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80'
    ],
    specifications: {
      'Roast': 'Medium-Dark',
      'Container': 'Glass Jar with Airtight Cap'
    },
    createdAt: '2026-01-19'
  },

  // 09. CHOCOLATES & SWEETS
  {
    id: 'prod-cs-01',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    slug: 'cadbury-dairy-milk-silk-150g',
    brand: 'Cadbury',
    category: 'Chocolates & Sweets',
    subcategory: 'Chocolate Bars',
    mrp: 190,
    price: 165,
    discountPercentage: 13,
    finalPrice: 165,
    unit: '150 g',
    stock: 125,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 14200,
    sku: 'CHOC-CAD-SILK-150G',
    barcode: '7622201402315',
    availability: 'In Stock',
    model3D: 'chocolate_bar',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Silk Smoothness',
    isTrending: true,
    description: 'Unbelievably smooth and velvety milk chocolate that melts effortlessly on the tongue for pure bliss.',
    ingredients: 'Sugar, Milk Solids (25%), Cocoa Butter, Cocoa Solids',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80'
    ],
    specifications: {
      'Chocolate Type': 'Milk Chocolate',
      'Vegetarian': 'Yes'
    },
    createdAt: '2026-01-20'
  },

  // 10. INSTANT & READY FOODS
  {
    id: 'prod-ir-01',
    name: 'Maggi 2-Minute Masala Instant Noodles (Pack of 4)',
    slug: 'maggi-masala-noodles-4pack',
    brand: 'Maggi',
    category: 'Instant & Ready Foods',
    subcategory: 'Instant Noodles',
    mrp: 64,
    price: 56,
    discountPercentage: 12,
    finalPrice: 56,
    unit: '280 g (Pack of 4)',
    stock: 450,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 24500,
    sku: 'NOOD-MAGGI-MASALA-4PK',
    barcode: '8901058862902',
    availability: 'In Stock',
    model3D: 'noodle_pack',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'India’s Favorite',
    isFeatured: true,
    description: 'The iconic 2-minute noodle with roasted aromatic spice tastemaker. Fortified with Iron and made from quality wheat.',
    ingredients: 'Wheat Flour, Palm Oil, Salt, Roasted Spice Tastemaker',
    expiryDate: '9 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&q=80'
    ],
    specifications: {
      'Cooking Time': '2 Minutes',
      'Iron Fortified': 'Yes (15% Daily RDA per serve)'
    },
    createdAt: '2026-01-10'
  },

  // 11. SAUCES & SPREADS
  {
    id: 'prod-ss-01',
    name: 'Kissan Fresh Tomato Ketchup Squeezy Bottle',
    slug: 'kissan-tomato-ketchup-950g',
    brand: 'Kissan',
    category: 'Sauces & Spreads',
    subcategory: 'Tomato Ketchup',
    mrp: 140,
    price: 119,
    discountPercentage: 15,
    finalPrice: 119,
    unit: '950 g',
    stock: 160,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 5210,
    sku: 'SAUCE-KISS-KETCHUP-950G',
    barcode: '8901030382901',
    availability: 'In Stock',
    model3D: 'sauce_bottle',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    description: 'Made from 100% real ripe tomatoes, delivering balanced sweet & tangy punch that complements samosas, pakoras and burgers.',
    ingredients: 'Tomato Paste (28%), Sugar, Salt, Acidity Regulator, Spices',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80'
    ],
    specifications: {
      'Dispenser': 'Squeezy Cap Non-Drip Nozzle',
      'Real Tomato': '100% Sun Ripened'
    },
    createdAt: '2026-01-20'
  },

  // 12. HOME CLEANING
  {
    id: 'prod-hc-01',
    name: 'Lizol Surface Disinfectant Floor Cleaner Citrus',
    slug: 'lizol-disinfectant-citrus-1l',
    brand: 'Lizol',
    category: 'Home Cleaning',
    subcategory: 'Floor Cleaners',
    mrp: 230,
    price: 195,
    discountPercentage: 15,
    finalPrice: 195,
    unit: '1 L',
    stock: 140,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 8900,
    sku: 'CLN-LIZOL-CITRUS-1L',
    barcode: '8901396382019',
    availability: 'In Stock',
    model3D: 'cleaning_bottle',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: '99.9% Germ Kill',
    isFeatured: true,
    description: '10x better cleaning than standard phenylic fluids. Kills 99.9% germs, removes stubborn stains and leaves uplifting citrus freshness.',
    ingredients: 'Benzalkonium Chloride, Fragrance, Non-Ionic Surfactants',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80'
    ],
    specifications: {
      'Surface Safety': 'Marble, Granite, Ceramic, Tiles',
      'Fragrance': 'Zesty Citrus Lemon'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-hc-02',
    name: 'Vim Lemon Dishwash Liquid Gel',
    slug: 'vim-dishwash-gel-750ml',
    brand: 'Vim',
    category: 'Home Cleaning',
    subcategory: 'Dishwash',
    mrp: 160,
    price: 135,
    discountPercentage: 16,
    finalPrice: 135,
    unit: '750 ml',
    stock: 220,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 9200,
    sku: 'CLN-VIM-GEL-750ML',
    barcode: '8901030381003',
    availability: 'In Stock',
    model3D: 'cleaning_bottle',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    description: 'Concentrated lemon degreasing gel. Just 1 teaspoon cleans an entire sinkful of oily pots, utensils and glassware.',
    ingredients: 'Active Surfactants, Real Lemon Extracts, Green Dye',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?w=600&q=80'
    ],
    specifications: {
      'Degreasing Power': '1 Spoon per Sink',
      'Residue': 'Zero White Film'
    },
    createdAt: '2026-01-16'
  },

  // 13. PERSONAL CARE
  {
    id: 'prod-pc-01',
    name: 'Dove Deep Moisture Nourishing Bathing Bar (Pack of 3)',
    slug: 'dove-deep-moisture-soap-3pk',
    brand: 'Dove',
    category: 'Personal Care',
    subcategory: 'Soaps & Body Wash',
    mrp: 230,
    price: 189,
    discountPercentage: 18,
    finalPrice: 189,
    unit: '3 x 100 g',
    stock: 190,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 11500,
    sku: 'CARE-DOVE-MOIST-3PK',
    barcode: '8901030704901',
    availability: 'In Stock',
    model3D: 'soap_bar',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: '1/4 Moisturizing Cream',
    isFeatured: true,
    description: 'Formulated with 1/4 moisturizing cream and gentle cleansers that maintain skin natural moisture barrier without drying out skin.',
    ingredients: 'Sodium Lauroyl Isethionate, Stearic Acid, 1/4 Moisturizing Cream',
    expiryDate: '36 Months',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
    ],
    specifications: {
      'Skin Type': 'All Skin Types, Sensitive Skin',
      'pH Balanced': 'Yes'
    },
    createdAt: '2026-01-12'
  },

  // 14. ORAL CARE
  {
    id: 'prod-oc-01',
    name: 'Colgate Strong Teeth Dental Cream (Saver Pack)',
    slug: 'colgate-strong-teeth-500g',
    brand: 'Colgate',
    category: 'Oral Care',
    subcategory: 'Toothpaste',
    mrp: 240,
    price: 199,
    discountPercentage: 17,
    finalPrice: 199,
    unit: '500 g',
    stock: 280,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 9500,
    sku: 'ORAL-COLG-STRONG-500G',
    barcode: '8901314010201',
    availability: 'In Stock',
    model3D: 'toothpaste_tube',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: 'Calcium Boost',
    description: 'Unique Amino Shakti formula helps add natural calcium to teeth, making them 2x stronger against decay and cavities.',
    ingredients: 'Calcium Carbonate, Sodium Monofluorophosphate, Fresh Mint Flavor',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1559591937-e1032b4eb528?w=600&q=80'
    ],
    specifications: {
      'Fluoride Content': '1000 ppm',
      'Flavor': 'Signature Fresh Mint'
    },
    createdAt: '2026-01-14'
  },

  // 15. PAPER & HOUSEHOLD
  {
    id: 'prod-ph-01',
    name: 'Origami So Soft 3-Ply Luxury Toilet Rolls (Pack of 6)',
    slug: 'origami-toilet-rolls-6pk',
    brand: 'Origami',
    category: 'Paper & Household',
    subcategory: 'Toilet Paper',
    mrp: 270,
    price: 219,
    discountPercentage: 19,
    finalPrice: 219,
    unit: '6 Rolls',
    stock: 130,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.7,
    reviewCount: 2400,
    sku: 'PPR-ORIGAMI-3PLY-6PK',
    barcode: '8904001928410',
    availability: 'In Stock',
    model3D: 'paper_roll',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    description: 'Ultra-absorbent 3-ply embossed virgin fiber toilet tissue rolls. Gentle on skin and completely flushable.',
    ingredients: '100% Virgin Wood Pulp',
    images: [
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=600&q=80'
    ],
    specifications: {
      'Plies': '3-Ply Cushioned',
      'Roll Count': '6 Rolls, 180 pulls each'
    },
    createdAt: '2026-01-18'
  },

  // 16. LAUNDRY
  {
    id: 'prod-ln-01',
    name: 'Surf Excel Easy Wash Detergent Powder Bucket Saver',
    slug: 'surf-excel-easy-wash-2kg',
    brand: 'Surf Excel',
    category: 'Laundry',
    subcategory: 'Detergent Powder',
    mrp: 320,
    price: 269,
    discountPercentage: 16,
    finalPrice: 269,
    unit: '2 kg',
    stock: 180,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 13200,
    sku: 'LND-SURF-EASY-2KG',
    barcode: '8901030701023',
    availability: 'In Stock',
    model3D: 'detergent_box',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: 'Stain Eraser',
    isFeatured: true,
    description: 'Engineered with ultra-fine powder particles that dissolve instantly and eliminate stubborn grease, collar stains, and mud easily.',
    ingredients: 'Linear Alkyl Benzene Sulphonate, Sodium Carbonate, Brightening Agents',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&q=80'
    ],
    specifications: {
      'Application': 'Bucket Wash & Semi-Automatic Machines',
      'Fragrance': 'Fresh Blue Floral'
    },
    createdAt: '2026-01-15'
  },

  // 17. KITCHEN ESSENTIALS
  {
    id: 'prod-ke-01',
    name: 'Milton Microwavable Storage Container Set (Pack of 3)',
    slug: 'milton-food-containers-3pk',
    brand: 'Milton',
    category: 'Kitchen Essentials',
    subcategory: 'Food Storage',
    mrp: 350,
    price: 279,
    discountPercentage: 20,
    finalPrice: 279,
    unit: 'Set of 3 (500ml, 1L, 1.5L)',
    stock: 95,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.7,
    reviewCount: 3100,
    sku: 'KIT-MILTON-CONT-3PK',
    barcode: '8901234509121',
    availability: 'In Stock',
    model3D: 'kitchen_box',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'BPA Free',
    description: '100% Food Grade, BPA-free airtight storage containers. Safe for microwave heating, freezer storage, and dishwasher cleaning.',
    ingredients: 'BPA-Free Polypropylene Material',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80'
    ],
    specifications: {
      'Capacities': '500ml, 1000ml, 1500ml',
      'Lid': 'Silicone Gasket Airtight Lock'
    },
    createdAt: '2026-01-20'
  },

  // 18. HOME ESSENTIALS
  {
    id: 'prod-he-01',
    name: 'Cello Heavy-Duty Deluxe Plastic Bucket (20L) with Mug',
    slug: 'cello-deluxe-bucket-20l',
    brand: 'Cello',
    category: 'Home Essentials',
    subcategory: 'Bathroom Utilities',
    mrp: 380,
    price: 299,
    discountPercentage: 21,
    finalPrice: 299,
    unit: '20 Liters + 1L Mug',
    stock: 70,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.6,
    reviewCount: 1840,
    sku: 'HOM-CELLO-BUCKET-20L',
    barcode: '8901345678901',
    availability: 'In Stock',
    model3D: 'home_bucket',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    description: 'Sturdy virgin plastic bathroom bucket with comfortable anti-slip handle grip and matching pouring mug.',
    ingredients: '100% Virgin Grade Polymers',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80'
    ],
    specifications: {
      'Capacity': '20 Litres',
      'Handle': 'Reinforced Metal / Plastic Grip'
    },
    createdAt: '2026-01-22'
  },

  // 19. STATIONERY
  {
    id: 'prod-st-01',
    name: 'Classmate Pulse A4 Single Line Spiral Notebook (Pack of 4)',
    slug: 'classmate-pulse-notebook-4pk',
    brand: 'Classmate',
    category: 'Stationery',
    subcategory: 'Notebooks',
    mrp: 320,
    price: 259,
    discountPercentage: 19,
    finalPrice: 259,
    unit: '4 x 180 Pages',
    stock: 140,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 4200,
    sku: 'STN-CLASS-PULSE-4PK',
    barcode: '8901030998812',
    availability: 'In Stock',
    model3D: 'stationery_set',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Eco-Friendly Paper',
    description: 'High quality 70 GSM elemental chlorine-free white paper for effortless smooth writing with gel, ball and fountain pens.',
    ingredients: 'Ozone Treated Bright White Paper Pulp',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80'
    ],
    specifications: {
      'Paper GSM': '70 GSM Extra Smooth',
      'Binding': 'Rust-Free Metal Wire Spiral'
    },
    createdAt: '2026-01-25'
  },

  // 20. BABY CARE
  {
    id: 'prod-bb-01',
    name: 'Pampers All Round Protection Pants Diapers (Medium - 54 Count)',
    slug: 'pampers-pants-diapers-m-54',
    brand: 'Pampers',
    category: 'Baby Care',
    subcategory: 'Diapers',
    mrp: 799,
    price: 649,
    discountPercentage: 19,
    finalPrice: 649,
    unit: '54 Diapers (Size M)',
    stock: 90,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 15400,
    sku: 'BABY-PAMP-M-54',
    barcode: '4902430892019',
    availability: 'In Stock',
    model3D: 'baby_diaper',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: '12-Hour Dryness',
    isFeatured: true,
    description: 'Anti-rash lotion with Aloe Vera and Magic Gel channels that absorb wetness instantly for uninterrupted peaceful baby sleep.',
    ingredients: 'Breathable Cottony Top Sheet, Aloe Vera Lotion, Super Absorber Gel',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80'
    ],
    specifications: {
      'Baby Weight Range': '7 - 12 kg',
      'Protection Duration': 'Up to 12 Hours'
    },
    createdAt: '2026-01-18'
  },

  // 21. BEAUTY & GROOMING
  {
    id: 'prod-bg-01',
    name: 'Nivea Soft Light Non-Greasy Moisturising Cream',
    slug: 'nivea-soft-light-cream-200ml',
    brand: 'Nivea',
    category: 'Beauty & Grooming',
    subcategory: 'Skin Creams',
    mrp: 299,
    price: 249,
    discountPercentage: 17,
    finalPrice: 249,
    unit: '200 ml',
    stock: 160,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 6800,
    sku: 'BTY-NIVEA-SOFT-200ML',
    barcode: '4005808890123',
    availability: 'In Stock',
    model3D: 'beauty_lotion',
    sellerId: 'sel-05',
    sellerName: 'HomeCare & Hygiene Store',
    badge: 'Jojoba Oil & Vitamin E',
    description: 'Light, fast-absorbing refreshing moisturiser with Jojoba Oil and Vitamin E for face, hands and body without stickiness.',
    ingredients: 'Aqua, Glycerin, Paraffinum Liquidum, Jojoba Seed Oil, Vitamin E',
    expiryDate: '30 Months',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80'
    ],
    specifications: {
      'Skin Suitability': 'All Skin Types',
      'Finish': 'Matte Non-Greasy Hydration'
    },
    createdAt: '2026-01-20'
  },

  // 22. PET CARE
  {
    id: 'prod-pt-01',
    name: 'Pedigree Adult Complete Nutrition Chicken & Vegetables',
    slug: 'pedigree-adult-dog-food-3kg',
    brand: 'Pedigree',
    category: 'Pet Care',
    subcategory: 'Dog Food',
    mrp: 680,
    price: 585,
    discountPercentage: 14,
    finalPrice: 585,
    unit: '3 kg',
    stock: 80,
    inStock: true,
    deliveryEstimate: 'Tomorrow by 9 AM',
    rating: 4.7,
    reviewCount: 3900,
    sku: 'PET-PED-ADULT-3KG',
    barcode: '8901030912301',
    availability: 'In Stock',
    model3D: 'pet_food',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Vet Approved',
    description: 'Wholesome dry kibbles enriched with dietary fiber, calcium, proteins and natural vitamins to support immune health and shiny fur coat.',
    ingredients: 'Cereal, Poultry By-Products, Soybean Meal, Carrot, Peas, Vitamins',
    expiryDate: '18 Months',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80'
    ],
    specifications: {
      'Target Pet': 'Adult Dogs (1+ Years)',
      'Flavor': 'Real Chicken & Farm Veggies'
    },
    createdAt: '2026-01-21'
  },

  // 23. PACKAGED FOODS
  {
    id: 'prod-pf-01',
    name: "Kellogg's Real Corn Flakes Original",
    slug: 'kelloggs-corn-flakes-875g',
    brand: "Kellogg's",
    category: 'Packaged Foods',
    subcategory: 'Cereals',
    mrp: 350,
    price: 289,
    discountPercentage: 17,
    finalPrice: 289,
    unit: '875 g',
    stock: 140,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 8100,
    sku: 'PKG-KELL-CORN-875G',
    barcode: '8901499002102',
    availability: 'In Stock',
    model3D: 'cereal_box',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Breakfast Fuel',
    isFeatured: true,
    description: 'Golden sun-ripened corn flakes toasted to crispy perfection. Fortified with 8 essential B vitamins and iron.',
    ingredients: 'Corn Grits (89%), Sugar, Malt Extract, Iodised Salt, Vitamins',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80'
    ],
    specifications: {
      'Fat Free': '99% Fat Free',
      'Preparation': 'Pour chilled or warm milk and enjoy'
    },
    createdAt: '2026-01-22'
  },

  // 24. DRY FRUITS & NUTS
  {
    id: 'prod-df-01',
    name: 'Happilo 100% Natural Premium California Almonds',
    slug: 'happilo-california-almonds-500g',
    brand: 'Happilo',
    category: 'Dry Fruits & Nuts',
    subcategory: 'Almonds',
    mrp: 525,
    price: 415,
    discountPercentage: 21,
    finalPrice: 415,
    unit: '500 g',
    stock: 110,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 9400,
    sku: 'DRY-HAPP-ALMOND-500G',
    barcode: '8906081190201',
    availability: 'In Stock',
    model3D: 'dry_fruit_pouch',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Heart Healthy',
    isFeatured: true,
    description: 'Crisp whole raw California almonds rich in Vitamin E, dietary fiber and magnesium. Nitrogen-sealed zip lock pouch for long-lasting crunch.',
    ingredients: '100% Raw California Whole Almonds',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80'
    ],
    specifications: {
      'Grade': 'Nonpareil Supreme California',
      'Pouch': 'Resealable Zip Lock'
    },
    createdAt: '2026-01-20'
  },

  // 25. FROZEN FOODS
  {
    id: 'prod-ff-01',
    name: 'McCain Crispy French Fries Frozen Pack',
    slug: 'mccain-french-fries-750g',
    brand: 'McCain',
    category: 'Frozen Foods',
    subcategory: 'Snacks',
    mrp: 175,
    price: 145,
    discountPercentage: 17,
    finalPrice: 145,
    unit: '750 g',
    stock: 95,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours (Cold Insulated)',
    rating: 4.7,
    reviewCount: 4200,
    sku: 'FRZ-MCCAIN-FRIES-750G',
    barcode: '8906001239019',
    availability: 'In Stock',
    model3D: 'frozen_box',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Crispy in 3 Mins',
    description: 'Sliced from select potato tubers, flash-frozen at peak freshness. Deep fry or air fry for restaurant-grade golden crispy fries.',
    ingredients: 'Potatoes, Edible Vegetable Oil',
    expiryDate: '18 Months at -18°C',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80'
    ],
    specifications: {
      'Storage': 'Store frozen at -18°C or below',
      'Cooking': 'Directly from freezer to hot oil'
    },
    createdAt: '2026-01-22'
  },

  // 26. BREAKFAST ITEMS
  {
    id: 'prod-bi-01',
    name: 'Quaker 100% Whole Grain Rolled Oats',
    slug: 'quaker-rolled-oats-1kg',
    brand: 'Quaker',
    category: 'Breakfast Items',
    subcategory: 'Oats',
    mrp: 215,
    price: 179,
    discountPercentage: 17,
    finalPrice: 179,
    unit: '1 kg',
    stock: 170,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 11200,
    sku: 'BRK-QUAKER-OATS-1KG',
    barcode: '8901491104509',
    availability: 'In Stock',
    model3D: 'cereal_box',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Beta-Glucan Heart Health',
    isFeatured: true,
    description: '100% natural wholegrain rolled oats. Rich in soluble Beta-Glucan fiber that scientifically helps reduce cholesterol and fuels active mornings.',
    ingredients: '100% Whole Rolled Oats',
    expiryDate: '12 Months',
    images: [
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80'
    ],
    specifications: {
      'Preparation Time': '3 Minutes on Stove or Microwave',
      'Dietary': 'Complex Carbohydrates & High Protein'
    },
    createdAt: '2026-01-18'
  },

  // 27. BAKERY
  {
    id: 'prod-bk-01',
    name: 'Britannia 100% Whole Wheat Brown Bread',
    slug: 'britannia-whole-wheat-bread-400g',
    brand: 'Britannia',
    category: 'Bakery',
    subcategory: 'Bread',
    mrp: 55,
    price: 50,
    discountPercentage: 9,
    finalPrice: 50,
    unit: '400 g',
    stock: 110,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours (Baked Fresh Daily)',
    rating: 4.7,
    reviewCount: 5400,
    sku: 'BKY-BRIT-WHEAT-400G',
    barcode: '8901063012901',
    availability: 'In Stock',
    model3D: 'bread_loaf',
    sellerId: 'sel-04',
    sellerName: 'QuickMart FMCG Express',
    badge: 'Daily Baked',
    isTrending: true,
    description: 'Wholesome brown bread baked with 100% whole wheat flour, zero maida, and zero trans fats. Soft, nutritious slices for morning sandwiches.',
    ingredients: 'Whole Wheat Atta (100%), Yeast, Sugar, Edible Vegetable Fat, Salt',
    expiryDate: '5 Days from Manufacturing',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80'
    ],
    specifications: {
      'Maida Free': '100% Whole Wheat Flour',
      'Freshness': 'Delivered within 12 hours of baking'
    },
    createdAt: '2026-01-25'
  },

  // 28. SALT & SUGAR
  {
    id: 'prod-ssg-01',
    name: 'Tata Salt Vacuum Evaporated Iodised Table Salt',
    slug: 'tata-salt-iodised-1kg',
    brand: 'Tata Salt',
    category: 'Salt & Sugar',
    subcategory: 'Salt',
    mrp: 30,
    price: 30,
    discountPercentage: 0,
    finalPrice: 30,
    unit: '1 kg',
    stock: 600,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.9,
    reviewCount: 38200,
    sku: 'SALT-TATA-1KG',
    barcode: '8901015000101',
    availability: 'In Stock',
    model3D: 'salt_pack',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: 'Desh Ka Namak',
    isFeatured: true,
    description: 'India’s most trusted vacuum evaporated iodised salt. Provides optimal daily iodine for mental development and wholesome culinary taste.',
    ingredients: 'Edible Common Salt, Potassium Iodate (Iodine min 15ppm), Anti-Caking Agent (551)',
    expiryDate: '24 Months from Packaging',
    images: [
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&q=80'
    ],
    specifications: {
      'Manufacturing': 'State-of-the-art Vacuum Evaporation',
      'Iodine Guarantee': 'Tested >15 ppm at Consumption Point'
    },
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-ssg-02',
    name: 'Madhur Pure & Hygienic Sulfurless Sugar Crystal',
    slug: 'madhur-sulfurless-sugar-1kg',
    brand: 'Madhur',
    category: 'Salt & Sugar',
    subcategory: 'Sugar',
    mrp: 65,
    price: 54,
    discountPercentage: 17,
    finalPrice: 54,
    unit: '1 kg',
    stock: 420,
    inStock: true,
    deliveryEstimate: 'Express in 2 hours',
    rating: 4.8,
    reviewCount: 9100,
    sku: 'SUGAR-MADHUR-1KG',
    barcode: '8906017290123',
    availability: 'In Stock',
    model3D: 'salt_pack',
    sellerId: 'sel-01',
    sellerName: 'SuperMart Staples Hub',
    badge: '100% Sulfurless',
    description: 'Refined without using harmful sulfur chemicals. Sparkling white uniform crystalline sugar that dissolves easily in hot and cold beverages.',
    ingredients: '100% Refined Cane Sugar Crystals',
    expiryDate: '24 Months',
    images: [
      'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&q=80'
    ],
    specifications: {
      'Purity': 'Sulfur-Free Clarification',
      'Crystal Size': 'Medium Fast-Dissolving'
    },
    createdAt: '2026-01-12'
  }
];

export const SUPERMARKET_SELLERS: SellerProfile[] = [
  {
    id: 'sel-01',
    storeName: 'SuperMart Staples Hub',
    tagline: 'Farm direct grains, unpolished dals & daily groceries',
    email: 'staples@supermart3d.com',
    phone: '+91 98765 43210',
    address: 'Warehouse Block 4, APMC Market Yard, Bengaluru, KA - 560068',
    commissionRate: 8.0,
    isVerified: true,
    isSuspended: false,
    joinedAt: '2025-01-01',
    totalSales: 450200,
    rating: 4.9
  },
  {
    id: 'sel-02',
    storeName: 'Masala Kendra Direct',
    tagline: 'Authentic Indian whole spices and stone ground blends',
    email: 'spices@masalakendra.in',
    phone: '+91 98765 43211',
    address: 'Spice Complex #12, Guntur Spices Market, AP - 522004',
    commissionRate: 7.5,
    isVerified: true,
    isSuspended: false,
    joinedAt: '2025-03-15',
    totalSales: 184500,
    rating: 4.8
  },
  {
    id: 'sel-03',
    storeName: 'Amul Official Dairy Depot',
    tagline: 'Direct fresh dairy supplies, butter, paneer, and pure ghee',
    email: 'dairy@amuldist.in',
    phone: '+91 98765 43212',
    address: 'Cold Logistics Terminal 2, Whitefield, Bengaluru - 560066',
    commissionRate: 6.0,
    isVerified: true,
    isSuspended: false,
    joinedAt: '2025-02-10',
    totalSales: 620000,
    rating: 4.9
  },
  {
    id: 'sel-04',
    storeName: 'QuickMart FMCG Express',
    tagline: 'Instant 2-hour delivery for packaged snacks, tea & breakfast',
    email: 'fmcg@quickmartexpress.com',
    phone: '+91 98765 43213',
    address: 'Sector 14 Logistics Center, Gurgaon, HR - 122001',
    commissionRate: 8.5,
    isVerified: true,
    isSuspended: false,
    joinedAt: '2025-01-20',
    totalSales: 512000,
    rating: 4.7
  },
  {
    id: 'sel-05',
    storeName: 'HomeCare & Hygiene Store',
    tagline: 'Authorized distributor for household cleaning, oral and baby essentials',
    email: 'orders@homecarehygiene.com',
    phone: '+91 98765 43214',
    address: 'Industrial Area Phase 2, Navi Mumbai, MH - 400705',
    commissionRate: 8.0,
    isVerified: true,
    isSuspended: false,
    joinedAt: '2025-02-01',
    totalSales: 310500,
    rating: 4.8
  }
];

export const SUPERMARKET_COUPONS: Coupon[] = [
  {
    code: 'SUPER100',
    discount: 100,
    type: 'flat',
    minOrder: 599,
    maxDiscount: 100,
    description: 'Flat ₹100 instant discount on grocery orders above ₹599',
    expiresAt: '2026-12-31'
  },
  {
    code: 'FRESH50',
    discount: 50,
    type: 'flat',
    minOrder: 299,
    maxDiscount: 50,
    description: 'Flat ₹50 OFF on daily dairy, eggs and bakery items above ₹299',
    expiresAt: '2026-12-31',
    categoryRestriction: 'Dairy & Eggs'
  },
  {
    code: 'STAPLES15',
    discount: 15,
    type: 'percent',
    minOrder: 999,
    maxDiscount: 250,
    description: '15% OFF on monthly Rice, Atta, Dal & Cooking Oil pantry restock',
    expiresAt: '2026-12-31'
  },
  {
    code: 'FIRSTORDER',
    discount: 20,
    type: 'percent',
    minOrder: 399,
    maxDiscount: 150,
    description: 'Welcome gift: 20% discount on your first Super Mart 3D grocery order',
    expiresAt: '2026-12-31'
  }
];

export const SMART_SHOPPING_LISTS: SmartShoppingList[] = [
  {
    id: 'list-monthly',
    name: 'Monthly Grocery Essentials',
    icon: '🍚',
    category: 'Staples & Pantry',
    items: [
      { productId: 'prod-rg-01', productName: 'India Gate Basmati Rice 5kg', quantity: 1, unit: '5 kg', estimatedPrice: 389 },
      { productId: 'prod-rg-02', productName: 'Aashirvaad Sharbati Atta 5kg', quantity: 1, unit: '5 kg', estimatedPrice: 275 },
      { productId: 'prod-pd-01', productName: 'Tata Sampann Toor Dal 1kg', quantity: 2, unit: '1 kg', estimatedPrice: 336 },
      { productId: 'prod-og-01', productName: 'Fortune Sunflower Oil 1L', quantity: 2, unit: '1 L', estimatedPrice: 278 },
      { productId: 'prod-ssg-01', productName: 'Tata Salt Iodised 1kg', quantity: 1, unit: '1 kg', estimatedPrice: 30 },
      { productId: 'prod-ssg-02', productName: 'Madhur Sulfurless Sugar 1kg', quantity: 2, unit: '1 kg', estimatedPrice: 108 },
      { productId: 'prod-bv-01', productName: 'Tata Tea Gold 500g', quantity: 1, unit: '500 g', estimatedPrice: 279 },
      { productId: 'prod-ms-01', productName: 'Everest Red Chilli Powder 200g', quantity: 1, unit: '200 g', estimatedPrice: 82 }
    ]
  },
  {
    id: 'list-breakfast',
    name: 'Quick Morning Breakfast',
    icon: '🥛',
    category: 'Dairy & Bakery',
    items: [
      { productId: 'prod-de-01', productName: 'Amul Taaza Toned Milk 1L', quantity: 2, unit: '1 L', estimatedPrice: 144 },
      { productId: 'prod-bk-01', productName: 'Britannia Whole Wheat Bread 400g', quantity: 1, unit: '400 g', estimatedPrice: 50 },
      { productId: 'prod-de-02', productName: 'Amul Salted Butter 500g', quantity: 1, unit: '500 g', estimatedPrice: 260 },
      { productId: 'prod-de-03', productName: 'Farm Fresh White Eggs 12pk', quantity: 1, unit: '12 pk', estimatedPrice: 99 },
      { productId: 'prod-bi-01', productName: 'Quaker Whole Rolled Oats 1kg', quantity: 1, unit: '1 kg', estimatedPrice: 179 },
      { productId: 'prod-ss-01', productName: 'Kissan Fresh Tomato Ketchup 950g', quantity: 1, unit: '950 g', estimatedPrice: 119 }
    ]
  },
  {
    id: 'list-home-hygiene',
    name: 'Home Sanitation & Cleaning',
    icon: '🧼',
    category: 'Household',
    items: [
      { productId: 'prod-hc-01', productName: 'Lizol Floor Cleaner Citrus 1L', quantity: 1, unit: '1 L', estimatedPrice: 195 },
      { productId: 'prod-hc-02', productName: 'Vim Dishwash Gel 750ml', quantity: 1, unit: '750 ml', estimatedPrice: 135 },
      { productId: 'prod-ln-01', productName: 'Surf Excel Detergent Powder 2kg', quantity: 1, unit: '2 kg', estimatedPrice: 269 },
      { productId: 'prod-oc-01', productName: 'Colgate Strong Teeth Toothpaste 500g', quantity: 1, unit: '500 g', estimatedPrice: 199 },
      { productId: 'prod-pc-01', productName: 'Dove Bathing Bar 3pk', quantity: 1, unit: '3pk', estimatedPrice: 189 }
    ]
  }
];

export const FESTIVAL_OFFERS: FestivalOffer[] = [
  {
    id: 'fest-diwali',
    name: 'Super Diwali Maha Groceries Mela',
    tagline: 'Up to 40% OFF on Desi Ghee, Basmati Rice, Dry Fruits & Festive Sweets',
    discountText: 'FLAT 40% OFF',
    bannerColor: 'from-amber-600/90 via-orange-600/90 to-red-600/90',
    categories: ['Cooking Oils & Ghee', 'Dry Fruits & Nuts', 'Chocolates & Sweets', 'Rice & Grains'],
    endsInHours: 36
  },
  {
    id: 'fest-weekend',
    name: 'Super Sunday Fresh Mart Carnival',
    tagline: 'Buy 1 Get 1 on Daily Dairy, Biscuits, Juices & Breakfast Cereals',
    discountText: 'BOGO OFFERS',
    bannerColor: 'from-emerald-600/90 via-teal-600/90 to-cyan-600/90',
    categories: ['Dairy & Eggs', 'Bakery', 'Breakfast Items', 'Beverages'],
    endsInHours: 14
  }
];
