import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

class CadastroUsuario extends React.Component {

	state = {
		nome: '',
		email: '',
		senha: '',
		senha2: ''
	}

	cadastrar = () => {
		console.log(this.state);
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