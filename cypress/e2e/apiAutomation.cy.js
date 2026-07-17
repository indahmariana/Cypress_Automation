const baseUrl = 'https://api.escuelajs.co/api/v1/categories'

describe('API Automation - Categories', () => {

    let categoryId

    // TC001
    it('TC001 - Get All Categories', () => {

        cy.request('GET', baseUrl).then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body[0]).to.have.property('id')

        })

    })

    // TC002
    it('TC002 - Create Category', () => {

       cy.fixture('categoryData').then((data) => {

    const newCategory = {
        ...data.newCategory,
        name: `${data.newCategory.name}-${Date.now()}`
    }

    cy.request({
        method: 'POST',
        url: baseUrl,
        body: newCategory
    }).then((response) => {

        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq(newCategory.name)

    })

})

    })

    // TC003
it('TC003 - Get Single Category', () => {

    cy.fixture('categoryData').then((data) => {

        const newCategory = {
            ...data.newCategory,
            name: `${data.newCategory.name}-${Date.now()}`
        }

        // Create Category
        cy.request({
            method: 'POST',
            url: baseUrl,
            body: newCategory
        }).then((createResponse) => {

            expect(createResponse.status).to.eq(201)

            const categoryId = createResponse.body.id

            // Get Category
            cy.request({
                method: 'GET',
                url: `${baseUrl}/${categoryId}`
            }).then((response) => {

                expect(response.status).to.eq(200)
                expect(response.body.id).to.eq(categoryId)
                expect(response.body.name).to.eq(newCategory.name)

            })

        })

    })

})


// TC004
it('TC004 - Update Category (PUT)', () => {

    cy.fixture('categoryData').then((data) => {

        const newCategory = {
            ...data.newCategory,
            name: `${data.newCategory.name}-${Date.now()}`
        }

        cy.request({
            method: 'POST',
            url: baseUrl,
            body: newCategory
        }).then((createResponse) => {

            expect(createResponse.status).to.eq(201)

            const categoryId = createResponse.body.id

            const updateCategory = {
                ...data.updateCategory,
                name: `${data.updateCategory.name}-${Date.now()}`
            }

            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${categoryId}`,
                body: updateCategory
            }).then((response) => {

                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(updateCategory.name)

            })

        })

    })

})


// TC005
it('TC005 - Delete Category', () => {

    cy.fixture('categoryData').then((data) => {

        const newCategory = {
            ...data.newCategory,
            name: `${data.newCategory.name}-${Date.now()}`
        }

        // Create Category
        cy.request({
            method: 'POST',
            url: baseUrl,
            body: newCategory
        }).then((createResponse) => {

            expect(createResponse.status).to.eq(201)

            const categoryId = createResponse.body.id

            // Delete Category
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/${categoryId}`
            }).then((response) => {

                expect(response.status).to.eq(200)

            })

        })

    })

})

// TC006
it('TC006 - Get Category dengan ID yang tidak valid', () => {

    cy.request({
        method: 'GET',
        url: `${baseUrl}/99999999`,
        failOnStatusCode: false
    }).then((response) => {

        expect(response.status).to.eq(400)
        expect(response.body.message).to.exist

    })

})

// TC007
it('TC007 - Create Category tanpa Name', () => {

    cy.request({
        method: 'POST',
        url: baseUrl,
        failOnStatusCode: false,
        body: {
            image: 'https://placehold.co/600x400/png'
        }

    }).then((response) => {

        console.log(response.body)
        cy.log(JSON.stringify(response.body))

    })

})

// TC008
it('TC008 - Create Category tanpa Image', () => {

    cy.request({
        method: 'POST',
        url: baseUrl,
        failOnStatusCode: false,
        body: {
            name: `QA-${Date.now()}`
        }

    }).then((response) => {

        expect(response.status).to.eq(400)
        expect(response.body.message).to.exist

    })

})

// TC009
it('TC009 - Update Category dengan ID yang tidak valid', () => {

    cy.fixture('categoryData').then((data) => {

        const updateCategory = {
            ...data.updateCategory,
            name: `${data.updateCategory.name}-${Date.now()}`
        }

        cy.request({
            method: 'PUT',
            url: `${baseUrl}/99999999`,
            failOnStatusCode: false,
            body: updateCategory

        }).then((response) => {

            expect(response.status).to.eq(400)
            expect(response.body.message).to.exist

        })

    })

})

// TC010
it('TC010 - Delete Category dengan ID yang tidak valid', () => {

    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/99999999`,
        failOnStatusCode: false

    }).then((response) => {

        expect(response.status).to.eq(400)
        expect(response.body.message).to.exist

    })

})

// TC011
it('TC011 - Get Products by Category', () => {

    cy.fixture('categoryData').then((data) => {

        const newCategory = {
            ...data.newCategory,
            name: `${data.newCategory.name}-${Date.now()}`
        }

        // Create Category
        cy.request({
            method: 'POST',
            url: baseUrl,
            body: newCategory

        }).then((createResponse) => {

            expect(createResponse.status).to.eq(201)

            const categoryId = createResponse.body.id

            // Get Products by Category
            cy.request({
                method: 'GET',
                url: `${baseUrl}/${categoryId}/products`

            }).then((response) => {

                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')

            })

        })

    })

})

// TC012
it('TC012 - Verify Categories Response', () => {

    cy.request({
        method: 'GET',
        url: baseUrl

    }).then((response) => {

        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('name')
        expect(response.body[0]).to.have.property('image')

    })

})

})