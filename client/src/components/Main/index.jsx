import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './main.css';

const Main = () => {
  const [iphoneItems, setIphoneItems] = useState([]);
  const [androidItems, setAndroidItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBrand, setSelectBrand] = useState('APPLE');

  const [showModal, setShowModal] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showModalCheckout, setShowModalCheckout] = useState(false);
  const [message, setMessage] = useState('');

  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const [date,setDate] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);
  const [textSuccess, setTextSuccess] = useState('');

  useEffect(() => {
    const fetchIphoneData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/home');
            setIphoneItems(response.data.filter(item => item.brand === 'Apple'));
            console.log(response.data);
        }
        catch (error) {
            console.log('Error fetching iPhone data:', error);
        }
    };
    fetchIphoneData();
  }, []);

  useEffect(() => {
    const date = new Date();
    setDate(date);
  }, []);

  useEffect(() => {
    const fetchAndroidData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/android');
            setAndroidItems(response.data.filter(item => item.brand === 'Android'));
            console.log(response.data);
        }
        catch (error) {
            console.log('Error fetching Android data:', error);
        }
    };
    if(selectedBrand === 'ANDROID') {
      fetchAndroidData();
    }
  }, [selectedBrand])

  useEffect(() => {
    const handleCloseModalOutside = (event) => {
      if (showModal && event.target.className === 'modal') {
        handleCloseModal();
      }
    };
  
    window.addEventListener('click', handleCloseModalOutside);
  
    return () => {
      window.removeEventListener('click', handleCloseModalOutside);
    };
  }, [showModal]);


  const handleBrandClick = (brand) => {
    setSelectBrand(brand);
  }

  const handleShowModal = () => setShowModal(true);
  
  const handleCloseModal = () => {
    if (!selectedModalItem) {
      setShowModal(false);
    } else {
      setSelectedModalItem(null);
    }
  };

  const handleItemClick = (item) => {
    setSelectedModalItem(item);
    setShowModal(true);
  };



const addToCart = (item) => {
  const newItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.photo[0]
  };

  const updatedOrderArray = [...orderArray, newItem];
  setOrderArray(updatedOrderArray);
  setShowModal(false);

};


const [orderArray, setOrderArray] = useState([]);
const orderTotalItems = () => orderArray.length;
  
const orderTotalCost = () => {
  const total = orderArray.reduce((acc, item) => {
    return acc + (item.price || 0);
  }, 0);
  return total.toFixed(2);
};
  
const orderBasketClear = () => {
  setOrderArray([]);
};

const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\D00(?=\D*$)/, '');
  }
  return "Price not available";
};

