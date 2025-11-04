import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logotipos_Sessao 0.6. Conteudo copia.png';
import '../Style/NavBarStyles.css'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Efeito para controlar scroll do body
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        // Cleanup quando componente é desmontado
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isMenuOpen]);

    // Fechar menu ao redimensionar tela (se usuário rotacionar dispositivo)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 769) {
                closeMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="NavBar">
            <Link to="/" className="brand" onClick={closeMenu}>
                <div className="logo">
                    <img src={logo} alt="Compomente Apoio a Familia logo" style={{ height: 100 }} />
                </div>
            </Link>

            {/* Botão Burger - apenas visível em mobile */}
            <button 
                className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                type="button"
            >
                <span className="burger-line"></span>
                <span className="burger-line"></span>
                <span className="burger-line"></span>
            </button>

            {/* Menu de navegação */}
            <div className={`NavBar_Links ${isMenuOpen ? 'menu-open' : ''}`}>
                <Link to="/SobreNos" onClick={closeMenu}>Sobre Nos</Link>
                <Link to="/Servicos" onClick={closeMenu}>Os nossos Serviços</Link>
                <Link to="/Projectos" onClick={closeMenu}>Projectos</Link>
                <Link to="/Contactos" onClick={closeMenu}>Contactos</Link>
            </div>

            {/* Overlay para fechar menu em mobile */}
            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={closeMenu}
                    aria-hidden="true"
                ></div>
            )}
        </nav>
    );
}

export default Navbar;
