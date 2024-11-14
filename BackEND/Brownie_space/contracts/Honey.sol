// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Honey {
    struct HoneyProduct {
        uint256 id;
        string producer;
        string origin;
        uint256 productionDate;
        bytes32 qrHash;
        bool isCertified;
    }

    mapping(uint256 => HoneyProduct) public honeyProducts;
    mapping(bytes32 => uint256) public qrHashToId;
    uint256 public honeyCount;

    address public owner;
    mapping(address => bool) public producers;
    mapping(address => bool) public consumers;

    event HoneyProductAdded(uint256 id, string producer, string origin, uint256 productionDate, bytes32 qrHash);
    event CertificationUpdated(uint256 id, bool isCertified);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyProducer() {
        require(producers[msg.sender] == true, "Only producers can add products");
        _;
    }

    modifier onlyConsumer() {
        require(consumers[msg.sender] == true, "Only consumers can verify products");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProducer(address _producer) public onlyOwner {
        producers[_producer] = true;
    }

    function addConsumer(address _consumer) public onlyOwner {
        consumers[_consumer] = true;
    }

    function addHoneyProduct(string memory _producer, string memory _origin, uint256 _productionDate, bytes32 _qrHash) public onlyProducer {
        honeyCount++;
        honeyProducts[honeyCount] = HoneyProduct(honeyCount, _producer, _origin, _productionDate, _qrHash, true);
        qrHashToId[_qrHash] = honeyCount;
        emit HoneyProductAdded(honeyCount, _producer, _origin, _productionDate, _qrHash);
    }

    function verifyHoneyProduct(bytes32 _qrHash) public view onlyConsumer returns (bool) {
        uint256 productId = qrHashToId[_qrHash];
        HoneyProduct memory product = honeyProducts[productId];
        return product.isCertified && product.qrHash == _qrHash;
    }
}
