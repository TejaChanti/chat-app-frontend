import  './App.css';
import ChatPage from './Pages/ChatPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatProvider from "./Context/ChatProvider";
import HomePage from './Pages/HomePage';


function App() {
  return (
  <div className='App'>
    <Router>
      <ChatProvider>
    <Routes >
    
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
        
      </Routes>
      </ChatProvider>
   </Router>
   </div>
 
  );
}

export default App;
