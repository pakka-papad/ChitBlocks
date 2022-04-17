import React, { useState } from 'react'
import WalletCardEthers from './WalletCardEthers'
import { useSelector } from 'react-redux';
import ChooseScheme from './chooseScheme';
import abi from "../utils/WavePortal.json";
import { ethers } from "ethers";
import io from 


const Main = () => {
    const address = useSelector(state => state.address)
    const contractAddress = "0x74bABFdbFF5020682597bA78FEdDCBc5Ff0044D3";
    const contractABI = abi.abi;

    const [enterGroup, setEnterGroup] = useState(false)
    const [isPaid, setIsPaid] = useState(false)

    const enter = async () => {
        try {

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Staking = new ethers.Contract(contractAddress, contractABI, signer);

                /*
                 * Call the getAllWaves method from your Smart Contract
                 */
                const waves = await Staking.enter();

                setEnterGroup(true)



                /*
                 * We only need address, timestamp, and message in our UI so let's
                 * pick those out
                 */


                /*
                 * Store our data in React State
                 */
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }


    const stake = async () => {
        try {

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Staking = new ethers.Contract(contractAddress, contractABI, signer);

                /*
                 * Call the getAllWaves method from your Smart Contract
                 */
                const options = { value: ethers.utils.parseEther("0.001"), gasLimit: 30000 }
                console.log(options)
                const waves = await Staking.stake(options);

                setIsPaid(true)
                /*
                 * We only need address, timestamp, and message in our UI so let's
                 * pick those out
                 */


                /*
                 * Store our data in React State
                 */
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }



    const NavBar = () => {
        return (
            <div className={'navbar'}>
                ChitBlocks
            </div>
        )
    }

    const auction = () => {

    }

    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <WalletCardEthers />
                {address && <ChooseScheme />}
                {!enterGroup && <button className={'button0enter'} onClick={enter}>Enter</button>}
                <div>
                    {enterGroup && !isPaid && <button className={'button0pay'} onClick={stake}>Pay</button>}
                </div>
                <div>
                    {isPaid && <button className={'button0pay'} onClick={auction}>Go to Live Auction</button>}
                </div>
            </div>
        </>
    )
}

export default Main