import React, { useEffect, useState, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";
import Image from "next/image";
import headerImg from "../assets/crypto-devs.svg";
import Button from "../components/button";
import { WHITELIST_ADDRESS, ABI } from "../constants/index";

const Home: NextPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [noOfWhitelisted, setNoOfWhitelisted] = useState(0);
  const web3ModalRef: any = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Use Rinkeby");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(WHITELIST_ADDRESS, ABI, signer);
      const tx = await whitelistContract.addAddressToWhitelist();
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);

      await getNumberOfWhitelisted();
      setIsWhitelisted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();

      const whitelistContract = new Contract(WHITELIST_ADDRESS, ABI, provider);

      const _noOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNoOfWhitelisted(_noOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfWhitelisted = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(WHITELIST_ADDRESS, ABI, signer);
      const address = await signer.getAddress();
      const joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setIsWhitelisted(!!joinedWhitelist);
    } catch (e) {
      console.error(e);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setIsWalletConnected(true);
      checkIfWhitelisted();
      getNumberOfWhitelisted();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isWalletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [isWalletConnected]);

  return (
    <div>
      <Head>
        <title>YorubaGods NFT Collection</title>
        <meta
          name="description"
          content="Whitelist for YorubaGods NFT Collection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="homepage-header">
          <div className="homepage-header__info">
            <h1 className="homepage-header__info-title">Yoruba Gods</h1>
            <p className="homepage-header__info-text">
              Rich and diverse culture. <br /> {noOfWhitelisted} have already
              joined.
            </p>
            {isWalletConnected ? (
              isWhitelisted ? (
                <h3>Thanks for joining the whitelist!</h3>
              ) : (
                <Button
                  className="homepage-header__btn"
                  content="Join the whitelist"
                  variant="green"
                  size="lg"
                  onClick={addAddressToWhitelist}
                />
              )
            ) : (
              <Button
                className="homepage-header__btn"
                content="Connect Wallet"
                variant="green"
                size="lg"
                onClick={connectWallet}
              />
            )}
          </div>
          <div className="homepage-header__img">
            <Image src={headerImg} alt="Yoruba gods image placeholder" />
          </div>
        </header>
      </main>
    </div>
  );
};

export default Home;
