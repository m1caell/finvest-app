class CreateShare {
  constructor({ walletId, shareCode, qntShare, qntWanted }) {
    this.walletId = walletId
    this.shareCode = shareCode
    this.qntShare = qntShare
    this.qntWanted = qntWanted
  }
}

export { CreateShare }
