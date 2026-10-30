import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ user }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark site-nav px-3">
      <Link className="brand me-4" to="/">Hotel<span>Pro</span></Link>
      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="menu">
        <div className="navbar-nav me-auto">
          <NavLink className="nav-link" to="/" end>Rooms</NavLink>
          {user && <NavLink className="nav-link" to="/bookings">My bookings</NavLink>}
          {user?.isAdmin && <NavLink className="nav-link" to="/admin">Admin</NavLink>}
        </div>
        {user ? (
          <div className="d-flex align-items-center text-white">
            <span className="me-3">Hi, {user.name}</span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link className="btn btn-sm btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-sm btn-gold" to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
