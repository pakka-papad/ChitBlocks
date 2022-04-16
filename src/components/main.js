import React,{useState} from 'react'
import WalletCardEthers from './WalletCardEthers'
import { useSelector } from 'react-redux';
import ChooseScheme from './chooseScheme';
import abi from "../utils/WavePortal.json";
import { ethers } from "ethers";


const Main = () => {
    const address = useSelector(state => state.address)
    const contractAddress = "0x229307C9427Ec507BBCe4755C8b4F753CB236039";
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
                const options = {value: ethers.utils.parseEther("1.0")}
                console.log(options)
                const waves = await Staking.stake(options);


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






    return (
        <div>
            <WalletCardEthers />
            {address && <ChooseScheme />}
            <button onClick={enter}>Enter</button>
            {enterGroup && <button onClick={stake}>Pay</button>}
        </div>
    )
}

export default Main