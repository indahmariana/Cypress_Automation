describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.url().should('include', '/auth/login')

    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
  })

  // TC-LGN-001
  it('TC-LGN-001 - Login menggunakan username dan password yang valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')

     // Screenshot
    cy.screenshot('TC-LGN-001-Berhasil')

  })

  // TC-LGN-002
  it('TC-LGN-002 - Login dengan password yang salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin321')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid credentials')

       // Screenshot
    cy.screenshot('TC-LGN-002-Berhasil')
  })

  // TC-LGN-003
  it('TC-LGN-003 - Login dengan username yang tidak terdaftar', () => {
    cy.get('input[name="username"]').type('Admin01')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid credentials')
  })

  // TC-LGN-004
  it('TC-LGN-004 - Login dengan Username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC-LGN-005
  it('TC-LGN-005 - Login dengan Password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC-LGN-006
  it('TC-LGN-006 - Login dengan Username dan Password kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
  })

  // TC-LGN-007
  it('TC-LGN-007 - Password disembunyikan', () => {
    cy.get('input[name="password"]')
      .type('admin123')
      .should('have.attr', 'type', 'password')
  })

  // TC-LGN-008
  it('TC-LGN-008 - Login menggunakan tombol Enter', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.url().should('include', '/dashboard')
  })

  // TC-LGN-009
  it('TC-LGN-009 - Klik Forgot Your Password', () => {
    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
  })

  // TC-LGN-010
  it('TC-LGN-010 - Placeholder pada field login', () => {
    cy.contains('Username').should('be.visible')
    cy.contains('Password').should('be.visible')
  })

  // TC-LGN-011
  it('TC-LGN-011 - Login dengan username yang mengandung spasi', () => {
  cy.get('input[name="username"]').type(' Admin ')
  cy.get('input[name="password"]').type('admin123')
  cy.get('button[type="submit"]').click()

  cy.get('.oxd-alert-content-text')
    .should('contain.text', 'Invalid credentials')
})

  // TC-LGN-012
  it('TC-LGN-012 - Login berhasil setelah sebelumnya gagal', () => {

  // Login pertama (gagal)
  cy.get('input[name="username"]').type('Admin')
  cy.get('input[name="password"]').type('admin321')
  cy.get('button[type="submit"]').click()

  cy.get('.oxd-alert-content-text')
    .should('contain.text', 'Invalid credentials')

  // Pastikan username masih benar
  cy.get('input[name="username"]')
    .should('have.value', 'Admin')

  // Isi ulang password yang benar
  cy.get('input[name="password"]')
    .clear()
    .type('admin123')

  cy.get('button[type="submit"]').click()

  cy.url({ timeout: 10000 }).should('include', '/dashboard')

})

})