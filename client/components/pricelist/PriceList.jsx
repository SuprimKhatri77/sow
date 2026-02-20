import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Printer,
  Zap,
  ArrowRight,
  MoreVertical,
  X,
  ArrowDown,
} from "lucide-react";

import "./Pricelist.css";
import { API_BASE_URL } from "../../services/api";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function PriceListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [editingValues, setEditingValues] = useState({});
  const [newProduct, setNewProduct] = useState({
    product: "",
    inPrice: "",
    price: "",
    unit: "",
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
        unit: "",
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

  const handleFieldChange = (productId, field, value) => {
    const key = `${productId}-${field}`;

    setEditingValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, [field]: value } : p)),
    );
  };

  const debouncedEditingValues = useDebounce(editingValues, 1000);

  useEffect(() => {
    const saveChanges = async () => {
      for (const [key, value] of Object.entries(debouncedEditingValues)) {
        const [productId, field] = key.split("-");

        const product = products.find((p) => p.id === productId);
        if (!product) continue;

        try {
          const updateData = {
            product: product.product,
            inPrice: product.inPrice,
            price: product.price,
            unit: product.unit,
            inStock: product.inStock,
            description: product.description,
          };

          const response = await fetch(
            `${API_BASE_URL}/api/products/${productId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateData),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to update product");
          }

          setEditingValues((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
          });
        } catch (err) {
          console.error("Error updating product:", err);
        }
      }
    };

    if (Object.keys(debouncedEditingValues).length > 0) {
      saveChanges();
    }
  }, [debouncedEditingValues, products]);

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
            <Search size={18} className="search-icon" />
          </div>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search Product ..."
              className="search-input"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Search size={18} className="search-icon" />
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn-action btn-new"
            onClick={() => setShowAddForm(true)}
          >
            <span className="btn-label">New Product</span>
            <Plus size={18} />
          </button>
          <button className="btn-action btn-print">
            <span className="btn-label">Print List</span>
            <Printer size={18} />
          </button>
          <button className="btn-action btn-advanced">
            <span className="btn-label">Advanced mode</span>
            <Zap size={18} />
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
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Unit*</label>
                  <input
                    type="text"
                    placeholder="e.g. piece, kg, liter..."
                    value={newProduct.unit}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit: e.target.value })
                    }
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

      <div className="desktop-view">
        <table className="products-table">
          <thead>
            <tr>
              <th className="col-arrow"></th>
              <th className="col-article">
                <div className="th-content">
                  Article No.
                  <ArrowDown size={13} className="sort-icon sort-blue" />
                </div>
              </th>
              <th className="col-product">
                <div className="th-content">
                  Product/Service
                  <ArrowDown size={13} className="sort-icon sort-green" />
                </div>
              </th>
              <th>In Price</th>
              <th>Price</th>
              <th>Unit</th>
              <th>In Stock</th>
              <th>Description</th>
              <th className="col-more"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-row">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="td-arrow">
                    <button className="row-arrow-btn">
                      <ArrowRight size={15} />
                    </button>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cell-input"
                      value={product.articleNo}
                      onChange={(e) =>
                        handleFieldChange(
                          product.id,
                          "articleNo",
                          e.target.value,
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cell-input cell-input--wide"
                      value={product.product}
                      onChange={(e) =>
                        handleFieldChange(product.id, "product", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="cell-input"
                      value={product.inPrice}
                      onChange={(e) =>
                        handleFieldChange(product.id, "inPrice", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="cell-input"
                      value={product.price}
                      onChange={(e) =>
                        handleFieldChange(product.id, "price", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cell-input"
                      value={product.unit}
                      onChange={(e) =>
                        handleFieldChange(product.id, "unit", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="cell-input"
                      value={product.inStock}
                      onChange={(e) =>
                        handleFieldChange(product.id, "inStock", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cell-input cell-input--wide"
                      value={product.description}
                      onChange={(e) =>
                        handleFieldChange(
                          product.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </td>
                  <td className="td-more">
                    <button className="row-more-btn">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="tablet-view">
        <div className="tablet-col-headers">
          <div className="tablet-col-header-row">
            <span className="tcol tcol-article">Article No.</span>
            <span className="tcol tcol-product">Product/Service</span>
            <span className="tcol tcol-price">Price</span>
            <span className="tcol tcol-stock">In Stock</span>
            <span className="tcol tcol-unit">Unit</span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-row">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="tablet-row">
              <button className="row-arrow-btn">
                <ArrowRight size={15} />
              </button>
              <div className="tablet-fields">
                <input
                  type="text"
                  className="pill-input tcol-article"
                  value={product.articleNo}
                  onChange={(e) =>
                    handleFieldChange(product.id, "articleNo", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="pill-input tcol-product"
                  value={product.product}
                  onChange={(e) =>
                    handleFieldChange(product.id, "product", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="pill-input tcol-price"
                  value={product.price}
                  onChange={(e) =>
                    handleFieldChange(product.id, "price", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="pill-input tcol-stock"
                  value={product.inStock}
                  onChange={(e) =>
                    handleFieldChange(product.id, "inStock", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="pill-input tcol-unit"
                  value={product.unit}
                  onChange={(e) =>
                    handleFieldChange(product.id, "unit", e.target.value)
                  }
                />
              </div>
              <button className="row-more-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mobile-landscape-view">
        <div className="mobile-col-headers">
          <span className="mcol mcol-product">Product/Service</span>
          <span className="mcol mcol-price">Price</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-row">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="mobile-row">
              <button className="row-arrow-btn">
                <ArrowRight size={14} />
              </button>
              <input
                type="text"
                className="pill-input mcol-product"
                value={product.product}
                onChange={(e) =>
                  handleFieldChange(product.id, "product", e.target.value)
                }
              />
              <input
                type="number"
                className="pill-input mcol-price"
                value={product.price}
                onChange={(e) =>
                  handleFieldChange(product.id, "price", e.target.value)
                }
              />
              <button className="row-more-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mobile-portrait-view">
        <div className="mobile-col-headers">
          <span className="mcol mcol-product">Product/Service</span>
          <span className="mcol mcol-price">Price</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-row">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="mobile-row">
              <button className="row-arrow-btn">
                <ArrowRight size={14} />
              </button>
              <input
                type="text"
                className="pill-input mcol-product"
                value={product.product}
                onChange={(e) =>
                  handleFieldChange(product.id, "product", e.target.value)
                }
              />
              <input
                type="number"
                className="pill-input mcol-price"
                value={product.price}
                onChange={(e) =>
                  handleFieldChange(product.id, "price", e.target.value)
                }
              />
              <button className="row-more-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
