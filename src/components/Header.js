import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ userRole }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Journal App</h1>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/submit-manuscript">Submit Manuscript</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/review">Review</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                {['editor', 'administrator'].includes(userRole) && (
                  <li className="nav-item"><Link className="nav-link" to="/add-news">Add News</Link></li>
                )}
                {!userRole && (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  </>
                )}
                {userRole && (
                  <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
