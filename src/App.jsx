import './App.css';
import WalletCardEthers from './components/WalletCardEthers';
import Main from './components/main'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './reducers/reducerAdress';
import ChooseScheme from './components/chooseScheme';
const store = createStore(rootReducer);

function App() {
  
//  console.log('acc', userAcc)
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

export default App;
