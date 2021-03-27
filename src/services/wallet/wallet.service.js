import { useState } from 'react'
import createGlobalState from 'react-create-global-state'
import { useWalletApi } from '@services/api/wallet-api.service'
import { useAuthService } from '@services/auth/auth.service'
import { User, Wallet, WalletListItem } from '@models/index'

const [useGlobalWalletProvider, WalletProvider] = createGlobalState()

const useWalletService = () => {
  const [error, setError] = useState(null)
  const [wallet, setWallet] = useGlobalWalletProvider()

  const { authorization, loggedUser, updateLoggedUser } = useAuthService()

  const { createWallet, getWalletById } = useWalletApi({ authorization })

  const createNewWallet = async walletModel => {
    if (validate(walletModel)) {
      const result = await createWallet(walletModel)

      if (result && result.data) {
        const user = new User(loggedUser)
        const walletListItem = new WalletListItem({
          id: result.data.walletId,
          name: result.data.name,
          description: result.data.description
        })
        user.walletList.push(walletListItem)

        updateLoggedUser(user)
      }

      return result
    }
  }

  const getWallet = async id => {
    const data = await getWalletById(id)

    if (data) {
      setWallet(new Wallet(data))
      return new Wallet(data)
    }
  }

  const validate = ({ name, description }) => {
    if (!name) {
      setError('Nome é obrigatório.')
      return false
    }

    if (!description) {
      setError('Descrição é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  const getCalculateShares = (walletShareList = []) => {
    walletShareList.forEach(share => {
      const walletTotal = walletShareList.reduce((accumulator, currentShare) => accumulator + (currentShare.price * currentShare.qntShare), 0)
      const currentHeritage = share.price * share.qntShare
      const currentParticipation = (currentHeritage / walletTotal) * 100 || 0
      const distanceFromQntWanted = currentParticipation - share.qntWanted

      share.currentParticipation = currentParticipation.toFixed(2)
      share.distanceFromQntWanted = distanceFromQntWanted.toFixed(2)
      share.currentHeritage = currentHeritage.toFixed(2)
    })


    return walletShareList.map(share => share)
  }

  const getCalculateSimulation = (value = 0, walletShareList = []) => {
    let valueToDecrement = value
    const longestSharesFromObjectiveSorted = walletShareList.map(shareCopy => shareCopy).sort((a, b) => a.distanceFromQntWanted - b.distanceFromQntWanted)
    let walletCopy = walletShareList.map(shareCopy => {
      shareCopy.suggestion = 0

      return shareCopy
    })

    const tryBuyAShare = (longestShare) => {
      const findInWalletIndex = walletCopy.findIndex(share => share.walletShareId === longestShare.walletShareId)

      if (valueToDecrement > longestShare.price && longestShare.distanceFromQntWanted <= 0) {
        valueToDecrement -= longestShare.price
        walletCopy[findInWalletIndex].suggestion++

        walletCopy = getCalculateShares(walletCopy)

        return true
      }

      return false
    }

    while (valueToDecrement > 0) {
      const primaryLongestShare = longestSharesFromObjectiveSorted[0]
      const secondLongestShare = longestSharesFromObjectiveSorted[1]

      const cantBuyPrimary = !tryBuyAShare(primaryLongestShare)
      const cantBuySecondary = !tryBuyAShare(secondLongestShare)

      if (cantBuyPrimary && cantBuySecondary) {
        valueToDecrement = -valueToDecrement
      }
    }

    return { walletShares: walletCopy, rest: ((valueToDecrement) * -1)?.toFixed(2) }
  }

  return {
    createNewWallet,
    setWallet,
    walletError: error,
    getWallet,
    selectedWallet: wallet,
    getCalculateShares,
    getCalculateSimulation
  }
}

export { useWalletService, WalletProvider }
