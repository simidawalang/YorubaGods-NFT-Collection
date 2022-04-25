import React, { useEffect, useState, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import abi from "../../ethereum/artifacts/contracts/Whitelist.sol/Whitelist.json";
import headerImg from "../assets/crypto-devs.svg";
import Button from "../components/button";

const Home: NextPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWHitelisted, setIsWhitelisted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [noOfWhitelisted, setNoOfWhitelisted] = useState(0);
  const web3Modal = useRef();
  
  return (
    <div>
      <Head>
        <title>CryptoDevs NFT Collection</title>
        <meta
          name="description"
          content="Whitelist for CryptoDevs NFT Collection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="homepage-header">
          <div className="homepage-header__info">
            <h1 className="homepage-header__info-title">CryptoDevs</h1>
            <p className="homepage-header__info-text">
              An NFT collection for developers in crypto. <br /> 3 have already
              joined.
            </p>
            <Button
              className="homepage-header__btn"
              content="Join the whitelist"
              variant="green"
              size="lg"
            />
          </div>
          <div className="homepage-header__img">
            <Image src={headerImg} alt="CryptoDevs header image placeholder" />
          </div>
        </header>
      </main>
    </div>
  );
};

export default Home;
