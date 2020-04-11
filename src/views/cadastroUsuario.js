import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

class CadastroUsuario extends React.Component {

	state = {
		nome: '',
		email: '',
		senha: '',
		senha2: ''
	}

	constructor() {
		super();
		this.service = new UsuarioService();
	}

	validar() {
		const msgs = [];

		if(!this.state.nome) {
			msgs.push('O campo Nome é obrigatório.');
		}
		if(!this.state.email) {
			msgs.push('O campo E-mail é obrigatório.');
		}else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
			msgs.push('Informe um e-mail válido.');
		}

		if(!this.state.senha || !this.state.senha2) {
			msgs.push('Digite a mesma senha duas vezes.');
		}else if(this.state.senha !== this.state.senha2) {
			msgs.push('As senhas não coincidem.');
		}

		return msgs;
	}

	cadastrar = () => {

		const msgs = this.validar();

		if(msgs && msgs.length > 0) {
			msgs.forEach((msg, index) => {
				mensagemErro(msg);
			});
			return false;
		}

		const usuario = {
			nome: this.state.nome,
			email: this.state.email,
			senha: this.state.senha
		}

		this.service.salvar(usuario)
			.then(response => {
				mensagemSucesso('Usuário cadastrado com sucesso! Faça login para acessar o sistema.');
				this.props.history.push('/login');
			}).catch(error => {
				mensagemErro(error.response.data);
			})
	}

	cancelar = () => {
		this.props.history.push('/login');
	}

	render() {
		return (
			<Card title="Cadastro de Usuário">
				<div className="row">
					<div className="col-lg-12">
						<div className="bs-component">
							<fieldset>
								<FormGroup label="Nome:" htmlFor="inputNome">
									<input type="text" onChange={e => this.setState({ nome: e.target.value })} className="form-control" id="inputNome" name="nome" />
								</FormGroup>
								<FormGroup label="E-mail:" htmlFor="inputEmail">
									<input type="email" onChange={e => this.setState({ email: e.target.value })} className="form-control" id="inputEmail" />
								</FormGroup>
								<FormGroup label="Senha:" htmlFor="inputSenha">
									<input type="password" onChange={e => this.setState({ senha: e.target.value })} className="form-control" id="inputSenha" />
								</FormGroup>
								<FormGroup label="Repita a senha:" htmlFor="inputSenha2">
									<input type="password" onChange={e => this.setState({ senha2: e.target.value })} className="form-control" id="inputSenha2" />
								</FormGroup>
								<button type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
								<button type="button" className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
							</fieldset>
						</div>
					</div>
				</div>
			</Card>
		)
	}
}

export default withRouter(CadastroUsuario);