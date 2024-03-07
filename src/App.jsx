import { useState, useEffect, useMemo } from 'react';
import './App.scss';
import Web3 from 'web3';
import useTruncatedAddress from "./truncatedAddress"
import { PieChart } from '@mui/x-charts';

function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [totalSupply, setTotalSupply] = useState(''); //gorillaz
  const [totalSupplyPepaz, setTotalSupplyPepaz] = useState(''); //pepaz
  const [accountBalance, setAccountBalance] = useState(''); //gorillaz
  const [accountBalancePepaz, setAccountBalancePepaz] = useState(''); //pepaz
  const [approvalAmount, setApprovalAmount] = useState('');
  const [apy, setAPY] = useState('');
  const [stakedAmount, setStakedAmount] = useState(''); //gorillaz
  const [stakedAmountPepaz, setStakedAmountPepaz] = useState(''); //pepaz
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStakingInfoGorillaz, setShowStakingInfo] = useState(false);
  const [showStakingInfoSegundoToken, setShowStakingInfoSegundoToken] = useState(false);
  const [showInfoSegundoTokenSwap, setShowInfoSegundoToken] = useState(false);
  const [showTokenomics, setShowTokenomics] = useState(true);


  const truncatedAddress = useTruncatedAddress(account);

  const handleApprovalAmountChange = (event) => {
    const amount = event.target.value;
    setApprovalAmount(amount);
  };

  // Función para conectar MetaMask
  const handleWalletConnection = async () => {
    try {
      if (!web3) {
        // Si no hay instancia de web3, intenta conectar
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setIsLoggedIn(true); // Cambia el estado a conectado
        } else {
          alert('MetaMask extension not detected');
        }
      } else {
        // Si ya hay una instancia de web3, desconecta
        setWeb3(null);
        setAccount('');
        setIsLoggedIn(false); // Cambia el estado a desconectado
      }
    } catch (error) {
      console.error('Error connecting/disconnecting MetaMask:', error);
    }
  };
 
  // Dirección y ABI de tu contrato Gorillaz
  const gorillazContractAddress = '0x23f01d5440eA9465D807Df66b3a44d19f3Ce3147';
  const gorillazContractABI = useMemo(() => [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }], []); // Inserta el ABI de tu contrato Gorillaz

  // Dirección y ABI de tu contrato de staking de Gorillaz
  const stakingContractAddress = '0x52B0EADD4f3705E45fF9Df45Eb1591941eB5C645';
  const stakingContractABI = useMemo(() => [{ "inputs": [], "name": "BaseAPY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Gorillaz", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PARTICIPANTS_APY_FACTOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getApy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getStakedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_factor", "type": "uint256" }], "name": "setParticipantsApyFactor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "staked", "outputs": [{ "internalType": "uint32", "name": "start", "type": "uint32" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "participants", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalParticipants", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], []);


  // Dirección y ABI de tu contrato pepaz(segunda moneda , no listada)
  const pepazContractAddress = '0x5B8698fbc27fA4db37a272442D79Cfb1c1aF8e94';
  const pepazContractABI = useMemo(() => [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "Gorillaz", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "swapPepazForGorillaz", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }], []);

  // Dirección y ABI de tu contrato de staking de Gorillaz
  const stakingPepazContractAddress = '0x3fD0e4629272c081dba5683F579FD132C3551fCa';
  const stakingPepazContractABI = useMemo(() => [{ "inputs": [], "name": "BaseAPY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PARTICIPANTS_APY_FACTOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Pepaz", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "base_APYOne", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "base_APYThree", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "base_APYTwo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getApy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getStakedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_apyOne", "type": "uint256" }], "name": "setBaseApyOne", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_apyThree", "type": "uint256" }], "name": "setBaseApyThree", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_apyTwo", "type": "uint256" }], "name": "setBaseApyTwo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_factor", "type": "uint256" }], "name": "setParticipantsApyFactor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "staked", "outputs": [{ "internalType": "uint32", "name": "start", "type": "uint32" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "participants", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalParticipants", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], []);

  // Gorillaz token
  const gorillazContract = useMemo(() => {
    if (web3) {
      return new web3.eth.Contract(gorillazContractABI, gorillazContractAddress);
    }
  }, [web3, gorillazContractABI, gorillazContractAddress]);

  //staking GORILLAZ
  const stakingGorillaContract = useMemo(() => {
    if (web3) {

      return new web3.eth.Contract(stakingContractABI, stakingContractAddress);
    }
  }, [web3, stakingContractABI, stakingContractAddress]);

  // pepaz Token
  const pepazContract = useMemo(() => {
    if (web3) {

      return new web3.eth.Contract(pepazContractABI, pepazContractAddress);
    }
  }, [web3, pepazContractABI, pepazContractAddress]);

  const pepazStakingContract = useMemo(() => {
    if (web3) {

      return new web3.eth.Contract(stakingPepazContractABI, stakingPepazContractAddress);
    }
  }, [web3, stakingPepazContractABI, stakingPepazContractAddress]);


  //REALIZAR STAKE Y APPROVE gorillaz
  const approveAndStake = async () => {
    try {
      if (!web3 || !gorillazContract || !stakingGorillaContract) {
        console.error('Web3 or contract instance not found');
        return;
      }
      const amountInWei = web3.utils.toWei(approvalAmount, 'ether');
     
      // Approve the transfer of tokens to the staking contract
      await gorillazContract.methods.approve(stakingContractAddress, amountInWei).send({ from: account, gas: '2000000' });

      // Stake the approved amount in the staking contract
      await stakingGorillaContract.methods.stake(amountInWei).send({ from: account,gas: '2000000'});

      console.log('Approval and staking successful');
    } catch (error) {
      console.error('Error approving and staking:', error);
    }
  };

  //SWAP PEPA TOKEN FOR GORILLAZ
  const swapPepazForGorillaz = async () => {
    try {
      if (!web3 || !pepazContract) {
        console.error('Web3 or contract instance not found');
        return;
      }

      // Cantidad de tokens Pepaz a intercambiar
      const amountInWei = web3.utils.toWei(approvalAmount, 'ether');

      // Llama a la función swapPepazForGorillaz del contrato PepaZ
      await pepazContract.methods.swapPepazForGorillaz(account, amountInWei).send({ from: account, gas: '2000000'});

      console.log('Swap successful');
    } catch (error) {
      console.error('Error swapping Pepaz for Gorillaz:', error);
    }
  };


  //OBTENER TOTALSUPPLY Y BALANCE INDIVIDUAL gorillaz
  useEffect(() => {
    const fetchTotalSupply = async () => {
      try {
        if (web3 && gorillazContract && account) {
          const totalSupply = await gorillazContract.methods.totalSupply().call();
          setTotalSupply(web3.utils.fromWei(totalSupply, "ether"));


          // Obtener el saldo de tokens Gorillaz del usuario conectado
          const userBalance = await gorillazContract.methods.balanceOf(account).call();
          setAccountBalance(web3.utils.fromWei(userBalance, "ether"));
        }
      } catch (error) {
        console.error('Error getting total supply:', error);
      }
    };

    fetchTotalSupply();

    // Every time web3 or gorillazContract changes, update the totalSupply
  }, [web3, gorillazContract, account]);

  //OBTENER TOTALSUPPLY Y BALANCE INDIVIDUAL PEPAZ
  useEffect(() => {
    const fetchTotalSupplyPepaz = async () => {
      try {
        if (web3 && pepazContract && account) {
          const totalSupply = await pepazContract.methods.totalSupply().call();
          setTotalSupplyPepaz(web3.utils.fromWei(totalSupply, "ether"));


          // Obtener el saldo de tokens Gorillaz del usuario conectado
          const userBalance = await pepazContract.methods.balanceOf(account).call();
          setAccountBalancePepaz(web3.utils.fromWei(userBalance, "ether"));
        }
      } catch (error) {
        console.error('Error getting total supply:', error);
      }
    };

    fetchTotalSupplyPepaz();

    // Every time web3 or gorillazContract changes, update the totalSupply
  }, [web3, pepazContract, account]);

  //REALIZAR STAKE Y APPROVE Litgorillaz
  const approveAndStakePepaz = async () => {
    try {
      if (!web3 || !pepazContract || !pepazStakingContract) {
        console.error('Web3 or contract instance not found');
        return;
      }
      const amountInWei = web3.utils.toWei(approvalAmount, 'ether');

      // Approve the transfer of tokens to the staking contract
      await pepazContract.methods.approve(stakingPepazContractAddress, amountInWei).send({ from: account, gas: '2000000'});

      // Stake the approved amount in the staking contract
      await pepazStakingContract.methods.stake(amountInWei).send({ from: account, gas: '2000000'});

      console.log('Approval and staking successful');
    } catch (error) {
      console.error('Error approving and staking:', error);
    }
  };


  //Withdraw Gorillaz
  const withdraw = async () => {
    try {

      await stakingGorillaContract.methods.withdraw().send({ from: account, gas: '2000000'});
      console.log('Withdraw successful');

    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  //Withdraw Litgorillaz
  const withdrawPepaz = async () => {
    try {

      await pepazStakingContract.methods.withdraw().send({ from: account, gas: '2000000'});
      console.log('Withdraw successful');

    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  useEffect(() => {
    // Obtener APY del contrato de staking
    const getAPY = async () => {
      try {
        if (web3 && stakingGorillaContract) {

          const apy = await stakingGorillaContract.methods.getApy().call();
          setAPY(apy.toString());

        }
      } catch (error) {
        console.error('Error getting APY:', error);
      }
    };

    getAPY();
  }, [stakingGorillaContract, web3]);

  //OBTENER AMOUNT EN STAKING DE LA PERSONA QUE SE LOGEO (GORILLAZ)
  useEffect(() => {
    const fetchStakedAmount = async () => {
      try {
        if (web3 && stakingGorillaContract && account) {

          const amountObject = await stakingGorillaContract.methods.staked(account).call();
          const amount = amountObject.amount;
          setStakedAmount(web3.utils.fromWei(amount, 'ether'));
        }
      } catch (error) {
        console.error('Error getting staked amount:', error);
      }
    };

    fetchStakedAmount();
  }, [account, stakingGorillaContract, web3]);

  //obtener cantidad que puso en stake Litgorillaz TOKEN
  useEffect(() => {
    const StakedPepaz = async () => {
      try {
        if (web3 && pepazStakingContract && account) {

          const amountObject = await pepazStakingContract.methods.staked(account).call();
          const amount = amountObject.amount;
          setStakedAmountPepaz(web3.utils.fromWei(amount, 'ether'));
        }
      } catch (error) {
        console.error('Error getting staked amount:', error);
      }
    };

    StakedPepaz();
  }, [account, pepazStakingContract, web3]);

  // Función para redirigir al usuario a Uniswap
  const handleBuyOnUniswap = () => {
    window.open('https://app.uniswap.org/#/swap', '_blank');
  }

  //Mostrar stake gorillaz y withdraw  
  const toggleStakingInfo = () => {
    setShowStakingInfo(!showStakingInfoGorillaz);  //STAKING GORILLAZ  
    setShowStakingInfoSegundoToken(false); // Reset the state for the other token (STAKING Litgorillaz)
    setShowInfoSegundoToken(false) //(TOKEN Litgorillaz)
    setShowTokenomics(false); //tokenomics
  };

  //Mostrar stake SegundoToken y withdraw  
  const toggleStakingInfoSegundoToken = () => {
    setShowStakingInfoSegundoToken(!showStakingInfoSegundoToken); //(STAKING Litgorillaz)
    setShowStakingInfo(false) //STAKING GORILLAZ
    setShowInfoSegundoToken(false) //(TOKEN Litgorillaz)
    setShowTokenomics(false); //tokenomics
  };

  //Mostrar Swap 
  const toggleInfoSegundoToken = () => {
    setShowInfoSegundoToken(!showInfoSegundoTokenSwap); //(TOKEN Litgorillaz)
    setShowStakingInfo(false) //STAKING GORILLAZ
    setShowStakingInfoSegundoToken(false); //(STAKING Litgorillaz)
    setShowTokenomics(false); //tokenomics

  };

    //Mostrar Tokenomics
    const toggleTokenomics = () => {
      setShowTokenomics(!showTokenomics); //tokenomics
      setShowInfoSegundoToken(false); //(TOKEN Litgorillaz)
      setShowStakingInfo(false) //STAKING GORILLAZ
      setShowStakingInfoSegundoToken(false); //(STAKING Litgorillaz)
  
    };



  return (
    <div className="App">
      <header className="App-header">
        {/* Botón de conexión/desconexión */}
        <nav className="navbar">
          <ul className='navbar_parent'>
            <li>
              {isLoggedIn ? (
                <button onClick={handleWalletConnection}>Disconnect</button>
              ) : (
                <button onClick={handleWalletConnection}>Connect Wallet</button>
              )}
            </li>
            <li>
              {showStakingInfoGorillaz ? (

                <button onClick={withdraw}>Withdraw Gorillaz</button>
              ) : (
                <button onClick={toggleStakingInfo}>Stake Gorillaz</button>
              )}

            </li>

            <li>
              {showStakingInfoSegundoToken ? (

                <button onClick={withdrawPepaz}>Withdraw Litgorillaz</button>
              ) : (
                <button onClick={toggleStakingInfoSegundoToken}>Stake Litgorillaz</button>
              )}

            </li>

            <li>
              <button onClick={handleBuyOnUniswap} target="_blank">Buy on Uniswap</button>
            </li>

            <li>
              <button onClick={toggleInfoSegundoToken} target="_blank">Swap</button>
            </li>

            <li>
              {showTokenomics ? (

                <button>Tokenomics</button>
              ) : (
                <button onClick={toggleTokenomics}>Tokenomics</button>
              )}

            </li>

          </ul>

        </nav>
      </header>

           

      <main>
      {showTokenomics && 
      <div className='tokenomics'>
        <div className='tokenomics-text'>
        <h2>Gorillaz <span>(GRZ)</span> TOKENOMICS EXPLAINED</h2>
        <h3>Total TokenSupply: 10.000.000  <span>(GRZ)</span> </h3>
        <p>Team (500.000)</p>
        <p>Marketing (1.000.000)</p>
        <p>Development (1.000.000)</p>
        <p>Reward (1.000.000)</p>
        <p>Supply (6.500.000)</p>
        </div>
       
      <PieChart
      series={[
        {
          outerRadius:80,
          data: [          
            { id: 0, value: 5, color: '#48C3FC', label: 'Team 5%' },
            { id: 1, value: 10, color: '#01CADC', label: 'Marketing 10%' },
            { id: 2, value: 10, color: '#65A6FA', label: 'Development 10%' },
            { id: 3, value: 10, color: '#7E80E7', label: 'Reward 10%' },
            { id: 4, value: 65, color: '#9B58CC', label: 'Supply 65%' },
          ],
        },
      ]}
      width={450}
      height={200}
    />
    </div>
      }

      {showStakingInfoGorillaz && account &&  (
        <div className='stakingInfoGorillaz'>
          <h1>GRZ Staking</h1>
          <div className="reward-info">
            <input
              className="inputStakeApprove"
              type="number"
              placeholder="Amount"
              value={approvalAmount}
              onChange={handleApprovalAmountChange}
            />
            <button onClick={approveAndStake}>Approve and Stake</button>
          </div>

          <p className='precaution'>Note The amount entered must first be approved to then be able to stake</p>


          <div className="reward-info">
            <p> Account</p>
            <p> {truncatedAddress} </p>
          </div>

          <div className="reward-info">
            <p>Your Gorillaz Balance </p>
            <p>{accountBalance}</p>
          </div>

          <div className="reward-info">
            <p>Tokens in staking  </p>
            <p>{stakedAmount} </p>
          </div>

          <div className="reward-info">
            <p>TotalSupply  </p>
            <p>{totalSupply} </p>
          </div>

          <div className="reward-info">
            <p>Apy  </p>
            <p>{apy}% </p>
          </div>

          <p className='precaution'>Note: You must wait 10 days once the stake has been made to be able to withdraw your amount + amount with the reward, otherwise you can withdraw but the initial amount you deposited will be returned without any type of reward.</p>

        </div>
      )}


        {showStakingInfoSegundoToken && account && (
          <div className='stakingInfoGorillaz'>
            <h1>Litgorillaz Staking</h1>
            <div className="reward-info">
              <input
                className="inputStakeApprove"
                type="number"
                placeholder="Amount"
                value={approvalAmount}
                onChange={handleApprovalAmountChange}
              />
              <button onClick={approveAndStakePepaz}>Approve and Stake</button>
            </div>

            <p className='precaution'>Note The amount entered must first be approved to then be able to stake</p>

            <div className="reward-info">
              <p>Rewards for staking</p>
              <p>{apy}%</p>
            </div>

            <p className='precaution'>Amount + (Amount * {apy} / 100) formula to calculate the reward ({apy} is the apy currently)</p>

            <div className="reward-info">
              <p> Account</p>
              <p> {truncatedAddress} </p>
            </div>

            <div className="reward-info">
              <p>Your Litgorillaz Balance </p>
              <p>{accountBalancePepaz}</p>
            </div>

            <div className="reward-info">
              <p>Tokens in staking  </p>
              <p>{stakedAmountPepaz} </p>
            </div>

            <div className="reward-info">
              <p>Rewards for staking 1 month</p>
              <p>5% APY</p>
            </div>

            <div className="reward-info">
              <p>Rewards for staking 2 month</p>
              <p>10% APY</p>
            </div>

            <div className="reward-info">
              <p>Rewards for staking 3 month</p>
              <p>20% APY</p>
            </div>

            <p className='precaution'>Note: If the time entered is less than those stated and you withdraw, the initial amount will be returned. In addition, the maximum is 3 months of staking. These APY values can be modified.</p>

          </div>

        )}

        {showInfoSegundoTokenSwap && account && (
          <div className='stakingInfoGorillaz'>
            <h1>SegundoToken Swap</h1>
            <div className="reward-info">
              <input
                className="inputStakeApprove"
                type="number"
                placeholder="Amount"
                value={approvalAmount}
                onChange={handleApprovalAmountChange}
              />
              <button onClick={swapPepazForGorillaz}>Swap</button>
            </div>

            <p className='precaution'>The Tax will initially be 0%, but will increase when necessary (uint256 taxAmount = (amount * _taxPercentage) / 100;)</p>

            <div className="reward-info">
              <p> Account</p>
              <p> {truncatedAddress} </p>
            </div>


            <div className="reward-info">
              <p>Your Litgorillaz Balance </p>
              <p>{accountBalancePepaz}</p>
            </div>

            <div className="reward-info">
              <p>TotalSupply  </p>
              <p>{totalSupplyPepaz} </p>
            </div>

          </div>

        )}

      </main>
    </div>
  );
}

export default App;
