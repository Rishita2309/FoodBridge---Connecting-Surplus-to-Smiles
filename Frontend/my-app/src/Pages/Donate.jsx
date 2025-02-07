import React, { useState } from 'react';
import './Donate.css';

export default function Donate() {
  const [foodtype, setFoodtype] = useState(''); // backend name: foodtype
  const [foodname, setFoodname] = useState(''); // backend name: foodname
  const [quantity, setQuantity] = useState('');
  const [donorname, setDonorname] = useState(''); // backend name: donorname
  const [donoradd, setDonoradd] = useState(''); // backend name: donoradd
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!foodtype || !foodname || !quantity || !donorname || !donoradd) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const donationData = {
      foodtype, // backend expects foodtype
      foodname, // backend expects foodname
      quantity: parseInt(quantity),
      donorname, // backend expects donorname
      donoradd, // backend expects donoradd
    };

    try {
      const response = await fetch('http://localhost:8080/requests/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        setMessage('Donation request submitted successfully!');
        setFoodtype('');
        setFoodname('');
        setQuantity('');
        setDonorname('');
        setDonoradd('');
      } else {
        setMessage('Failed to submit donation request.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donate-container">
      <div className="donate-box">
        <h2>Donate Food</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="foodtype">Food Type</label>
            <select
              id="foodtype"
              value={foodtype}
              onChange={(e) => setFoodtype(e.target.value)}
              required
            >
              <option value="">Select Food Type</option>
              <option value="FRESH">Fresh</option>
              <option value="PACKAGED">Packaged</option>
              <option value="BEVERAGE">Beverage</option>
              <option value="SNACK">Snack</option>
              <option value="DAIRY">Dairy</option>
              <option value="GRAINS">Grains</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="foodname">Food Name</label>
            <input
              type="text"
              id="foodname"
              value={foodname} // backend name: foodname
              onChange={(e) => setFoodname(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="donorname">Donor Name</label>
            <input
              type="text"
              id="donorname"
              value={donorname}
              onChange={(e) => setDonorname(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="donoradd">Donor Address</label>
            <input
              type="text"
              id="donoradd"
              value={donoradd}
              onChange={(e) => setDonoradd(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Post Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
