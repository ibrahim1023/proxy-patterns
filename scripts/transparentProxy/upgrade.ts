import { ethers, upgrades } from "hardhat";

const boxProxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const Box2 = await ethers.getContractFactory("Box2");
  const box2 = await upgrades.upgradeProxy(boxProxyAddress, Box2);

  const box2Address = await box2.getAddress();
  console.log("Box deployed to:", box2Address);

  console.log(
    "Implementation Address: ",
    await upgrades.erc1967.getImplementationAddress(box2Address)
  );
  console.log(
    "Admin Address: ",
    await upgrades.erc1967.getAdminAddress(box2Address)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
