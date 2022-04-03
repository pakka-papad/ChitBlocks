import './App.css';
import LoginComp from './components/login'
import WalletCard from './components/WalletCard';
import WalletCardEthers from './components/WalletCardEthers';

function App() {
  return (
    <div>
     {/* <LoginComp/> */}
    <WalletCard/>
    <WalletCardEthers/>
    </div>
  );
}

export default App;
