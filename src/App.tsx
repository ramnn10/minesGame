// import './App.css';
// import Login from './pages/login/Login';

// function App() {
//   return (
//     <div className="flex justify-center items-center h-[100vh] bg-yellow-700">
//      <Login/>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './helper/PrivateRoute';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;