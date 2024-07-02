import { expect } from "chai";
import hre from "hardhat";

describe("Universal Upgradeable Proxy", function () {
  let boxV1: any;
  let boxV2: any;
  let boxV1ProxyAddress: any;

  it("should deploy proxy", async function () {
    const BoxV1 = await hre.ethers.getContractFactory("BoxV1");
    boxV1 = await hre.upgrades.deployProxy(BoxV1, [42], {
      initializer: "initialize",
    });

    boxV1ProxyAddress = boxV1.target;
  });

  it("should upgrade proxy to same address", async function () {
    const BoxV2 = await hre.ethers.getContractFactory("BoxV2");
    boxV2 = await hre.upgrades.upgradeProxy(boxV1ProxyAddress, BoxV2);

    expect(boxV2.target).to.be.equal(boxV1ProxyAddress);
  });
});
