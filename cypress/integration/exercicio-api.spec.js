/// <reference types="cypress" />
import contratoUsuario from '../contratos/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {
     var tkn;
     var idUsuarioCadastrado;
     before(() => {
          cy.token('fulano@qa.com', 'teste').then((resp) => {
               tkn = resp.body.authorization;
          });
     })

     it('Deve validar contrato de usuários', () => {
          cy.listarUsuarios().then((resp) => {
               return contratoUsuario.validateAsync(resp.body);
          });
     });

     it('Deve listar usuários cadastrados', () => {
          cy.listarUsuarios().then((resp) => {
               expect(resp.status).to.equal(200);
               expect(resp.duration).to.be.lessThan(30);
               expect(resp.body.quantidade).to.be.greaterThan(0);
          });
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          var emailRandom = `beltrano${Math.floor(Math.random() * 5000)}@qa.com.br`
          cy.CadastrarUsuarios('usuario ebac', emailRandom, 'teste').then((resp) => {
               expect(resp.status).to.equal(201);
               expect(resp.duration).to.be.lessThan(30);
               expect(resp.body.message).to.contain('Cadastro realizado com sucesso');
               idUsuarioCadastrado = resp.body._id;
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.CadastrarUsuarios('usuario ebac', 'teste.com', 'teste').then((resp) => {
               expect(resp.status).to.equal(400);
               expect(resp.duration).to.be.lessThan(30);
               expect(resp.body.email).to.contain('email deve ser um email válido');
          });
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.listarProdutos().then((resp) => {
               var id = resp.body.produtos[0]._id;
               cy.editarProdutos(id, tkn).then((resp) =>{
                    expect(resp.status).to.be.equal(200);
                    expect(resp.duration).to.be.lessThan(30);
                    expect(resp.body.message).to.be.equal('Registro alterado com sucesso');
               });
          });
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.deletarUsuario(idUsuarioCadastrado).then((resp) => {
               expect(resp.body.message).to.equal('Registro excluído com sucesso');
               expect(resp.status).to.equal(200);
          });
     });


});
