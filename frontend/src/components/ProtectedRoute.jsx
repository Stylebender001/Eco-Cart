
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Admin check (if needed)
  if (adminOnly && user.email !== 'admin@example.com') { // Simple admin check
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoute;