class CreateShare {
  constructor({ walletId, share, qntShare, qntWanted }) {
    this.walletId = walletId
    this.share = share
    this.qntShare = qntShare
    this.qntWanted = qntWanted
  }
}

export { CreateShare }
