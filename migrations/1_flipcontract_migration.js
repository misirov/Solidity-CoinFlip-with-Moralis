const FlipContract = artifacts.require("FlipContract");


// async function to fund the contract as soon as it is delpoyed
module.exports = async function (deployer) {
  await deployer.deploy(FlipContract);
  let instance = await FlipContract.deployed()
  instance.fundContract({value:1000000000000000000})
};
