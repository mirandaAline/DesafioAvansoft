describe('FiltroBusca', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))
  })

   it('Realiza busca por modelo', () => { 
    cy.get('input[placeholder="Buscar por placa ou modelo..."]').clear().type('Mercedes')
    
    cy.contains('h3', 'Mercedes')
    .parents('.vehicle-card')
    .within(() => {
       cy.get('h3').should('have.text', 'Mercedes Classe C')
       cy.get('span').should('exist')

    })
})
 
  it('Realiza busca por placa - Chevrolet Onix', () => { 
    cy.get('input[placeholder="Buscar por placa ou modelo..."]').clear().type('XYZ5678')

    cy.contains('h3', 'Chevrolet Onix')
    .parents('.vehicle-card')
    .within(() => {
      cy.get('h3').should('have.text', 'Chevrolet Onix')
      cy.get('span').should('exist')

    })
  })
})