const handleCheckout = async () => {
  setShowModalCheckout(true);
  
  try {
    const response = await axios.post('http://localhost:5000/customer/checkout', { phoneNumber });
    const { success, customer, message: msg } = response.data;

    if (success) {
      setCustomerInfo(customer);
      setMessage('');
      setShowModalCheckout(true);
      // handleCloseModal()
    } else {
      setCustomerInfo(null);
      setMessage(msg);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleConfirmPhoneNumber = async () => {
  try {
    const response = await axios.post('http://localhost:5000/customer/checkout', { phoneNumber });
    console.log('Response:', response);
    console.log('Response data:', response.data);
    const { success, customer, message: msg } = response.data;

    if (success) {
      setCustomerInfo(customer);
      setMessage('');
      setShowModalCheckout(false);
      
      alert('Success');
    } else {
      setCustomerInfo(null);
      setMessage(msg);

      if (!customer) {
        setShowCreateAccountModal(true);
      } else {
        setShowCreateAccountModal(false);
      }
    }
    console.log('Customer Info:', customer);
    console.log('Message:', msg);
  } catch (error) {
    console.error('Error:', error);
  }
};



const renderCustomerInfo = () => {
  if (customerInfo) {
    return (
      <div className="customer-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {customerInfo.fullname}</p>
        <p><strong>Address:</strong> {customerInfo.address}</p>
        <p><strong>Phone Number:</strong> {customerInfo.phone_number}</p>
      </div>
    );
  }
  return null;
};

const handleCreateAccount = async (e) => {
  e.preventDefault();

  if (!phoneNumber.trim()) {
    setPhoneNumberError(true);
    return;
  }
  if (!fullName.trim()) {
    setFullNameError(true);
    return;
  }
  if (!address.trim()) {
    setAddressError(true);
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/customer/create', {
      fullName,
      address,
      phoneNumber: phoneNumber.trim(),
    });

    if (response.status === 200) {
      const { success, customer, message: msg } = response.data || {};

      if (success) {
        setCustomerInfo(customer);
        setMessage('');
        setTextSuccess("Success! Your account has been created");
        setShowCreateAccountModal(false);
        setShowModalCheckout(true);
        setShowSuccess(true);
      } else {
        setCustomerInfo(null);
        setMessage(msg);
      }

      // setFullName('');
      // setAddress('');
      // setPhoneNumber('');

    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

const searchProductByBarcode = async () => {
  if (selectedBrand === 'APPLE') {
    try {
      const response = await axios.get(`http://localhost:5000/home/barcode/${barcode}`);
      setProduct(response.data);
      addToCart(response.data)
      setError('');
    } catch (error) {
      setError('Không tìm thấy sản phẩm');
      setProduct(null);
    }
  } else if (selectedBrand === 'ANDROID') {
    try {
      const response = await axios.get(`http://localhost:5000/android/barcode/${barcode}`);
      setProduct(response.data);
      setError('');
    } catch (error) {
      setError('Không tìm thấy sản phẩm');
      setProduct(null);
    }
  }
};

const clearInfor = () => {
  setCustomerInfo(null);
  setPhoneNumber('');
}

const payMention = async () => {
  try {
    const responseOrder = await axios.post('http://localhost:5000/order', {phoneNumber,total: orderTotalCost()});
    // console.log('Response Order:', responseOrder.data);
    // alert('Payment success');
    setShowModalCheckout(false);
    setTextSuccess("Payment success! You have paid " + orderTotalCost() + " VND"  + " for your order");
    setShowSuccess(true);
    clearInfor();
    orderBasketClear();
  } catch (error) {
    console.error('Error:', error);
  }
}


    return (
      <div className="bg-dark h-100 p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 bg-white">
              {/* Phần tìm kiếm sản phẩm */}
              <div>
                <input
                  type="text"
                  placeholder="Nhập mã vạch sản phẩm"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
                <button onClick={searchProductByBarcode}>Tìm kiếm</button>
                {error && <p>{error}</p>}
                {product && (
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.desc}</p>
                    {/* Hiển thị thông tin sản phẩm cần thiết tại đây */}
                  </div>
                )}
              </div>
              {/* <p>Order #88 </p> */}
              <p className="mt-2">{date.toLocaleString()}</p>
                <div className="card rounded-3 mb-3">
                    <div className="card-body">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <button className={`nav-link rounded-pill ${selectedBrand === 'APPLE' ? 'active' : ''}`} onClick={() => handleBrandClick('APPLE')}>APPLE</button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button className={`nav-link rounded-pill ${selectedBrand === 'ANDROID' ? 'active' : ''}`} onClick={() => handleBrandClick('ANDROID')}>ANDROID</button>
                        </li>
                    </ul>
                    </div>
                </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-iphone" role="tabpanel" aria-labelledby="pills-iphone-tab">
                      <div className="row">
                          {selectedBrand === 'APPLE' ? (
                            iphoneItems.map(item => (
                              <div className="col-12 col-sm-6 col-md-3 mb-3"  key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                  <img draggable="false" src={item.photo[0]} className="card-img-iphone" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedModalItem  && selectedModalItem._id === item._id && (
                                        <div className="modal" id={item._id} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                                        <div className="modal-dialog" role="document">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">{selectedModalItem.name}</h5>
                                              {/* <button type="button" className="btn-close" onClick={handleCloseModal}></button> */}

                                            </div>
                                            <div className="modal-body">
                                              <img src={selectedModalItem.photo[0]} alt={selectedModalItem.name} className="img-fluid" />
                                              <p>{selectedModalItem.desc}</p>
                                              <p>Status: {selectedModalItem.status}</p>
                                              <p>Price: {selectedModalItem.price ? formatPrice(selectedModalItem.price) : "Price not available"}</p>
                                            </div>
                                            <div className="modal-footer">
                                              <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedModalItem)}>Add to Cart</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ): null}
                          {selectedBrand === 'ANDROID' ? (
                            androidItems.map(item => (
                              <div className="col-12 col-sm-6 col-md-3 mb-3" key={item._id}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                <img draggable="false" src={item.photo[0]} className="card-img" alt="..." />
                                  <div className="card-body">
                                    <h5 className="card-title name">{item.name}</h5>
                                    <p className="card-text price">{item.price ? formatPrice(item.price) : "Price not available"}</p>
                                    {selectedModalItem && selectedModalItem._id === item._id && (
                                      <div className="modal" id={item._id} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                                      <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title">{selectedModalItem.name}</h5>
                                            {/* <button type="button" className="btn-close" onClick={() => handleCloseModal()}></button> */}

                                          </div>
                                          <div className="modal-body">
                                            <img src={selectedModalItem.photo[0]} alt={selectedModalItem.name} className="img-fluid" />
                                            <p>{selectedModalItem.desc}</p>
                                            <p>Status: {selectedModalItem.status}</p>
                                            <p>Price: {selectedModalItem.price ? formatPrice(selectedModalItem.price) : "Price not available"}</p>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => addToCart(selectedModalItem)}>Add to Cart</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : null}
                      </div>
                    </div>
                  </div>
            </div>

            {/* Order */}
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="d-flex justify-content-between align-items-center">
                  <span>Cart</span>
                  <button onClick={orderBasketClear} className="btn btn-sm btn-danger rounded-pill">Clear</button>
                  
                </h5>
                <ul id="orderlist" className="list-unstyled" style={{ height: '30vh', overflowY: 'auto' }}>
                  {orderArray.map((item, index) => (
                    <li key={index} className="d-flex align-items-center">
                      <img src={item.image} alt={item.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 10px' }}>{item.name}</p>
                      <p style={{ whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '16px', color: 'red', margin: '0 10px' }}>{formatPrice(item.price)}</p>
                    </li>
                  ))}
                </ul>
               
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total items:</big>
                    <big className="fw-bold">{orderTotalItems()}</big>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    <big className="fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Total amount:</big>
                    <big className="fw-bold">{parseFloat(orderTotalCost()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</big>
                  </li>
                  <hr />
                  {/* Phần hiển thị thông tin khách hàng */}
                  {customerInfo && (
                    <div className="customer-info mt-4">
                      <h5 className="fw-bold">Customer Information</h5>
                      <p><strong>Name:</strong> {customerInfo.fullname}</p>
                      <p><strong>Address:</strong> {customerInfo.address}</p>
                      <p><strong>Phone Number:</strong> {customerInfo.phone_number}</p>
                      <button onClick={clearInfor} className="btn btn-sm btn-danger rounded-pill">Clear Infor</button>
                    </div>
                  )}
                  <li>
                    <button className="btn btn-primary btn-lg w-100" onClick={handleCheckout}>CHECK OUT</button>

                    {/* Modal */}
                    <Modal className='mt-3'  show={showModalCheckout} onHide={() => setShowModalCheckout(false)}>
                        <Modal.Header>
                            <Modal.Title>Checkout Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                              <h5>Order Summary</h5>
                              <ul>
                                {orderArray.map((item, index) => (
                                  <li key={index}>
                                    <strong>{item.name}</strong> - {formatPrice(item.price)}
                                  </li>
                                ))}
                              </ul>
                              <p>Total items: {orderTotalItems()}</p>
                              <p>Total amount: {parseFloat(orderTotalCost()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                              {customerInfo && (
                                <div className="customer-info mt-4">
                                  <h5 className="fw-bold">Customer Information</h5>
                                  <p><strong>Name:</strong> {customerInfo.fullname}</p>
                                  <p><strong>Address:</strong> {customerInfo.address}</p>
                                  <p><strong>Phone Number:</strong> {customerInfo.phone_number}</p>
                                </div>
                                
                              )}
                            </div>
                            <input
                            required
                                type="text"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-secondary'  variant="secondary" onClick={() => setShowModalCheckout(false)}>
                                Close
                            </button>
                        {!customerInfo && (
                          <button className='btn btn-primary' variant="primary" onClick={handleConfirmPhoneNumber}>
                            Confirm
                          </button>
                        )}
                        {customerInfo && (
                          <button className='btn btn-primary' variant="primary" onClick={payMention}>
                            Payment
                          </button>
                        )}
                        
                        </Modal.Footer>
                    </Modal>

                    <Modal className='mt-3'  show={showSuccess} onHide={() => setShowSuccess(false)}>
                      <Modal.Header>
                          <h4 class="modal-title w-100">Awesome!</h4>	
                        </Modal.Header>
                        <Modal.Body>
                            <p class="text-center">{textSuccess}</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <button class="btn btn-success btn-block" data-dismiss="modal" onClick={() => setShowSuccess(false)}>OK</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal className='mt-3'  show={showCreateAccountModal} onHide={() => setShowCreateAccountModal(false)}>
                      <Modal.Header>
                        <Modal.Title>Create New Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={handleCreateAccount}>
                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            {/* Phone Number */}
                            <input 
                              type="text" 
                              className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`} 
                              id="phoneNumber" 
                              value={phoneNumber} 
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setPhoneNumberError(false);
                              }}
                            />
                            {phoneNumberError && <div className="invalid-feedback">Please enter phone number</div>}

                            {/* Full Name */}
                            <input 
                              type="text" 
                              className={`form-control ${fullNameError ? 'is-invalid' : ''}`} 
                              id="fullName" 
                              value={fullName} 
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setFullNameError(false);
                              }}
                              placeholder='Full Name'
                            />
                            {fullNameError && <div className="invalid-feedback">Please enter full name</div>}

                            {/* Address */}
                            <input 
                              type="text" 
                              className={`form-control ${addressError ? 'is-invalid' : ''}`} 
                              id="address" 
                              value={address} 
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setAddressError(false);
                              }}
                              placeholder='Address'
                            />
                            {addressError && <div className="invalid-feedback">Please enter address</div>}
                          </div>
                          <button type="submit" className="btn btn-primary" >Create Account</button>
                          <button type="button" className="btn btn-secondary" onClick={() => {setShowCreateAccountModal(false)}}>Cancel</button>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;