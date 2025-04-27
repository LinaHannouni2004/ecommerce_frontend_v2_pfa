'use client';
import { useState } from 'react';
import './checkout.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    district: '',
    pinCode: '',
    cardName: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
    paymentMethod: 'card'
  });

  const [submitted, setSubmitted] = useState(false); // état pour afficher le message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Affiche le message de remerciement
  };

  if (submitted) {
    return (
      <div className="thanks-container">
        <div className="thanks-box">
          <h2 className="thanks-heading">Merci pour votre commande !</h2>
          
          <a href="/" className="btn return-home">Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Checkout</h2>
      <a href="/products" className="back-link">Back to Store</a>

      <div className="row">
        <div className="col-75">
          <form onSubmit={handleSubmit}>
            <h3 className="section-title">Billing Address</h3>

            <div className="row">
              <div className="col-50">
                <label>Pays</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
              </div>
              <div className="col-50">
                <label>Ville</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-50">
                <label>Arondissement</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} required />
              </div>
              <div className="col-50">
                <label> Code Postal</label>
                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
              </div>
            </div>

            <p className="note">Veillez remplir les informations de paiyement.</p>

            <h3 className="section-title">Methode de paiyement</h3>

            <div className="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                Credit/ Debit Card
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="netbanking" checked={formData.paymentMethod === 'netbanking'} onChange={handleChange} />
                Wallet
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                PayPal
              </label>
            </div>

            <div className="row">
              <div className="col-50">
                <label>Nom de la carte</label>
                <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} required />
              </div>
              <div className="col-50">
                <label>Numéro de la carte</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required placeholder="0000 0000 0000 0000" />
              </div>
            </div>

            <div className="row">
              <div className="col-50">
                <label>Code de securité (CVV)</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
              </div>
              <div className="col-50">
                <label> Date d'expiration</label>
                <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} required placeholder="MM/YYYY" />
              </div>
            </div>

            <input type="submit" value="Place Order" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}
