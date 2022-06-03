// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('token', (email, senha) => { 
    cy.request({
        url: 'login',
        method: 'POST',
        body: {
            email: email,
            password: senha
        }
    })
 })

Cypress.Commands.add('listarUsuarios', () => {
    cy.request({
        url: 'usuarios',
        method: 'GET',    
   })
})

Cypress.Commands.add('CadastrarUsuarios', (nome, email, senha) => {
    cy.request({
        url: 'usuarios',
        method: 'POST',
        failOnStatusCode: false,
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: "true"
            }
    })
})

Cypress.Commands.add('listarProdutos', () =>{
    cy.request({
        url: 'produtos',
        method: 'GET',
   })
})

Cypress.Commands.add('editarProdutos', (id, token) => {
    cy.request({
        url: `produtos/${id}`,
        method: 'PUT',
        headers: { authorization: token },
        failOnStatusCode: false,
        body: {
             "nome": "Curso EBAC",
             "preco": 850,
             "descricao": "Engenheiro de qualidade de software",
             "quantidade": 381
        }
   })
})

Cypress.Commands.add('deletarUsuario', (id) => {
    cy.request({
        url: `usuarios/${id}`,
        method: 'DELETE',
        failOnStatusCode: false
    })
})
