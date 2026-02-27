import { Header } from './components/Header'
import { Home } from './components/Home'
import { Map } from './components/Map'
import { PostsMenu } from './posts/PostsMenu'
import { PostsList } from './posts/PostsList'
import { Routes, Route } from 'react-router-dom'
import { OpenRoutes } from './components/OpenRoutes'
import { Distance } from './components/Distance'
import { Museums } from './components/Museums'
import { GeminiAI } from './components/GeminiAI'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/*" element={<main><PostsMenu /> <PostsList /> </main>} />
          <Route path="/map" element={<Map />} />
          <Route path="/routes" element={<OpenRoutes />} />
          <Route path="/distance" element={<Distance />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/gemini" element={<GeminiAI/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
