import { expect } from "chai";
import hre from "hardhat";

describe("Transparent Proxy", function () {
  let box: any;
  let box2: any;
  let boxProxyAddress: any;

  it("should deploy proxy", async function () {
    const Box = await hre.ethers.getContractFactory("Box");
    box = await hre.upgrades.deployProxy(Box, [42], { initializer: "store" });
    boxProxyAddress = box.target;
  });

  it("should upgrade proxy to same address", async function () {
    const Box2 = await hre.ethers.getContractFactory("Box2");
    box2 = await hre.upgrades.upgradeProxy(boxProxyAddress, Box2);

    expect(box2.target).to.be.equal(boxProxyAddress);
  });
});
