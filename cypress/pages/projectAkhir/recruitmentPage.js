class RecruitmentPage {

    // ==========================================================
    // LOCATOR
    // Menyimpan semua selector pada halaman Recruitment
    // ==========================================================

    // Dropdown
    dropdown = '.oxd-select-text'

    // Pilihan dropdown
    dropdownOption = '.oxd-select-option'

    // Candidate Name
    candidateName = 'input[placeholder="Type for hints..."]'

    // Keywords
    keywords = 'input[placeholder="Enter comma separated words..."]'

    // Tombol Search
    searchButton = 'button[type="submit"]'

    // Tombol Reset
    resetButton = 'button[type="reset"]'

    // Tombol Add
    addButton = 'button:contains("Add")'

    // Icon View
    viewButton = '.bi-eye-fill'

    // Icon Delete
    deleteButton = '.bi-trash'

    // Popup Delete
    deletePopup = '.oxd-dialog-container-default'


    // ==========================================================
    // ACTION
    // Berisi fungsi yang dipanggil pada file test
    // ==========================================================


    // Input Candidate Name
    inputCandidateName(name) {

        // Menghapus isi input sebelumnya
        cy.get(this.candidateName)
            .clear()

        // Mengisi nama candidate
        cy.get(this.candidateName)
            .type(name)

    }


    // Input Keywords
    inputKeywords(keyword) {

        // Menghapus keyword sebelumnya
        cy.get(this.keywords)
            .clear()

        // Mengisi keyword
        cy.get(this.keywords)
            .type(keyword)

    }


    // Pilih Job Title
    selectJobTitle(jobTitle) {

        // Klik dropdown Job Title
        cy.get(this.dropdown)
            .eq(0)
            .click()


        // Pilih Job Title
        cy.contains(this.dropdownOption, jobTitle)
            .click()

    }


    // Pilih Vacancy
    selectVacancy(vacancy) {

        // Klik dropdown Vacancy
        cy.get(this.dropdown)
            .eq(1)
            .click()


        // Pilih Vacancy
        cy.contains(this.dropdownOption, vacancy)
            .click()

    }


    // Pilih Hiring Manager
    selectHiringManager(manager) {

        // Klik dropdown Hiring Manager
        cy.get(this.dropdown)
            .eq(2)
            .click()


        // Pilih Hiring Manager
        cy.contains(this.dropdownOption, manager)
            .click()

    }


    // Pilih Status
    selectStatus(status) {

        // Klik dropdown Status
        cy.get(this.dropdown)
            .eq(3)
            .click()


        // Pilih Status
        cy.contains(this.dropdownOption, status)
            .click()

    }


    // Pilih Method Of Application
    selectMethod(method) {

        // Klik dropdown Method
        cy.get(this.dropdown)
            .eq(4)
            .click()


        // Pilih Method
        cy.contains(this.dropdownOption, method)
            .click()

    }


    // Klik Search
    clickSearch() {

        // Menjalankan pencarian
        cy.get(this.searchButton)
            .click()

    }


    // Klik Reset
    clickReset() {

        // Reset filter
        cy.get(this.resetButton)
            .click()

    }


    // Klik Add
    clickAdd() {

        // Membuka halaman tambah candidate
        cy.contains('button', 'Add')
            .click()

    }


    // Klik View Candidate
    clickView() {

        // Membuka detail candidate pertama
        cy.get(this.viewButton)
            .first()
            .click()

    }


    // Klik Delete
    clickDelete() {

        // Klik delete candidate pertama
        cy.get(this.deleteButton)
            .first()
            .click()

    }


    // Klik Cancel Delete
    clickCancelDelete() {

        // Membatalkan delete
        cy.contains('button', 'No, Cancel')
            .click()

    }


    // Klik Confirm Delete
    clickConfirmDelete() {

        // Konfirmasi delete
        cy.contains('button', 'Yes, Delete')
            .click()

    }



    // ==========================================================
    // TC-005 sampai TC-008 ACTION
    // ==========================================================


    // TC-005 Search Candidate
    searchCandidate(name) {

        // Input nama candidate
        this.inputCandidateName(name)


        // Klik Search
        this.clickSearch()

    }


    // TC-006 Filter Candidate berdasarkan Job Title
    filterJobTitle(jobTitle) {

        // Pilih Job Title
        this.selectJobTitle(jobTitle)


        // Klik Search
        this.clickSearch()

    }


    // TC-007 Reset Filter Candidate
    resetFilter() {

        // Klik Reset
        this.clickReset()

    }


    // TC-008 Open Candidate Detail
    openCandidate() {

        // Klik View Candidate
        this.clickView()

    }



    // ==========================================================
    // VERIFICATION
    // Assertion agar test lebih rapi
    // ==========================================================


    // Memastikan halaman Recruitment tampil
    verifyRecruitmentPage() {

        cy.contains('Recruitment')
            .should('be.visible')

    }


    // Memastikan data kandidat tampil
    verifyRecordFound() {

        cy.contains('Records Found')
            .should('be.visible')

    }


    // Memastikan popup delete muncul
    verifyDeletePopup() {

        cy.get(this.deletePopup)
            .should('be.visible')

    }


    // Memastikan popup delete hilang
    verifyPopupClosed() {

        cy.get(this.deletePopup)
            .should('not.exist')

    }

}


export default new RecruitmentPage()