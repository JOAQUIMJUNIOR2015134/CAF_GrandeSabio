// src/Components/Footer.jsx

import '../Style/FooterStyle.css'

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4 className="footer-title">Contactos</h4>
                    <p className="footer-text">Telefone: +351 912 345 678</p>
                    <p className="footer-text">Email: exemplo@dominio.com</p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Morada</h4>
                    <address className="footer-text">
                        Rua Exemplo 123<br />
                        1234-567 Cidade, País
                    </address>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Redes sociais</h4>
                    <ul className="footer-social-list">
                        <li><a href="#" className="footer-link">Facebook</a></li>
                        <li><a href="#" className="footer-link">Instagram</a></li>
                        <li><a href="#" className="footer-link">LinkedIn</a></li>
                        <li><a href="#" className="footer-link">Youtube</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-copy">
                &copy; {year} Grande Sábio - Componente de Apoio à Família. Todos os direitos reservados.
            </div>
        </footer>
    );
}

export default Footer;