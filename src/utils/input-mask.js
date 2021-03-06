const serializeCPF = cpf => {
  const num = cpf.replace(/[^\d]/g, '')
  const len = num.length

  if (len <= 6) {
    cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2')
  } else if (len <= 9) {
    cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3')
  } else {
    cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, '$1.$2.$3-$4')
  }

  return cpf
}
const serializeRG = rg => {
  const num = rg.replace(/[^\d]/g, '')
  const len = num.length

  if (len <= 10) {
    rg = num.replace(/\D/g, '')
  }

  return rg
}

const deserializeRG = rg => {
  return getOnlyNumbers(rg)
}

const deserializeCPF = cpf => {
  return getOnlyNumbers(cpf)
}

const getOnlyNumbers = value => {
  return value.replace(/[^0-9]/gim, '')
}

export {
  serializeCPF,
  serializeRG,
  deserializeCPF,
  deserializeRG,
  getOnlyNumbers
}
