//https://www.jianshu.com/p/a685a0b2e2f1   这篇文章可以参考，这个还是没有搞定，


var Web3=require("web3");
var contract = require("truffle-contract");
var truffledemoinfo =  require('/project/ws_nodejs/eth/truffle/build/contracts/Truffledemo.json');


var truffledemocontract = contract(truffledemoinfo);

//var provider = new Web3.providers.HttpProvider("http://localhost:8545");


/*
var HDWalletProvider = require("truffle-hdwallet-provider");
var provider= new HDWalletProvider("709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28", "http://localhost:8545");
*/

var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
var provider= new HDWalletProvider(["709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28"], "http://localhost:8545");


/*
var HDWalletProvider = require("truffle-wallet-provider");
var provider= new HDWalletProvider("709211b14d391b50edd06c2544d81f5a77b4cc0668746569de5548c86a00bb28", "http://localhost:8545");
*/


var sendaddress = '0x9b511ccd1457b72380b817ffa2fd13a0f4b14bc7';



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

var contract_address = "0x6c6ffeca9104eeaca917ac75dc424a45d334dd25";
var truffleapidemoInstance;

truffledemocontract.at(contract_address).then(function(instance) {

    truffleapidemoInstance=instance;
    //以transaction方式与合约交互
    return truffleapidemoInstance.set( 1888 , {from:sendaddress} );


}).then(   result=> {

    // result 是一个对象，它包含下面这些值：
    //
    // result.tx      => 交易hash，字符型
    // result.logs    => 在交易调用中触发的事件，数组类型
    // result.receipt => 交易的接收对象，里面包含已使用的gas 数量

    console.info(result.receipt);//返回交易ID

    for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "Transfer") {
            console.log("from:", log.args._from);
            console.log("to:", log.args._to);
            console.log("amount:", log.args._value.toNumber());
            break;
        }
    }


}).then( ()=> {

    // 调用Storage get 方法
    return truffleapidemoInstance.get.call();

}).then( result=> {

    console.info( "the call result is : "+result.toString());

}).catch( err=>{

    console.error(err)

});


// ===================== 通过私签名的方式来进行合约部署和调用 =======================  //


