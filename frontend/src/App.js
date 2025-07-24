import React from 'react';
import VendorList from './pages/vendor/VendorList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import BranchList from './pages/branch/BranchList';
import ManufacturerList from './pages/manufacturer/ManufacturerList';
import GrnList from './pages/grn/GrnList';
import GrnForm from './pages/grn/GrnForm';
import GrnDetail from './pages/grn/GrnDetail';
import Home from './pages/home/Home';
import AssetCategory from './pages/asset/AssetCategory';
function App() {
  return (
<BrowserRouter>
<Layout>
 <Routes>
  <Route path='/' element={<Home />} />
  <Route path="/assets" element={<AssetCategory />} />
  <Route path="/vendors" element={<VendorList />} />
  <Route path="/branches" element={<BranchList />} />
  <Route path="/manufacturers" element={<ManufacturerList />} />
  <Route path="/grns" element={<GrnList />} />
  <Route path="/grnform" element={<GrnForm />} />
  <Route path='/grn/details/:id' element={<GrnDetail />} />
  {/* Add more routes as needed */}
 </Routes>
 </Layout>
</BrowserRouter>

  );
}

export default App;
