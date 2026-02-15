import React, { useState, useEffect } from "react";
import { Search, Plus, Printer, Zap, ArrowRight, Edit, X } from "lucide-react";

import "./Pricelist.css";
import { API_BASE_URL } from "../../services/api";

export function PriceListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [newProduct, setNewProduct] = useState({
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
      const response = await fetch(`${API_BASE_URL}/api/products`);
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
      const response = await fetch(`${API_BASE_URL}/api/products`, {
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

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    const errors = [];

    if (!editingProduct.product || editingProduct.product.trim() === "") {
      errors.push("Product/Service name is required");
    }

    if (
      !editingProduct.price ||
      isNaN(editingProduct.price) ||
      parseFloat(editingProduct.price) <= 0
    ) {
      errors.push("Valid sale price is required");
    }

    if (
      editingProduct.inPrice &&
      (isNaN(editingProduct.inPrice) || parseFloat(editingProduct.inPrice) < 0)
    ) {
      errors.push("In price must be a valid positive number");
    }

    if (
      editingProduct.inStock &&
      (isNaN(editingProduct.inStock) || parseInt(editingProduct.inStock) < 0)
    ) {
      errors.push("In stock must be a valid positive number");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setFormErrors(errorData.errors);
        } else {
          throw new Error("Failed to update product");
        }
        return;
      }

      setEditingProduct(null);
      setShowEditForm(false);
      setFormErrors([]);

      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      setFormErrors(["Failed to update product. Please try again."]);
    }
  };

  const openEditForm = (product) => {
    setEditingProduct({
      id: product.id,
      product: product.product,
      inPrice: product.inPrice,
      price: product.price,
      unit: product.unit,
      inStock: product.inStock,
      description: product.description,
    });
    setShowEditForm(true);
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
      <div className="top-bar">
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
              <div className="error-box">
                <strong>Please fix the following errors:</strong>
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleAddProduct} className="product-form">
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
              </div>
              <div className="form-row">
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
                <div className="form-group">
                  <label>In Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.inStock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        inStock: e.target.value,
                      })
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

      {showEditForm && editingProduct && (
        <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditForm(false)}
              >
                <X size={24} />
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="error-box">
                <strong>Please fix the following errors:</strong>
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleEditProduct} className="product-form">
              <div className="form-group">
                <label>Product/Service Name*</label>
                <input
                  type="text"
                  required
                  value={editingProduct.product}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      product: e.target.value,
                    })
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
                    value={editingProduct.inPrice}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        inPrice: e.target.value,
                      })
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
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="Selling price"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Unit*</label>
                  <select
                    value={editingProduct.unit}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        unit: e.target.value,
                      })
                    }
                  >
                    <option value="piece">Piece</option>
                    <option value="set">Set</option>
                    <option value="kilogram">Kilogram</option>
                    <option value="meter">Meter</option>
                    <option value="liter">Liter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>In Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.inStock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        inStock: e.target.value,
                      })
                    }
                    placeholder="Quantity"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
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
                    setShowEditForm(false);
                    setFormErrors([]);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container desktop-view">
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
                    <button
                      className="edit-btn"
                      onClick={() => openEditForm(product)}
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="tablet-view">
        <div className="tablet-table-header">
          <div className="tablet-header-col">Article No.</div>
          <div className="tablet-header-col">Product/Service</div>
          <div className="tablet-header-col">Price</div>
          <div className="tablet-header-col">In Stock</div>
          <div className="tablet-header-col">Unit</div>
        </div>

        <div className="tablet-cards-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="tablet-product-card">
              <button className="tablet-row-action">
                <ArrowRight size={16} />
              </button>
              <div className="tablet-card-content">
                <div className="tablet-field">
                  <span className="tablet-value">{product.articleNo}</span>
                </div>
                <div className="tablet-field">
                  <span className="tablet-value">{product.product}</span>
                </div>
                <div className="tablet-field">
                  <span className="tablet-value">{product.price}</span>
                </div>
                <div className="tablet-field">
                  <span className="tablet-value">{product.inStock}</span>
                </div>
                <div className="tablet-field">
                  <span className="tablet-value">{product.unit}</span>
                </div>
              </div>
              <button
                className="tablet-edit-btn"
                onClick={() => openEditForm(product)}
              >
                <Edit size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-landscape-view">
        <div className="mobile-landscape-headers">
          <div className="mobile-landscape-header">Product/Service</div>
          <div className="mobile-landscape-header">Price</div>
        </div>

        <div className="mobile-landscape-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mobile-landscape-row">
              <button className="mobile-landscape-action">
                <ArrowRight size={14} />
              </button>
              <div className="mobile-landscape-product">{product.product}</div>
              <div className="mobile-landscape-price">{product.price}</div>
              <button
                className="mobile-landscape-edit"
                onClick={() => openEditForm(product)}
              >
                <Edit size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-portrait-view">
        <div className="mobile-portrait-headers">
          <div className="mobile-portrait-header">Product/Service</div>
          <div className="mobile-portrait-header">Price</div>
        </div>

        <div className="mobile-portrait-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mobile-portrait-row">
              <button className="mobile-portrait-action">
                <ArrowRight size={14} />
              </button>
              <div className="mobile-portrait-product">{product.product}</div>
              <div className="mobile-portrait-price">{product.price}</div>
              <button
                className="mobile-portrait-edit"
                onClick={() => openEditForm(product)}
              >
                <Edit size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
