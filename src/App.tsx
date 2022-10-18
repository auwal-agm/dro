import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import BooksComponent from './components/BooksComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksComponent />} />
        <Route path="*" element={<h2 className="heading">Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
