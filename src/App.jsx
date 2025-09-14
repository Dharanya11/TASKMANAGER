// import React from "react";
// import { Routes, Route } from 'react-router-dom'
// import "./App.css";

// // Import your components
// import TaskDashboard from "./Context/TaskDashboard";
// import Signup from "./Context/Signup";
// import Login from "./Context/Login";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Default Dashboard */}
//           <Route path="/" element={<TaskDashboard />} />

//           {/* Auth Pages */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import "./App.css";
// import TaskDashboard from "./Context/TaskDashboard";

// function App() {
//   return (
//     <div className="App">
//       <TaskDashboard />
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskDashboard from "./Context/TaskDashboard";
import Signup from "./Context/Signup";
import Login from "./Context/Login";
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Default route → go to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Signup and Login */}
      <Route path="/signup" element={<Signup onSignup={() => setIsLoggedIn(true)} />} />
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

      {/* Dashboard (protected) */}
      <Route
        path="/TaskDashboard"
        element={
          isLoggedIn ? (
            <TaskDashboard onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* If someone tries an unknown route → redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
