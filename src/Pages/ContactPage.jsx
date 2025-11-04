import React from 'react';
import ContactForms from '../Components/ContactForms';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="hero-section">
        <h1>Contactos</h1>
        <p>Entre em contato conosco para saber mais sobre os nossos serviços</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h3>Informações de Contato</h3>
          <div className="info-item">
            <strong>Endereço:</strong>
            <p>Rua Exemplo, 123<br />1000-000 Lisboa, Portugal</p>
          </div>
          <div className="info-item">
            <strong>Telefone:</strong>
            <p>+351 123 456 789</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>info@componenteapoiofamilia.pt</p>
          </div>
          <div className="info-item">
            <strong>Horário de Funcionamento:</strong>
            <p>Segunda a Sexta: 9h00 - 18h00<br />Sábado: 9h00 - 13h00</p>
          </div>
        </div>
        
        <ContactForms />
      </div>
    </div>
  );
};

export default ContactPage;