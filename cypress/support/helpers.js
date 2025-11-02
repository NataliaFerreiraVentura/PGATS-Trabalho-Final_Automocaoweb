import { faker, fakerPT_BR } from '@faker-js/faker';

// Funções para geração de dados dos testes

function getUserData() {
  return {
    name: fakerPT_BR.person.fullName(),
    firstName: fakerPT_BR.person.firstName(),
    lastName: fakerPT_BR.person.lastName(),
    password: 'Teste@123',
    phone: fakerPT_BR.phone.number().replace(/\D/g, '').substring(0, 11),
    address: fakerPT_BR.location.streetAddress(),
    city: fakerPT_BR.location.city(),
    state: fakerPT_BR.location.state(),
    zipcode: fakerPT_BR.location.zipCode().replace(/\D/g, '').substring(0, 8),
    country: 'Canada',
    company: faker.company.name()
  };
}

function getRandomEmail() {
  // Gera email único com timestamp para evitar duplicatas
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `qatester.pgats.${timestamp}.${randomSuffix}@teste.com`;
}

function createFakeCardData() {
  return {
    cardNumber: faker.finance.creditCardNumber('#### #### #### ####'),
    cardHolderName: fakerPT_BR.person.fullName().toUpperCase(),
    expirationMonth: faker.date.future().toLocaleString('en-US', { month: '2-digit' }),
    expirationYear: faker.date.future().getFullYear().toString(),
    cvv: faker.finance.creditCardCVV(),
    cardType: faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express'])
  };
}

function createNewUserData() {
    const dynamicData = getUserData();
    const birthDate = fakerPT_BR.date.birthdate({ min: 18, max: 80, mode: 'age' });
    
    return {
      name: dynamicData.name,
      email: getRandomEmail(),
      password: dynamicData.password,
      firstName: dynamicData.firstName,
      lastName: dynamicData.lastName,
      company: dynamicData.company,
      address: dynamicData.address,
      city: dynamicData.city,
      state: dynamicData.state,
      zipcode: dynamicData.zipcode,
      mobile: dynamicData.phone,
      country: 'Canada', // Pode ser dinâmico se necessário
      birthDay: birthDate.getDate().toString(),
      birthMonth: birthDate.toLocaleString('en-US', { month: 'long' }),
      birthYear: birthDate.getFullYear().toString()
    };
}

export { createNewUserData, getRandomEmail, createFakeCardData };