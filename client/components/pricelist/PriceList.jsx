import React, { useState } from "react";
import {
  Search,
  Plus,
  Printer,
  Zap,
  ArrowRight,
  MoreVertical,
  X,
} from "lucide-react";

import "./Pricelist.css";

export function PriceListPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      articleNo: "1234567890",
      product: "Professional Camera DSLR 5000",
      inPrice: "900500",
      price: "1500800",
      unit: "piece",
      inStock: "25",
      description: "High-end professional camera",
    },
    {
      id: 2,
      articleNo: "2345678901",
      product: "Laptop Computer i7 16GB RAM",
      inPrice: "1200000",
      price: "1800000",
      unit: "piece",
      inStock: "15",
      description: "Business laptop",
    },
    {
      id: 3,
      articleNo: "3456789012",
      product: "Wireless Mouse Ergonomic",
      inPrice: "15000",
      price: "25000",
      unit: "piece",
      inStock: "150",
      description: "Comfortable wireless mouse",
    },
    {
      id: 4,
      articleNo: "4567890123",
      product: "Mechanical Keyboard RGB",
      inPrice: "45000",
      price: "75000",
      unit: "piece",
      inStock: "80",
      description: "Gaming mechanical keyboard",
    },
    {
      id: 5,
      articleNo: "5678901234",
      product: "External Hard Drive 2TB",
      inPrice: "80000",
      price: "120000",
      unit: "piece",
      inStock: "60",
      description: "Portable storage device",
    },
    {
      id: 6,
      articleNo: "6789012345",
      product: "USB-C Hub Multiport Adapter",
      inPrice: "35000",
      price: "55000",
      unit: "piece",
      inStock: "200",
      description: "Multi-port USB hub",
    },
    {
      id: 7,
      articleNo: "7890123456",
      product: "Noise Cancelling Headphones",
      inPrice: "180000",
      price: "280000",
      unit: "piece",
      inStock: "45",
      description: "Premium headphones",
    },
    {
      id: 8,
      articleNo: "8901234567",
      product: "Smartphone Case Premium",
      inPrice: "12000",
      price: "22000",
      unit: "piece",
      inStock: "300",
      description: "Protective phone case",
    },
    {
      id: 9,
      articleNo: "9012345678",
      product: "Tablet 10 inch Android",
      inPrice: "250000",
      price: "380000",
      unit: "piece",
      inStock: "35",
      description: "Mid-range tablet",
    },
    {
      id: 10,
      articleNo: "0123456789",
      product: "Smartwatch Fitness Tracker",
      inPrice: "95000",
      price: "150000",
      unit: "piece",
      inStock: "90",
      description: "Activity tracking watch",
    },
    {
      id: 11,
      articleNo: "1122334455",
      product: "Webcam HD 1080p",
      inPrice: "42000",
      price: "68000",
      unit: "piece",
      inStock: "120",
      description: "High definition webcam",
    },
    {
      id: 12,
      articleNo: "2233445566",
      product: "Monitor 27 inch 4K",
      inPrice: "320000",
      price: "480000",
      unit: "piece",
      inStock: "28",
      description: "Ultra HD monitor",
    },
    {
      id: 13,
      articleNo: "3344556677",
      product: "Graphics Card RTX 3060",
      inPrice: "450000",
      price: "680000",
      unit: "piece",
      inStock: "12",
      description: "Gaming graphics card",
    },
    {
      id: 14,
      articleNo: "4455667788",
      product: "SSD 1TB NVMe",
      inPrice: "85000",
      price: "135000",
      unit: "piece",
      inStock: "75",
      description: "Fast solid state drive",
    },
    {
      id: 15,
      articleNo: "5566778899",
      product: "RAM DDR4 16GB Kit",
      inPrice: "65000",
      price: "95000",
      unit: "piece",
      inStock: "95",
      description: "Memory upgrade kit",
    },
    {
      id: 16,
      articleNo: "6677889900",
      product: "Wireless Charger Pad",
      inPrice: "18000",
      price: "32000",
      unit: "piece",
      inStock: "180",
      description: "Fast wireless charging",
    },
    {
      id: 17,
      articleNo: "7788990011",
      product: "Bluetooth Speaker Portable",
      inPrice: "55000",
      price: "89000",
      unit: "piece",
      inStock: "65",
      description: "Waterproof speaker",
    },
    {
      id: 18,
      articleNo: "8899001122",
      product: "Desk Lamp LED Adjustable",
      inPrice: "28000",
      price: "45000",
      unit: "piece",
      inStock: "110",
      description: "Eye-care desk lamp",
    },
    {
      id: 19,
      articleNo: "9900112233",
      product: "Power Bank 20000mAh",
      inPrice: "38000",
      price: "62000",
      unit: "piece",
      inStock: "140",
      description: "Portable battery pack",
    },
    {
      id: 20,
      articleNo: "0011223344",
      product: "Router WiFi 6 Dual Band",
      inPrice: "120000",
      price: "185000",
      unit: "piece",
      inStock: "42",
      description: "High-speed router",
    },
    {
      id: 21,
      articleNo: "1231231234",
      product: "Microphone USB Condenser",
      inPrice: "78000",
      price: "125000",
      unit: "piece",
      inStock: "55",
      description: "Studio quality mic",
    },
    {
      id: 22,
      articleNo: "2342342345",
      product: "Cable Organizer Set",
      inPrice: "8000",
      price: "15000",
      unit: "set",
      inStock: "250",
      description: "Cable management solution",
    },
    {
      id: 23,
      articleNo: "3453453456",
      product: "Screen Protector Tempered Glass",
      inPrice: "5000",
      price: "12000",
      unit: "piece",
      inStock: "400",
      description: "Phone screen protection",
    },
    {
      id: 24,
      articleNo: "4564564567",
      product: "Laptop Stand Aluminum",
      inPrice: "32000",
      price: "52000",
      unit: "piece",
      inStock: "88",
      description: "Ergonomic laptop stand",
    },
    {
      id: 25,
      articleNo: "5675675678",
      product: "Gaming Chair Ergonomic",
      inPrice: "280000",
      price: "420000",
      unit: "piece",
      inStock: "18",
      description: "Professional gaming chair",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [newProduct, setNewProduct] = useState({
    articleNo: "",
    product: "",
    inPrice: "",
    price: "",
    unit: "piece",
    inStock: "",
    description: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
    };
    setProducts([...products, product]);
    setNewProduct({
      articleNo: "",
      product: "",
      inPrice: "",
      price: "",
      unit: "piece",
      inStock: "",
      description: "",
    });
    setShowAddForm(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesArticle = product.articleNo
      .toLowerCase()
      .includes(searchArticle.toLowerCase());
    const matchesProduct = product.product
      .toLowerCase()
      .includes(searchProduct.toLowerCase());
    return matchesArticle && matchesProduct;
  });

  return (
    <div className="price-list-content">
      <div className="search-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search Article No..."
            className="search-input"
            value={searchArticle}
            onChange={(e) => setSearchArticle(e.target.value)}
          />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search Product ..."
            className="search-input"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-new" onClick={() => setShowAddForm(true)}>
          <Plus size={18} className="btn-icon" />
          <span className="btn-text">New Product</span>
        </button>
        <button className="btn-print">
          <Printer size={18} className="btn-icon" />
          <span className="btn-text">Print List</span>
        </button>
        <button className="btn-advanced">
          <Zap size={18} className="btn-icon" />
          <span className="btn-text">Advanced mode</span>
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Article No.*</label>
                  <input
                    type="text"
                    required
                    value={newProduct.articleNo}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        articleNo: e.target.value,
                      })
                    }
                    placeholder="e.g., 1234567890"
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit: e.target.value })
                    }
                  >
                    <option value="piece">Piece</option>
                    <option value="set">Set</option>
                    <option value="kg">Kilogram</option>
                    <option value="meter">Meter</option>
                    <option value="liter">Liter</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Product/Service Name*</label>
                <input
                  type="text"
                  required
                  value={newProduct.product}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product: e.target.value })
                  }
                  placeholder="e.g., Professional Camera DSLR"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>In Price</label>
                  <input
                    type="number"
                    value={newProduct.inPrice}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, inPrice: e.target.value })
                    }
                    placeholder="Purchase price"
                  />
                </div>
                <div className="form-group">
                  <label>Sale Price*</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="Selling price"
                  />
                </div>
                <div className="form-group">
                  <label>In Stock</label>
                  <input
                    type="number"
                    value={newProduct.inStock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, inStock: e.target.value })
                    }
                    placeholder="Quantity"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Product description..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container desktop-tablet-view">
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th></th>
                <th>Article No.</th>
                <th>Product/Service</th>
                <th>In Price</th>
                <th>Price</th>
                <th>Unit</th>
                <th>In Stock</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <button className="row-action-btn">
                      <ArrowRight size={16} />
                    </button>
                  </td>
                  <td>{product.articleNo}</td>
                  <td>{product.product}</td>
                  <td>{product.inPrice}</td>
                  <td>{product.price}</td>
                  <td>{product.unit}</td>
                  <td>{product.inStock}</td>
                  <td>{product.description}</td>
                  <td>
                    <button className="more-btn">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mobile-view">
        <div className="mobile-table-header">
          <div className="mobile-header-col">Article No.</div>
          <div className="mobile-header-col">Product/Service</div>
          <div className="mobile-header-col">Price</div>
          <div className="mobile-header-col">In Stock</div>
          <div className="mobile-header-col">Unit</div>
        </div>

        <div className="mobile-cards-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mobile-product-card">
              <button className="mobile-row-action">
                <ArrowRight size={16} />
              </button>
              <div className="mobile-card-content">
                <div className="mobile-field">
                  <span className="mobile-value">{product.articleNo}</span>
                </div>
                <div className="mobile-field">
                  <span className="mobile-value">{product.product}</span>
                </div>
                <div className="mobile-field">
                  <span className="mobile-value">{product.price}</span>
                </div>
                <div className="mobile-field">
                  <span className="mobile-value">{product.inStock}</span>
                </div>
                <div className="mobile-field">
                  <span className="mobile-value">{product.unit}</span>
                </div>
              </div>
              <button className="mobile-more-btn">
                <MoreVertical size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="simple-mobile-view">
        <div className="simple-mobile-headers">
          <div className="simple-header">Product/Service</div>
          <div className="simple-header">Price</div>
        </div>

        <div className="simple-mobile-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="simple-mobile-row">
              <button className="simple-row-action">
                <ArrowRight size={14} />
              </button>
              <div className="simple-product-name">{product.product}</div>
              <div className="simple-price">{product.price}</div>
              <button className="simple-more-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
