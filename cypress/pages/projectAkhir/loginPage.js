class loginPage {

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    inputUsername(username) {
        cy.get('input[name="username"]').clear().type(username)
    }

    inputPassword(password) {
        cy.get('input[name="password"]').clear().type(password)
    }

    clickLogin() {
        cy.get('button[type="submit"]').click()
    }

    clickForgotPassword() {
        cy.contains('Forgot your password?').click()
    }

    usernameField() {
        return cy.get('input[name="username"]')
    }

    passwordField() {
        return cy.get('input[name="password"]')
    }

    errorMessage() {
        return cy.get('.oxd-alert-content-text')
    }

    requiredMessage() {
        return cy.get('.oxd-input-field-error-message')
    }

}

export default loginPage