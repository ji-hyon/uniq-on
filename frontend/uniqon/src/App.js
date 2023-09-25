import logo from './logo.svg';
import './App.css';
import { Button } from '@material-tailwind/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Collections } from './pages/Collections/Collections';
import { Transaction } from './pages/Transaction/Transaction';
import { TranItemDetail } from './pages/Transaction/TranItemDetail';
import { MyPage } from './pages/Mypage/MyPage';
import { Wishlist } from './pages/Transaction/Wishlist';
import { Landing } from './pages/Landing/Landing';
import { NFT } from './pages/NFT/NFT';
import { MainCollections } from './pages/Collections/MainCollections';
import { MidCollections } from './pages/Collections/MidCollec';
import { MidCollecDetail } from './pages/Collections/MidCollecDetail';
import { NFTList } from './pages/Collections/NFTList';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/collections" element={<Collections />} /> */}
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction/tranItemDetail/:id" element={<TranItemDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/nft" element={<NFT />} />

        <Route path="/collections" element={<MainCollections />} />
        <Route path="/midcollections" element={<MidCollections />} />
        <Route path="/midcollecdetail" element={<MidCollecDetail />} />
        <Route path="/nftlist" element={<NFTList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
