import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo_big.png'
import insta_icon from '../assets/instagram_icon.png'
import pintrest_icon from '../assets/pintester_icon.png'
import wapp_icon from '../assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contacts</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={insta_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintrest_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={wapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 - All Right Reserved</p>
        </div>
    </div>
  )
}
