import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

const customerService = {
  getAll: async () => {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/customers`);
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch customers: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched customers:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch customer: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },
  
  create: async (data) => {
    try {
      console.log('Creating customer:', data);
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create customer: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      console.log('Updating customer:', id, data);
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update customer: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      console.log('Deleting customer:', id);
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete customer: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const CustomerForm = ({ customer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="customer-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter customer name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="customer@example.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Enter full address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          {customer ? 'Update' : 'Create'} Customer
        </button>
      </div>
    </div>
  );
};

const CustomerDetail = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="customer-detail">
      <div className="detail-row">
        <span className="detail-label">Name:</span>
        <span className="detail-value">{customer.name}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Email:</span>
        <span className="detail-value">{customer.email}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Phone:</span>
        <span className="detail-value">{customer.phone || 'N/A'}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Company:</span>
        <span className="detail-value">{customer.company || 'N/A'}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Address:</span>
        <span className="detail-value">{customer.address || 'N/A'}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Status:</span>
        <span className={`status-badge status-${customer.status}`}>
          {customer.status}
        </span>
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    customer: null
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerService.getAll();
      // Handle different response formats
      if (Array.isArray(data)) {
        setCustomers(data);
      } else if (data.customers && Array.isArray(data.customers)) {
        setCustomers(data.customers);
      } else if (data.data && Array.isArray(data.data)) {
        setCustomers(data.data);
      } else {
        console.error('Unexpected data format:', data);
        setError('Unexpected data format received from server');
      }
    } catch (err) {
      console.error('Fetch customers error:', err);
      setError(`Error: ${err.message}. Check browser console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const loadTestData = () => {
    setCustomers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        company: 'Acme Corp',
        address: '123 Main St, City, State',
        status: 'active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234 567 8901',
        company: 'Tech Solutions',
        address: '456 Oak Ave, City, State',
        status: 'active'
      }
    ]);
    setError(null);
  };

  const openModal = (mode, customer = null) => {
    setModalState({ isOpen: true, mode, customer });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: null, customer: null });
  };

  const handleCreate = async (formData) => {
    try {
      await customerService.create(formData);
      await fetchCustomers();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await customerService.update(modalState.customer.id, formData);
      await fetchCustomers();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await customerService.delete(modalState.customer.id);
      await fetchCustomers();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-page">
      <div className="page-header">
        <h1>Customer Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={loadTestData} title="Load test data for demo">
            Load Test Data
          </button>
          <button className="btn btn-primary" onClick={() => openModal('create')}>
            + Add Customer
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <div>
            <strong>Error:</strong> {error}
            <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Check that:
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Backend server is running on the correct port</li>
                <li>CORS is enabled on your backend</li>
                <li>API endpoint is /api/customers</li>
                <li>Check browser console for more details</li>
              </ul>
            </div>
          </div>
          <button className="alert-close" onClick={() => setError(null)}>&times;</button>
        </div>
      )}

      <div className="page-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">No customers found</td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone || 'N/A'}</td>
                    <td>{customer.company || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${customer.status}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="btn-icon btn-view"
                        onClick={() => openModal('view', customer)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => openModal('edit', customer)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => openModal('delete', customer)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={modalState.isOpen && (modalState.mode === 'create' || modalState.mode === 'edit')}
        onClose={closeModal}
        title={modalState.mode === 'create' ? 'Add New Customer' : 'Edit Customer'}
      >
        <CustomerForm
          customer={modalState.customer}
          onSubmit={modalState.mode === 'create' ? handleCreate : handleUpdate}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={modalState.isOpen && modalState.mode === 'view'}
        onClose={closeModal}
        title="Customer Details"
      >
        <CustomerDetail customer={modalState.customer} onClose={closeModal} />
      </Modal>

      <Modal
        isOpen={modalState.isOpen && modalState.mode === 'delete'}
        onClose={closeModal}
        title="Delete Customer"
      >
        <div className="delete-confirmation">
          <p>Are you sure you want to delete <strong>{modalState.customer?.name}</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default function App() {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #f5f7fa;
          color: #2d3748;
        }

        .customer-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          color: #1a202c;
          font-weight: 600;
        }

        .page-controls {
          margin-bottom: 1.5rem;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        .btn {
          padding: 0.65rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #4299e1;
          color: white;
        }

        .btn-primary:hover {
          background: #3182ce;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }

        .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-secondary:hover {
          background: #cbd5e0;
        }

        .btn-danger {
          background: #f56565;
          color: white;
        }

        .btn-danger:hover {
          background: #e53e3e;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: #f7fafc;
        }

        .data-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
        }

        .data-table tbody tr:hover {
          background: #f7fafc;
        }

        .no-data {
          text-align: center;
          padding: 3rem;
          color: #a0aec0;
          font-style: italic;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-inactive {
          background: #fed7d7;
          color: #742a2a;
        }

        .status-pending {
          background: #feebc8;
          color: #7c2d12;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.25rem;
          transition: transform 0.2s;
        }

        .btn-icon:hover {
          transform: scale(1.2);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          color: #1a202c;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: #a0aec0;
          cursor: pointer;
          line-height: 1;
        }

        .close-btn:hover {
          color: #4a5568;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .customer-form .form-group {
          margin-bottom: 1.25rem;
        }

        .customer-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }

        .customer-form input,
        .customer-form textarea,
        .customer-form select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .customer-form input.error,
        .customer-form textarea.error,
        .customer-form select.error {
          border-color: #f56565;
        }

        .customer-form input:focus,
        .customer-form textarea:focus,
        .customer-form select:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        .error-text {
          display: block;
          color: #f56565;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .customer-detail .detail-row {
          display: flex;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .customer-detail .detail-label {
          font-weight: 600;
          color: #4a5568;
          width: 120px;
        }

        .customer-detail .detail-value {
          color: #2d3748;
        }

        .delete-confirmation {
          text-align: center;
        }

        .delete-confirmation p {
          margin-bottom: 1rem;
          font-size: 1rem;
          color: #2d3748;
        }

        .warning-text {
          color: #e53e3e;
          font-weight: 500;
        }

        .alert {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .alert-error {
          background: #fed7d7;
          color: #742a2a;
          border: 1px solid #fc8181;
        }

        .alert-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #742a2a;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.1rem;
          color: #4a5568;
        }
      `}</style>
      <CustomerPage />
    </>
  );
}
