var Web3=require("web3");

var contract = require("truffle-contract");

var truffledemoinfo =  require('/project/ws_nodejs/eth/truffle/build/contracts/Truffledemo.json');


// 返回合约抽象
var truffledemo = contract(truffledemoinfo)

var provider = new Web3.providers.HttpProvider("http://localhost:8545");
truffledemo.setProvider(provider);


console.info(truffledemo.web3.eth.accounts);

truffledemo.currentProvider.sendAsync = function () {
    return truffledemo.currentProvider.send.apply(truffledemo.currentProvider, arguments);
};


// 通过合约抽象与合约交互
truffledemo.deployed().then(function(instance) {
    return instance.get.call(); // call 方式调用合约
}).then(result=>{
    console.info(result.toString());// return 0
}).catch(err=>{
    // 报错了！在这里处理异常信息
});


/*

// 通过合约抽象与合约交互
var truffledemoInstance;

truffledemo.deployed().then( (instance )=> {

    //return instance.getstr.call(); //
    console.info(truffledemo.web3.eth.accounts);

    truffledemoInstance=instance;

    //以transaction方式与合约交互
    return truffledemoInstance.set(42,{from:"0x63b19c288d467aca76c69e961fd99d2dbd876ea7"});


}).then(result=>{

    //
    // result.tx      => 交易hash，字符型
    // result.logs    => 在交易调用中触发的事件，数组类型
    // result.receipt => 交易的接收对象，里面包含已使用的gas 数量

    console.info(result.tx);//返回交易ID

    console.info("result is : "+result.toString());//
}).then(()=>{
    // 调用Storage get 方法
    return storageInstance.get.call();
}).then(result=>{
    console.info(result.toString());// 返回 42 ，说明我们之前的调用成功了！.catch(err=>{
    console.error(err);
});
*/

/*
var artifactor = require("truffle-artifactor");

// See truffle-schema for more info: https://github.com/trufflesuite/truffle-schema
var contract_data = {
    abi: abiobj              // Array; required.
};

artifactor.save(contract_data, "/project/ws_nodejs/eth/truffle/build/contracts/Truffledemo.json").then(function() {

});


var artifactor = require("truffle-artifactor");
artifactor.save({/!*...*!/}, "/project/ws_nodejs/eth/truffle/build/contracts/Truffledemo.json") // => a promise

// Later...
var MyContract = require("/project/ws_nodejs/eth/truffle/build/contracts/Truffledemo.json");
MyContract.setProvider(myWeb3Provider);
MyContract.deployed().then(function(instance) {
    return instance.doStuff();
}).then(function(result) {

    console.log(result.tx, result.logs, result.receipt);
});*/




//注册异常处理器
process.on('unhandledRejection', function (err) {
    console.error(err.stack);
});

process.on(`uncaughtException`, console.error);

