import loginPage from '../pages/loginPage'

describe('OrangeHRM Login With POM', () => {

    const login = new loginPage()

    beforeEach(function () {

        login.visit()

        cy.fixture('loginData').as('data')

    })

    // TC001
    it('TC-LGN-001 - Login menggunakan username dan password valid', function () {

        login.inputUsername(this.data.validUser.username)
        login.inputPassword(this.data.validUser.password)
        login.clickLogin()

        cy.url().should('include', '/dashboard')

    })

    // TC002
    it('TC-LGN-002 - Login dengan password salah', function () {

        login.inputUsername(this.data.wrongPassword.username)
        login.inputPassword(this.data.wrongPassword.password)
        login.clickLogin()

        login.errorMessage()
            .should('contain.text', 'Invalid credentials')

    })

    // TC003
    it('TC-LGN-003 - Login dengan username salah', function () {

        login.inputUsername(this.data.wrongUsername.username)
        login.inputPassword(this.data.wrongUsername.password)
        login.clickLogin()

        login.errorMessage()
            .should('contain.text', 'Invalid credentials')

    })

    // TC004
    it('TC-LGN-004 - Login tanpa username', function () {

        login.inputPassword(this.data.validUser.password)
        login.clickLogin()

        login.requiredMessage()
            .should('contain.text', 'Required')

    })

    // TC005
    it('TC-LGN-005 - Login tanpa password', function () {

        login.inputUsername(this.data.validUser.username)
        login.clickLogin()

        login.requiredMessage()
            .should('contain.text', 'Required')

    })

    // TC006
    it('TC-LGN-006 - Login tanpa username dan password', () => {

        login.clickLogin()

        login.requiredMessage()
            .should('have.length', 2)

    })

    // TC007
    it('TC-LGN-007 - Klik Forgot Password', () => {

        login.clickForgotPassword()

        cy.url().should('include', '/requestPasswordResetCode')

        cy.contains('Reset Password')
            .should('be.visible')

    })

    // TC008
    it('TC-LGN-008 - Login menggunakan tombol Enter', function () {

        login.inputUsername(this.data.validUser.username)

        login.passwordField()
            .type(this.data.validUser.password + '{enter}')

        cy.url({ timeout: 10000 })
            .should('include', '/dashboard')

    })

})