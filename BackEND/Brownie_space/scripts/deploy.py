from brownie import Honey, accounts

def main():
    deployer = accounts[0]  # Utiliser le premier compte Ganache comme propriétaire
    contract = Honey.deploy({"from": deployer})
    print("Contract deployed at:", contract.address)
    return contract
