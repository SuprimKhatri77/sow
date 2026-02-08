import React, { useState, useEffect } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [newProduct, setNewProduct] = useState({
    articleNo: "",
    product: "",
    inPrice: "",
    price: "",
    unit: "piece",
    inStock: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const transformedData = data.map((item) => ({
        id: item.id,
        articleNo: item.id,
        product: item.name,
        inPrice: item.inPrice,
        price: item.price,
        unit: item.unit,
        inStock: item.inStock.toString(),
        description: item.description,
      }));

      setProducts(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    const errors = [];

    if (!newProduct.articleNo || newProduct.articleNo.trim() === "") {
      errors.push("Article number is required");
    }

    if (!newProduct.product || newProduct.product.trim() === "") {
      errors.push("Product/Service name is required");
    }

    if (
      !newProduct.price ||
      isNaN(newProduct.price) ||
      parseFloat(newProduct.price) <= 0
    ) {
      errors.push("Valid sale price is required");
    }

    if (
      newProduct.inPrice &&
      (isNaN(newProduct.inPrice) || parseFloat(newProduct.inPrice) < 0)
    ) {
      errors.push("In price must be a valid positive number");
    }

    if (
      newProduct.inStock &&
      (isNaN(newProduct.inStock) || parseInt(newProduct.inStock) < 0)
    ) {
      errors.push("In stock must be a valid positive number");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setFormErrors(errorData.errors);
        } else {
          throw new Error("Failed to add product");
        }
        return;
      }

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
      setFormErrors([]);

      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      setFormErrors(["Failed to add product. Please try again."]);
    }
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

  if (loading) {
    return (
      <div className="price-list-content">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="price-list-content">
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          {error}
          <button onClick={fetchProducts} style={{ marginLeft: "1rem" }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

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

            {formErrors.length > 0 && (
              <div
                style={{
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <strong>Please fix the following errors:</strong>
                <ul style={{ margin: "0.5rem 0 0 1.5rem", padding: 0 }}>
                  {formErrors.map((error, index) => (
                    <li key={index} style={{ color: "#c00" }}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                  <label>Unit*</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit: e.target.value })
                    }
                  >
                    <option value="piece">Piece</option>
                    <option value="set">Set</option>
                    <option value="kilogram">Kilogram</option>
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
                    step="0.01"
                    min="0"
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
                    step="0.01"
                    min="0.01"
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
                    min="0"
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
                  onClick={() => {
                    setShowAddForm(false);
                    setFormErrors([]);
                  }}
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
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
                ))
              )}
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
