import { WalletListItem } from './wallet-list-item'

const USER_TYPE = {
  ANALYST: 'ANALYST',
  CUSTOMER: 'CUSTOMER'
}

class User {
  constructor({
    id,
    firstLogin,
    name,
    email,
    phone,
    address,
    type,
    token,
    walletList = []
  }) {
    this.id = id
    this.firstLogin = firstLogin
    this.name = name
    this.email = email
    this.phone = phone
    this.address = address
    this.type = USER_TYPE[type]
    this.token = token
    this.walletList = walletList.map(wallet => new WalletListItem(wallet))
    this.selectedWallet = null
  }
}

export { User, USER_TYPE }
