describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Deve fazer login com sucesso', () => {
    cy.login(
      Cypress.env('email'),
      Cypress.env('senha')
    )
    cy.contains('Login realizado com sucesso!').should('be.visible')
  })


  it('Realiza login com o e-mail inválido', () => {
    cy.login(
      'admin@teste.comm',
        Cypress.env('senha')
    )
    cy.contains('Erro no login').should('be.visible')
  })

  it('Realiza login com a senha inválida', () => {
    cy.login(
        Cypress.env('email'),
        '987654321'
    )
    cy.contains('Erro no login').should('be.visible')

  })
})

