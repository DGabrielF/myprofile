export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email)
}

export function validateYear(year) {
  let yearNumber = Number(year)
  if (isNaN(yearNumber)) return "Entrada inválido"
  if (yearNumber<0) return "Ano menor que zero"
  yearNumber = yearNumber<100?yearNumber+2000:yearNumber
  return String(yearNumber)
}