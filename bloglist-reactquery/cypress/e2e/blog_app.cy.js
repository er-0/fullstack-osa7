import './support/commands'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Troy Barnes',
      username: 'tbarnes',
      password: 'secret'
    } 
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user) 
    cy.visit('http://localhost:3000') // also hardcoded, address is redundant 
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('tbarnes')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'Login successful')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Troy Barnes logged in')
    })

    it('fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('tbarnes')
      cy.get('#password').type('invalidpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('html').should('not.contain', 'Troy Barnes logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tbarnes', password: 'secret' })
    })

    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#Blogtitle').type('Test blog')
      cy.get('#Blogauthor').type('Matti Luukkainen')
      cy.get('#Blogurl').type('testblog.com')
      cy.get('#blogformsubmit').click()

      cy.contains('Test blog, Matti Luukkainen')
      cy.get('.success')
        .should('contain', 'a new blog Test blog by Matti Luukkainen added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('multiple blogs are in order of most likes', function() {
      cy.createBlog({
        title: "First", 
        author: "Adam Abraham", 
        url: "firstblog.com"
      })
      cy.contains('First, Adam Abraham').click()
      cy.contains('like').click()
      cy.createBlog({
        title: "Second", 
        author: "Eve Abraham", 
        url: "secondblog.com"
      })
      cy.contains('Second, Eve Abraham').click()
      cy.get('.blog').eq(0).should('contain', 'First, Adam Abraham')
      cy.get('.blog').eq(1).should('contain', 'Second, Eve Abraham')
      cy.createBlog({
        title: "Third", 
        author: "Eve Abraham", 
        url: "thirdblog.com",
      })
      cy.contains('Third, Eve Abraham').click().parent().contains('like').click().wait(300).click().wait(300)

      cy.get('.blog').eq(0).should('contain', 'Third, Eve Abraham')
      cy.get('.blog').eq(1).should('contain', 'First, Adam Abraham')
      cy.get('.blog').eq(2).should('contain', 'Second, Eve Abraham')
    })

    describe('and list has a blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: "First blog", 
          author: "Adam Abraham", 
          url: "firstblog.com"
        })
      })

      it('the blog can be liked', function() {
        cy.contains('First blog, Adam Abraham').click()
        cy.contains('like').click()
      })

      it('the person who added it can delete it', function() {
        cy.contains('First blog, Adam Abraham').click()
        cy.contains('delete').click()
        cy.get('.success')
          .should('contain', 'Blog deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('another user can\'t see the delete button', function () {
        cy.contains('log out').click()

        const anotheruser = {
          name: 'Abed Nadir',
          username: 'anadir',
          password: 'humanbeing'
        } 
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, anotheruser)
        cy.login({ username: 'anadir', password: 'humanbeing' })
        cy.contains('First blog, Adam Abraham')
          .click()
          .parent()
          .should('contain', 'Troy Barnes')
          .should('not.contain', 'delete')
      })
    })    
  })
})