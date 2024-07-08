import hre from "hardhat";
import { expect } from "chai";

let diamondAsMath: any;
let mathFacet: any;
let diamondCut: any;
let diamondAsStorage: any;

describe("Diamond Proxy Pattern", function () {
  it("Should deploy and delegate calls correctly", async function () {
    // Deploy MathFacet
    const MathFacet = await hre.ethers.getContractFactory("MathFacet");
    mathFacet = await MathFacet.deploy();

    // Deploy StorageFacet
    const StorageFacet = await hre.ethers.getContractFactory("StorageFacet");
    const storageFacet = await StorageFacet.deploy();

    // Deploy DiamondCutFacet
    const DiamondCutFacet = await hre.ethers.getContractFactory(
      "DiamondCutFacet"
    );
    const diamondCutFacet = await DiamondCutFacet.deploy();

    // Deploy Diamond
    const Diamond = await hre.ethers.getContractFactory("Diamond");
    const diamond = await Diamond.deploy(diamondCutFacet.target);

    // Add MathFacet functions to Diamond
    diamondCut = diamondCutFacet.attach(diamond.target);

    const mathSelectors = [
      mathFacet.interface.getFunction("add")?.selector,
      mathFacet.interface.getFunction("subtract")?.selector,
    ];

    await diamondCut.diamondCut(mathFacet.target, mathSelectors);

    // Call add function through Diamond
    diamondAsMath = mathFacet.attach(diamond.target);
    expect(await diamondAsMath.add(2, 3)).to.equal(5);

    // Call subtract function through Diamond
    expect(await diamondAsMath.subtract(5, 3)).to.equal(2);

    // Add StorageFacet functions to Diamond
    const storageSelectors = [
      storageFacet.interface.getFunction("setSomeValue").selector,
      storageFacet.interface.getFunction("getSomeValue").selector,
    ];
    await diamondCut.diamondCut(storageFacet.target, storageSelectors);

    // Call setSomeValue function through Diamond
    diamondAsStorage = storageFacet.attach(diamond.target);
    await diamondAsStorage.setSomeValue(42);

    // Call getSomeValue function through Diamond
    expect(await diamondAsStorage.getSomeValue()).to.equal(42);
  });

  it("Should upgrade subtract function", async function () {
    // Deploy AdvancedMathFacet with a new implementation of subtract
    const AdvancedMathFacet = await hre.ethers.getContractFactory(
      "AdvancedMathFacet"
    );
    const advancedMathFacet = await AdvancedMathFacet.deploy();
    const advancedMathSelector = [
      mathFacet.interface.getFunction("subtract")?.selector, //same signature as mathFacet
    ];

    await diamondCut.diamondCut(advancedMathFacet.target, advancedMathSelector);

    expect(await diamondAsMath.subtract(5, 3)).to.equal(2); //calls the advanced subtract
  });
});
