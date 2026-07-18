class DirectoryPage {

    // LOCATOR
    // Menyimpan selector elemen pada halaman Directory

    // Textbox Employee Name
    employeeName = 'input[placeholder="Type for hints..."]'

    // Selector dropdown (Job Title dan Location menggunakan selector yang sama)
    dropdown = '.oxd-select-text'

    // Selector pilihan yang muncul setelah dropdown diklik
    dropdownOption = '.oxd-select-option'

    // Tombol Search
    searchButton = 'button[type="submit"]'

    // Tombol Reset
    resetButton = 'button[type="reset"]'

    // Card employee yang muncul setelah pencarian
    employeeCard = '.orangehrm-directory-card'

   
    // ACTION
    // Berisi fungsi-fungsi yang akan dipanggil pada file test


    // Mengisi Employee Name
    inputEmployeeName(name) {

        // Menghapus isi textbox terlebih dahulu
        cy.get(this.employeeName).clear()

        // Mengisi textbox sesuai data yang dikirim
        cy.get(this.employeeName).type(name)

    }

    // Memilih Job Title
    selectJobTitle(jobTitle) {

        // Klik dropdown pertama (Job Title)
        cy.get(this.dropdown).eq(0).click()

        // Pilih Job Title sesuai data
        cy.contains(this.dropdownOption, jobTitle).click()

    }

    // Memilih Location
    selectLocation(location) {

        // Klik dropdown kedua (Location)
        cy.get(this.dropdown).eq(1).click()

        // Pilih Location sesuai data
        cy.contains(this.dropdownOption, location).click()

    }

    // Klik tombol Search
    clickSearch() {

        cy.get(this.searchButton).click()

    }

    // Klik tombol Reset
    clickReset() {

        cy.get(this.resetButton).click()

    }

    // Memastikan halaman Directory berhasil ditampilkan
    verifyDirectoryPage() {

        cy.contains('Directory').should('be.visible')

    }

    // Memastikan card employee muncul
    verifyEmployeeCard() {

        cy.get(this.employeeCard).should('exist')

    }

    // Memastikan terdapat tulisan "Records Found"
    verifyRecordFound() {

        cy.contains('Records Found').should('be.visible')

    }

}

// Export object agar dapat dipanggil di file test
export default new DirectoryPage()