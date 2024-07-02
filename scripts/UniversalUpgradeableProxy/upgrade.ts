import { ethers, upgrades } from "hardhat";

const boxV1ProxyAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const boxV2 = await upgrades.upgradeProxy(boxV1ProxyAddress, BoxV2);

  const boxV2Address = await boxV2.getAddress();
  console.log("Box deployed to:", boxV2Address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
