import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import PreLoader from "./components/PreLoader";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [])
  
  return (
    <>
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
            <Route path="/chat" element={<Chat/>}/>
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
