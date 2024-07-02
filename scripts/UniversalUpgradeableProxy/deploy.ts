import { ethers, upgrades } from "hardhat";

async function main() {
  const BoxV1 = await ethers.getContractFactory("BoxV1");
  const boxV1 = await upgrades.deployProxy(BoxV1, [42], {
    initializer: "initialize",
  });

  await boxV1.waitForDeployment();

  const boxV1Address = await boxV1.getAddress();
  console.log("BoxV1 deployed to:", boxV1Address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Box deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// Implementation Address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
// Admin Address:  0xCafac3dD18aC6c6e92c921884f9E4176737C052c
