// Import Login Page
import loginPage from '../../pages/loginPage'

// Import Directory Page
import directory from '../../pages/projectAkhir/directoryPage'

describe('OrangeHRM Directory With POM', () => {

    // Membuat object dari Page Object
    const login = new loginPage()

    // Sebelum setiap test dijalankan
    beforeEach(function () {

    login.visit()

    // Fixture login
    cy.fixture('loginData').as('loginData')

    // Fixture directory (ada di folder projectAkhir)
    cy.fixture('projectAkhir/directoryData').as('directoryData')

})

    // ===========================================================
    // TC-DIR-001
    // Login dan membuka menu Directory
    // ===========================================================
    it('TC-DIR-001 - Open Directory Menu', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)

        // Intercept proses login
        cy.intercept('GET', '**/dashboard/**').as('dashboard')

        login.clickLogin()

        cy.wait('@dashboard')

        // Intercept ketika membuka Directory
        cy.intercept('GET', '**/api/v2/directory/employees*').as('directory')

        cy.contains('Directory').click()

        cy.wait('@directory')

        cy.get('@directory')
            .its('response.statusCode')
            .should('eq', 200)

        directory.verifyDirectoryPage()

    })

    // ===========================================================
    // TC-DIR-002
    // Search Employee Name
    // ===========================================================
    it('TC-DIR-002 - Search Employee Name', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)
        login.clickLogin()

        cy.contains('Directory').click()

        cy.intercept('GET', '**nameOrId=*').as('searchEmployee')

        directory.inputEmployeeName(this.directoryData.employeeName)

        directory.clickSearch()

        cy.wait('@searchEmployee')

        cy.get('@searchEmployee')
            .its('response.statusCode')
            .should('eq', 200)

        directory.verifyEmployeeCard()

    })

    // ===========================================================
    // TC-DIR-003
    // Search Job Title
    // ===========================================================
    it('TC-DIR-003 - Search Job Title', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)
        login.clickLogin()

        cy.contains('Directory').click()

        cy.intercept('GET', '**jobTitleId=*').as('jobTitle')

        directory.selectJobTitle(this.directoryData.jobTitle)

        directory.clickSearch()

        cy.wait('@jobTitle')

        cy.get('@jobTitle')
            .its('response.statusCode')
            .should('eq', 200)

        directory.verifyEmployeeCard()

    })

    // ===========================================================
    // TC-DIR-004
    // Search Location
    // ===========================================================
    it('TC-DIR-004 - Search Location', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)
        login.clickLogin()

        cy.contains('Directory').click()

        cy.intercept('GET', '**locationId=*').as('location')

        directory.selectLocation(this.directoryData.location)

        directory.clickSearch()

        cy.wait('@location')

        cy.get('@location')
            .its('response.statusCode')
            .should('eq', 200)

        directory.verifyEmployeeCard()

    })

    // ===========================================================
    // TC-DIR-005
    // Search Employee + Job Title
    // ===========================================================
   it('TC-DIR-005 - Search Employee and Job Title', function () {

    login.inputUsername(this.loginData.validUser.username)
    login.inputPassword(this.loginData.validUser.password)
    login.clickLogin()

    cy.contains('Directory').click()

    directory.inputEmployeeName(this.directoryData.employeeName)
    directory.selectJobTitle(this.directoryData.jobTitle)

    // Intercept dipasang setelah isi filter
    cy.intercept('GET', '**/api/v2/directory/employees*').as('search')

    directory.clickSearch()

    cy.wait('@search')

    cy.get('@search')
        .its('response.statusCode')
        .should('eq', 200)

})

    // ===========================================================
    // TC-DIR-006
    // Search Employee + Location
    // ===========================================================
    it('TC-DIR-006 - Search Employee and Location', function () {

    login.inputUsername(this.loginData.validUser.username)
    login.inputPassword(this.loginData.validUser.password)
    login.clickLogin()

    cy.contains('Directory').click()

    directory.inputEmployeeName(this.directoryData.employeeName)
    directory.selectLocation(this.directoryData.location)

    // Intercept dipasang setelah isi filter
    cy.intercept('GET', '**/api/v2/directory/employees*').as('search')

    directory.clickSearch()

    cy.wait('@search')

    cy.get('@search')
        .its('response.statusCode')
        .should('eq', 200)

})

    // ===========================================================
    // TC-DIR-007
    // Reset Filter
    // ===========================================================
    it('TC-DIR-007 - Reset Search Filter', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)
        login.clickLogin()

        cy.contains('Directory').click()

        directory.inputEmployeeName(this.directoryData.employeeName)

        directory.clickReset()

        directory.verifyDirectoryPage()

    })

    // ===========================================================
    // TC-DIR-008
    // Search Invalid Employee
    // ===========================================================
    it('TC-DIR-008 - Search Invalid Employee', function () {

        login.inputUsername(this.loginData.validUser.username)
        login.inputPassword(this.loginData.validUser.password)
        login.clickLogin()

        cy.contains('Directory').click()

        cy.intercept('GET', '**nameOrId=*').as('invalidSearch')

        directory.inputEmployeeName(this.directoryData.invalidEmployee)

        directory.clickSearch()

        cy.wait('@invalidSearch')

        cy.get('@invalidSearch')
            .its('response.statusCode')
            .should('eq', 200)

    })

})