//https://www.jianshu.com/p/a685a0b2e2f1   这篇文章可以参考，这个还是没有搞定，


var Web3=require("web3");
var contract = require("truffle-contract");
var truffledemoinfo =  require('/project/ionc/IPOSContract/build/contracts/IPOS.json');


var truffledemocontract = contract(truffledemoinfo);

//var provider = new Web3.providers.HttpProvider("http://localhost:8545");


/*
var HDWalletProvider = require("truffle-hdwallet-provider");
var provider= new HDWalletProvider("709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28", "http://localhost:8545");
*/

var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
var provider= new HDWalletProvider(["b6925c213ea376afec527f660df7d5ea28878b3f4cd61d64d8691cce6ff1a361"], "http://192.168.23.178:8545");

/*
var HDWalletProvider = require("truffle-wallet-provider");
var provider= new HDWalletProvider("709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28", "http://localhost:8545");
*/


var sendaddress = '0x9a04a58b0e74ab7d12af0b34fdc4275543452101';



truffledemocontract.setProvider(provider);


//var sendaddress = truffledemocontract.web3.eth.accounts[0];


/***
 * 根据系统默认的方式调用合约，所有的交易均有系统中已经unlock的用户发起
 */

// new 部署新的合约

/*
truffledemocontract.new({from:sendaddress,gas:1000000}).then(function(instance) {
    truffleapidemoInstance=instance;
    console.log(instance.address);
}).catch((err) => {
    console.info(err)
});
*/


// 调用刚才部署的合约的方法，模式形式，该方法一般应用在测试或者调试环境中

/*truffledemocontract.deployed().then(function(instance) {
    return instance.getstr.call(); // call 方式调用合约
}).then(result=>{
    console.info(result.toString());// return 0
}).catch(err=>{
    console.error(err);
});*/



/*var truffleapidemoInstance;
var contract_address = '0x6c6ffeca9104eeaca917ac75dc424a45d334dd25'

truffledemocontract.at(contract_address).then(function(instance) {

    return instance.getstr.call(); // call 方式调用合约


}).then(   result=> {

     console.info(result.toString()); // return 0

}).catch( err=>{

    console.error(err)

});*/


//*******************************************************************************************************//


/**
 *
 *  at方法可以通过合约的地址来调用指定的合约
 *
 */


///  调用刚才部署的合约

var contract_address = "0x0000000000000000000000000000000000000100";
var truffleapidemoInstance;
var web3 = new Web3();

truffledemocontract.at(contract_address).then(function(instance) {

    truffleapidemoInstance=instance;

    return  truffleapidemoInstance.mintPower.call(sendaddress);


    /*let gasPrice = web3.eth.gasPrice;
    //以transaction方式与合约交互
    return truffleapidemoInstance.deposit(  {from:sendaddress, gas: 300000,
        gasPrice: gasPrice.toString(),
        value: web3.toWei(5000000, 'ether')} );*/


}).then(   power=> {

    console.info(power)
    console.info(web3.fromWei(power, 'ether').toString());


}).catch( err=>{

    console.error(err)

});


// ===================== 通过私签名的方式来进行合约部署和调用 =======================  //


