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

const deserializeCPF = cpf => {
  return getOnlyNumbers(cpf)
}

const serializeRG = identity => {
  const num = identity.replace(/[^\d]/g, '')
  const len = num.length

  if (len <= 6) {
    identity = num.replace(/(\d{2})(\d{1,3})/g, '$1$2')
  } else if (len <= 9) {
    identity = num.replace(/(\d{2})(\d{2})(\d{1,3})/g, '$1$2$3')
  } else {
    identity = num.replace(/(\d{2})(\d{2})(\d{2})(\d{1,2})/g, '$1$2$3$4')
  }

  return identity
}

const deserializeRG = identity => {
  return getOnlyNumbers(identity)
}

const serializePhone = phone => {
  const num = phone.replace(/[^\d]/g, '')
  const len = num.length

  if (len <= 6) {
    phone = num.replace(/(\d{2})(\d{1,2})/g, '($1$2)')
    console.log(num)
  } else if (len <= 14) {
    phone = num.replace(/(\d{2})(\d{5})(\d{1,3})/g, '($1) $2-$3')
    console.log(num)
  } else {
    phone = num.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/g, '($1) $2-$3')
    console.log(num)
  }
  return phone
}

const deserializePhone = phone => {
  return getOnlyNumbers(phone)
}

const getOnlyNumbers = value => {
  return value.replace(/[^0-9]/gim, '')
}

export {
  serializeCPF,
  serializeRG,
  serializePhone,
  deserializeCPF,
  deserializeRG,
  deserializePhone,
  getOnlyNumbers
}
