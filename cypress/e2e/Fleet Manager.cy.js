describe('Fleet Manager', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))
    
  })

  context('Validações básicas', () => {
    it('Exibe o título da aplicação', () => {
      cy.contains('h3', 'Fleet Manager').should('be.visible')
    })

    it('Exibe veículo indisponível', () => {
      cy.buscarVeiculo('Volkswagen Polo').within(() => {
        cy.contains('span', 'Manutenção').should('be.visible')
        cy.contains('button', 'Alugar').should('be.disabled')
      })
    })
  })

  context('Aluguel de veículos', () => {
    it('Calcula valor total para 30 dias', () => {
      cy.alugarVeiculo('Toyota Corolla', 30)
      cy.contains('Valor Total').next().should('contain', 'R$ 3.600')
    })

    it('Realiza um aluguel válido', () => {
      cy.alugarVeiculo('Chevrolet Onix', 10)
      cy.contains('Veículo alugado com sucesso!').should('be.visible', { force: true })
    })

    it('Rejeita dias inválidos', () => {
      cy.alugarVeiculo('Scooter Elétrica', '300000000000000000')
      cy.contains('Quantidade de dia inválida').should('be.visible')
    })
  })

  context('Cupons de desconto', () => {
    it('Aceita cupom válido', () => {
      cy.alugarVeiculo('Fiat Uno', 30)
      cy.contains('Veículo alugado com sucesso!').should('be.visible', { force: true })
      cy.aplicarCupom('DESCONTO50')
      cy.contains('Cupom Aplicado com sucesso!').should('be.visible')
    })

    it('Rejeita cupom inválido', () => {
      cy.alugarVeiculo('Mercedes Classe C', 15)
      cy.contains('Veículo alugado com sucesso!').should('be.visible', { force: true })
      cy.aplicarCupom('DESCONTO500')
      cy.contains('Cupom Inválido').should('be.visible')
    })

    it.only('Remove cupom válido', () => {
      cy.alugarVeiculo('Bicicleta Motorizada', 30)
      cy.contains('Veículo alugado com sucesso!      ').should('be.visible', { force: true })
      cy.aplicarCupom('DESCONTO50')
      cy.contains('Cupom Aplicado com sucesso!').should('be.visible')

      cy.contains('button', 'Remover').click()
      cy.contains('Cupom removido com sucesso!').should('be.visible')
    })
  })

})
