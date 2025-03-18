function getByTestId(testId: string) {
  return cy.get(`[data-testid="${testId}"]`)
}

describe('Horse Race App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display no horses available initially', () => {
    getByTestId('HorseList_NoHorses').should('be.visible')
  })

  it('should generate horses and display them in the list', () => {
    cy.get('button').contains('Generate').click()
    const horses = getByTestId('HorseList_Horses')
    horses.should('be.visible')
    cy.get('tbody tr').should('have.length.greaterThan', 0)
  })

  it('should start the race and display the race progress', () => {
    cy.get('button').contains('Generate').click()
    cy.get('button').contains('Start').click()
    const startRaceButton = getByTestId('StartRaceButton_Button')
    startRaceButton.should('be.disabled')
    cy.get('.horse').should('have.length.greaterThan', 0)
  })
})
