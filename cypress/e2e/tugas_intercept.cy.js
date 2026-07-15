describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.url().should('include', '/auth/login')

    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
  })

  // TC-LGN-001
  it('TC-LGN-001 - Login menggunakan username dan password yang valid', () => {
    cy.intercept('GET','**/dashboard/employees/action-summary').as('ActionSummary')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    //menunggu request Summary selesai
    cy.wait('@ActionSummary').then((intercept)=>
    {expect(intercept.response.statusCode).to.eq(200)

    })

    cy.url().should('include', '/dashboard')

     // Screenshot
    cy.screenshot('TC-LGN-001-Berhasil')

  })

  // TC-LGN-002
  it('TC-LGN-002 - Login dengan password yang salah', () => {
    //pasang intercept
    cy.intercept('GET','**/core/i18n/messages').as('messages')
    
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin321')
    cy.get('button[type="submit"]').click()

// Tunggu request selesai
  cy.wait('@messages').then((interception) => {
    expect(interception.response.statusCode).to.eq(304)
  })
    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid credentials')

       // Screenshot
    cy.screenshot('TC-LGN-002-Berhasil')
  })

  // TC-LGN-003
  it('TC-LGN-003 - Login dengan username yang tidak terdaftar', () => {

    //pasang intercept
    cy.intercept('GET','**/core/i18n/messages').as('messages')

    cy.get('input[name="username"]').type('Admin01')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

// Tunggu request selesai
  cy.wait('@messages').then((interception) => {
    expect(interception.request.method).to.eq('GET')
  })

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
// intercept
    cy.intercept('GET', '**/dashboard/employees/action-summary')
    .as('actionSummary')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.wait('@actionSummary').then((interception) => {
       // Validasi URL request
    expect(interception.request.url)
      .to.include('/dashboard/employees/action-summary')
    })

    cy.url().should('include', '/dashboard')
  })

  // TC-LGN-009
 it('TC-LGN-009 - Klik Forgot Your Password', () => {

  // Intercept
  cy.intercept('GET', '**/core/i18n/messages')
    .as('messages')

  cy.contains('Forgot your password?').click()

  cy.wait('@messages').then((interception) => {

    expect(interception.request.url)
      .to.include('/core/i18n/messages')

  })

  cy.url().should('include', '/requestPasswordResetCode')

  cy.contains('Reset Password').should('be.visible')

  cy.screenshot('TC-LGN-009-Berhasil')

})

  // TC-LGN-010
  it('TC-LGN-010 - Placeholder pada field login', () => {

  cy.intercept('GET', '**/core/i18n/messages')
    .as('messages')

    cy.reload()

  cy.wait('@messages').then((interception) => {

    expect(interception.response.statusMessage)
      .to.eq('Not Modified')

  })

  cy.contains('Username').should('be.visible')
  cy.contains('Password').should('be.visible')

})

  // TC-LGN-011
  it('TC-LGN-011 - Login dengan username yang mengandung spasi', () => {

  cy.intercept('GET', '**/core/i18n/messages')
    .as('messages')

  cy.get('input[name="username"]').type(' Admin ')
  cy.get('input[name="password"]').type('admin123')
  cy.get('button[type="submit"]').click()

  cy.wait('@messages').then((interception) => {

    expect(interception.response.headers)
      .to.exist

  })

  cy.get('.oxd-alert-content-text')
    .should('contain.text', 'Invalid credentials')

  cy.screenshot('TC-LGN-011-Berhasil')

})

  // TC-LGN-012
it('TC-LGN-012 - Login berhasil setelah sebelumnya gagal', () => {

  // Intercept
  cy.intercept('GET', '**/core/i18n/messages')
    .as('messages')

  // Login pertama (gagal)
  cy.get('input[name="username"]').type('Admin')
  cy.get('input[name="password"]').type('admin321')
  cy.get('button[type="submit"]').click()

  cy.wait('@messages').then((interception) => {
    expect(interception.request.method).to.eq('GET')
  })

  cy.get('.oxd-alert-content-text')
    .should('contain.text', 'Invalid credentials')

  // Isi ulang username & password
  cy.get('input[name="username"]')
    .clear()
    .type('Admin')

  cy.get('input[name="password"]')
    .clear()
    .type('admin123')

  cy.get('button[type="submit"]').click()

  // Validasi berhasil login
  cy.url({ timeout: 10000 }).should('include', '/dashboard')

  cy.screenshot('TC-LGN-012-Berhasil')

})

  })