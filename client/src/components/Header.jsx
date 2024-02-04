import React from "react"; // This line can be commented out if you're using React 17 or later
import gqllogo from "./assets/gqlLogo.png";

export default function Header() {
    return (
        <nav className="navbar" style={{ 
            backgroundColor: '#f5f5f5', 
            marginBottom: '1rem', 
            padding: '0.5rem 0' }}>
                
            <div className="container">
                <a className="navbar-brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={gqllogo} alt="GraphQL Logo" style={{ marginRight: '0.5rem' }} />
                    <div style={{ fontSize: '1.25rem' }}>ProjectMgmt</div>
                </a>
            </div>
        </nav>
    );
}

