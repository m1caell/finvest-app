class Wallet {
  constructor({ walletId, name, description, walletShareList }) {
    this.walletId = walletId
    this.name = name
    this.description = description
    this.walletShareList = walletShareList
  }
}

export { Wallet }
