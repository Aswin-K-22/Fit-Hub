import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './infra/redux/store.ts'


import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
<BrowserRouter>
<Provider store={store}>
<App />
</Provider>
</BrowserRouter>
   
 
)
