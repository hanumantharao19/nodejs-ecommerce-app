
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const products = [
  {
    id: 1,
    name: "Classic Leather Bag",
    category: "Bags",
    price: 2499,
    description: "A timeless everyday carry.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Essential Wrist Watch",
    category: "Accessories",
    price: 3999,
    description: "Simple design, everyday elegance.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 2999,
    description: "Comfort made for every day.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Minimal Wallet",
    category: "Accessories",
    price: 999,
    description: "Keep your essentials together.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Weekend Handbag",
    category: "Bags",
    price: 1899,
    description: "Your companion for a quick getaway.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Urban Trainers",
    category: "Footwear",
    price: 3499,
    description: "A versatile look for city life.",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80"
  }
];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    application: "Product Store",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Product Store running at http://localhost:${PORT}`);
});

