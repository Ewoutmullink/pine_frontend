// https://docs.cypress.io/api/table-of-contents

describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/login')
  })

  it('should render the component', () => {
    cy.get('.login').should('be.visible')
  })

  describe('Login component', () => {

    it('displays login form if browser is compatible', () => {
      cy.window().then((win) => {
        cy.stub(win.navigator, 'userAgent').value('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
      });

      cy.get('.login').should('be.visible');
    });

    it('displays error message when submitting an empty form', () => {
      cy.window().then((win) => {
        cy.stub(win.navigator, 'userAgent').value('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
      });

      cy.get('.login').should('be.visible');

      cy.get('.submitButton').click();
      cy.contains('Username is required');
      cy.contains('Password is required');
    });

    it('displays error message when submitting incorrect credentials', () => {
      cy.window().then((win) => {
        cy.stub(win.navigator, 'userAgent').value('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
      });

      cy.get('.login').should('be.visible');

      cy.get('.inputField[type="text"]').type('user');
      cy.get('.inputField[type="password"]').type('wrongpassword');
      cy.get('.submitButton').click();
      cy.contains('Something went wrong');
    });

    it('redirects to home page when submitting correct credentials', () => {
      cy.window().then((win) => {
        cy.stub(win.navigator, 'userAgent').value('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
      });

      cy.get('.login').should('be.visible');

      cy.get('.inputField[type="text"]').type('user');
      cy.get('.inputField[type="password"]').type('password');
      cy.get('.submitButton').click();

      cy.url().should('include', '/');
    });
  });
})

