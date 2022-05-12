import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const deploy = async () => {
    const whitelistContract = "0x53825024C8B827673F4B0c66ba5c3FA4e21E941f";
    const metadataUrl = "https://nft-collection-sneh1999.vercel.app/api/";
    
    const YorubaGods = await ethers.getContractFactory("YorubaGods");
    const yorubaGods = await YorubaGods.deploy(metadataUrl, whitelistContract);
    await yorubaGods.deployed();

  console.log("YorubaGods contract deployed to: ", yorubaGods.address);
}

deploy()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    })
