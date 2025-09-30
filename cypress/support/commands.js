Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/login')

    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('buscarVeiculo', (nome) => {
  cy.get('input[placeholder="Buscar por placa ou modelo..."]').clear().type(nome)
  return cy.contains('h3', nome).parents('.vehicle-card')
})

Cypress.Commands.add('alugarVeiculo', (nome, dias) => {
  cy.buscarVeiculo(nome).within(() => {
    cy.contains('span', 'Disponível').should('be.visible')
    cy.contains('button', 'Alugar').click()
  })
  cy.get('#days').type(dias)
  cy.contains('button', 'Confirmar Aluguel').click()
})

Cypress.Commands.add('aplicarCupom', (cupom) => {
  cy.get('input[placeholder="Ex: DESCONTO50"]').type(cupom)
  cy.contains('button', 'Aplicar').click()
})