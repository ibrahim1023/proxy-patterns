import { ethers, upgrades } from "hardhat";

async function main() {
  const Box = await ethers.getContractFactory("Box");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" });

  await box.waitForDeployment();

  const boxAddress = await box.getAddress();
  console.log("Box deployed to:", boxAddress);
  console.log(
    "Implementation Address: ",
    await upgrades.erc1967.getImplementationAddress(boxAddress)
  );
  console.log(
    "Admin Address: ",
    await upgrades.erc1967.getAdminAddress(boxAddress)
  );
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
