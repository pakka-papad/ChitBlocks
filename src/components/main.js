import React, { useState } from 'react'
import WalletCardEthers from './WalletCardEthers'
import { useSelector } from 'react-redux';
import ChooseScheme from './chooseScheme';
import abi from "../utils/WavePortal.json";
import { ethers } from "ethers";
import io from 'socket.io-client';
import auctionAbi from '../utils/auction.json'


const Main = () => {
    const address = useSelector(state => state.address)
    const contractAddress = "0x74bABFdbFF5020682597bA78FEdDCBc5Ff0044D3";
    const auctionAddress = "0x3E26Df29162CCaceF4A72D519c4eBABdf32888a0"
    const contractABI = abi.abi;
    const auctionABI = auctionAbi.abi

    const [enterGroup, setEnterGroup] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [liveAuc, setLiveAuc] = useState(false)
    const [bidMoney, setBidMoney] = useState("")
    const [inputMoney, setInputMoney] = useState("")
    const [hasBid, setHasBid] = useState(false)

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

    const bid = async () => {
        try {

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Auctions = new ethers.Contract(auctionAddress, auctionABI, signer);

                /*
                 * Call the getAllWaves method from your Smart Contract
                 */
                const options = { value: ethers.utils.parseEther("0.0001"), gasLimit: 30000 }
                console.log(options)
                const waves = await Auctions.bid(options);

                setHasBid(true)
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

    const auction = async () => {

        setLiveAuc(true)


        //     socket.emit('join-room',  address);

        //     socket.on('notification',msg => {
        //         if(msg.title === 'room-join'){
        //             const desc = msg.description;
        //             console.log('joined')

        //         } else if(msg.title === 'new bid'){
        //             const user = msg.bid.user;
        //             const amount = msg.bid.amount;

        //         }
        //     });

        //     socket.on('error', (e) => {

        //     });
        // }
        // console.log('socket',socket)

        // const makeBid = (amount) => {
        //     socket.emit('make-bid',{
        //         user: {
        //             id: '0x1236591287360',
        //             groupId: 'ABCD'
        //         },
        //         amount: amount
        //     });
    }

    console.log(inputMoney)

    const AuctionDisplay = () => {
        return (
            <div className='auction' style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center,' }}>
                        <div class="input-container">
                            <input type="text" required="" />
                            <label>Your Bid</label>
                        </div>
                        <button type="button" className="btn" onClick={bid}>Bid</button>
                    </form>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop:'2rem' }}>
                    <div className='button0' style={{marginRight:10}}>
                        Highest Bid : {hasBid ? `0.0001` : ``}
                    </div>
                    <div className='button0'>
                        Highest Bidder : {hasBid ? `${address}` : ``}
                    </div>
                </div>

            </div>
        )
    }


    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <WalletCardEthers />
                {address && <ChooseScheme />}
                {!enterGroup && <button className={'button0enter'} onClick={enter}>Enter</button>}
                <div>
                    {enterGroup && !isPaid && <button className={'button0pay'} onClick={stake}>Pay</button>}
                </div>
                <div>
                    {isPaid && !liveAuc && <button className={'button0pay'} onClick={auction}>Go to Live Auction</button>}
                </div>
                {liveAuc && <AuctionDisplay />}
            </div>
        </div>
    )
}

export default Main