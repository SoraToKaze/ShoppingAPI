import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import FourOhFour from './Layouts/FourOhFour';
import AllCategory from './Layouts/Category/AllCategory';
import SingleCategory from './Layouts/Category/SingleCategory';
import AllCustomer from './Layouts/Customer/AllCustomer';
import SingleCustomer from './Layouts/Customer/SingleCustomer';
import AllOrderStatus from './Layouts/Order/AllOrderStatus';
import SingleOrderStatus from './Layouts/Order/SingleOrderStatus';

// WHEN creating routes, make sure to place them 
// BEFORE the FourOhFour page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} >
          <Route index element={<HomePage />} />
          <Route path="category" element={<AllCategory />} />
          <Route path="category/:id" element={<SingleCategory />}/>
          <Route path="customer" element={<AllCustomer />} />
          <Route path="customer/:id" element={<SingleCustomer />}/>
          <Route path="order" element={<AllOrderStatus />} />
          <Route path="status/:id" element={<SingleOrderStatus />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
