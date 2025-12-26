import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { AuthProvider } from "./context/authContext"
import ProtectedRoute from "./components/ProtectedRoute"
import PreLoader from "./components/PreLoader";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import MainUI from "./pages/MainUI";

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [])
  
  return (
    <AuthProvider>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center overflow-x-hidden">
          <PreLoader/>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/main" element={
              <ProtectedRoute>
                <MainUI/>
              </ProtectedRoute>
            }/>
          </Routes>
        </Router>
      )}
    </AuthProvider>
  )
}

export default App
