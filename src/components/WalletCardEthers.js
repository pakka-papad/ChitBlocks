import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './WalletCard.css'
import { useSelector, useDispatch } from 'react-redux'
import loginRequest from '../requests'
import '../index.css'
import bunny from '../components/bunny.png'




const WalletCardEthers = () => {
	//redux store 
	const dispatch = useDispatch()
	const address = useSelector(state => state.address)

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Please Connect Your Wallet');
	const [provider, setProvider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					setConnButtonText('Wallet Connected');
					setDefaultAccount(result[0]);
					localStorage.setItem('userAccount', result[0])
					dispatch({ type: 'setNew', payload: result[0] })
					loginRequest(result[0])
				})
				.catch(error => {
					setErrorMessage(error.message);
				});

		} else if (!window.ethereum) {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}



	}

	useEffect(() => {
		if (defaultAccount) {
			provider.getBalance(defaultAccount)
				.then(balanceResult => {
					setUserBalance(ethers.utils.formatEther(balanceResult));
				})
		};
	}, [defaultAccount]);

	return (
		<div className='walletCard' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div className="header">
				<h1>Connection to Metamask using ethers.js</h1>
			</div>
			<div className="button00" style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
				<div>
					<img src={bunny} alt='bunny' style={{marginBottom:'1rem'}}></img>
				</div>
				<button className="button0" onClick={connectWalletHandler}>{connButtonText}</button>
			</div>
			<header>
				<h1>Address : {defaultAccount}</h1>
			</header>

			{errorMessage}

		</div>
	);
}

export default WalletCardEthers;