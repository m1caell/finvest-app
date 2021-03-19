class UpdateShare {
  constructor({ walletShareId, walletId, shareCode, qntShare, qntWanted }) {
    this.walletShareId = walletShareId
    this.walletId = walletId
    this.shareCode = shareCode
    this.qntShare = qntShare
    this.qntWanted = qntWanted
  }
}

export { UpdateShare }
