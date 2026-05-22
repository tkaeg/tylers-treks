import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import December2025 from './pages/December2025'
import January2026 from './pages/January2026'
import May2026 from './pages/May2026'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/december-2025" element={<December2025 />} />
        <Route path="/january-2026" element={<January2026 />} />
        <Route path="/may-2026" element={<May2026 />} />
      </Routes>
    </div>
  )
}
