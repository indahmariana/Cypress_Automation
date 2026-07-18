import loginPage from '../../pages/loginPage'
import recruitmentPage from '../../pages/projectAkhir/recruitmentPage'


describe.only('OrangeHRM Recruitment With POM', () => {

    const login = new loginPage()
    const recruitment = recruitmentPage


    beforeEach(function () {

        // Membuka halaman Login
        login.visit()


        // Memanggil fixture Login
        cy.fixture('loginData').as('loginData')


        // Memanggil fixture Recruitment
        cy.fixture('projectAkhir/recruitmentData').as('recruitmentData')


        // Login menggunakan akun valid
        cy.get('@loginData').then((data) => {

            login.inputUsername(data.validUser.username)

            login.inputPassword(data.validUser.password)

            login.clickLogin()

        })


        // Masuk menu Recruitment
        cy.contains('Recruitment')
            .click()


        // Validasi halaman Recruitment terbuka
        cy.contains('Candidates')
            .should('be.visible')

    })



    // ==========================================================
// TC001
// Membuka menu Recruitment
// ==========================================================

it('TC-REC-001 - Open Recruitment Menu', function () {


    // Validasi halaman Recruitment sudah terbuka
    recruitment.verifyRecruitmentPage()


    // Intercept request candidate
    cy.intercept(
        'GET',
        '**/api/v2/recruitment/candidates*'
    ).as('recruitment')


    // Refresh halaman agar request terpanggil ulang
    cy.reload()


    // Tunggu API Recruitment
    cy.wait('@recruitment')


    // Validasi response API
    cy.get('@recruitment')
        .its('response.statusCode')
        .should('eq', 200)

})


    // ==========================================================
    // TC002
    // Search Candidate Name
    // ==========================================================

    it('TC-REC-002 - Search Candidate Name', function () {


        // Intercept search candidate
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('candidate')


        // Input candidate name
        recruitment.inputCandidateName(
            this.recruitmentData.candidateName
        )


        // Klik search
        recruitment.clickSearch()


        // Tunggu API
        cy.wait('@candidate')


        // Validasi response
        cy.get('@candidate')
            .its('response.statusCode')
            .should('eq', 200)

    })



    // ==========================================================
    // TC003
    // Search Job Title
    // ==========================================================

    it('TC-REC-003 - Search Job Title', function () {


        // Intercept filter job title
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('jobTitle')


        // Pilih job title
        recruitment.selectJobTitle(
            this.recruitmentData.jobTitle
        )


        // Klik search
        recruitment.clickSearch()


        // Tunggu API
        cy.wait('@jobTitle')


        // Validasi response
        cy.get('@jobTitle')
            .its('response.statusCode')
            .should('eq', 200)

    })



    // ==========================================================
    // TC004
    // Search Status
    // ==========================================================

    it('TC-REC-004 - Search Status', function () {


        // Intercept filter status
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('status')


        // Pilih status
        recruitment.selectStatus(
            this.recruitmentData.status
        )


        // Klik search
        recruitment.clickSearch()


        // Tunggu API
        cy.wait('@status')


        // Validasi response
        cy.get('@status')
            .its('response.statusCode')
            .should('eq', 200)

    })



    // ==========================================================
    // TC005
    // Search Candidate By Name
    // ==========================================================

    it('TC-REC-005 Search candidate by name', function () {


        // Intercept API search candidate
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('searchCandidate')


        // Input nama candidate
        recruitment.inputCandidateName(
            this.recruitmentData.candidateName
        )


        // Klik search
        recruitment.clickSearch()


        // Validasi response API
        cy.wait('@searchCandidate')
            .its('response.statusCode')
            .should('eq', 200)


        // Validasi data tampil
        recruitment.verifyRecordFound()

    })



    // ==========================================================
    // TC006
    // Filter Candidate By Job Title
    // ==========================================================

    it('TC-REC-006 Filter candidate by job title', function () {


        // Intercept API filter job
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('filterJob')


        // Pilih job title
        recruitment.selectJobTitle(
            this.recruitmentData.jobTitle
        )


        // Klik search
        recruitment.clickSearch()


        // Validasi API
        cy.wait('@filterJob')
            .its('response.statusCode')
            .should('eq', 200)


        // Validasi data tampil
        recruitment.verifyRecordFound()

    })



    // ==========================================================
    // TC007
    // Reset Candidate Filter
    // ==========================================================

    it('TC-REC-007 Reset candidate filter', function () {


        // Intercept API reset
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as('resetFilter')


        // Klik reset
        recruitment.clickReset()


        // Validasi API
        cy.wait('@resetFilter')
            .its('response.statusCode')
            .should('eq', 200)


        // Validasi table tampil
        recruitment.verifyRecordFound()

    })

// ==========================================================
// TC008
// Open Candidate Detail
// ==========================================================

it('TC-REC-008 Open candidate detail', function () {


    // Mengabaikan error dari external page
    cy.on('uncaught:exception', () => {

        return false

    })


    // Pastikan data candidate tampil
    cy.get('.oxd-table-body')
        .should('be.visible')


    // Klik action button pertama pada candidate
    cy.get('.oxd-table-body')
        .find('.oxd-table-row')
        .first()
        .find('.oxd-icon')
        .last()
        .click()


    // Validasi halaman tetap recruitment dan proses berhasil
    cy.url()
        .should('include', '/recruitment')

})
})