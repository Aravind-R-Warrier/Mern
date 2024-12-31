import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import './bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContextShare from './contextApi/ContextShare.jsx'
import TokenAuth from './contextApi/TokenAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TokenAuth>
   <ContextShare>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextShare>
   </TokenAuth>

  </StrictMode>,
)
