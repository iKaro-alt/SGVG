import signIn from 'services/funcionario';

import {Link} from 'react-router-dom';
import React, { useState } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  function handleSetNome(e) {
    e.preventDefault();
    setNome(e.target.value);
  }

  function handleSetSenha(e) {
    e.preventDefault();
    setSenha(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      signIn(nome, senha);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {' '}
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-white text-green">
        {/*fundo branco e cor do texto verde escuro*/}
        <form onSubmit={handleSubmit} className="flex w-[30rem] flex-col space-y-10">
          {' '}
          {/*seção de login*/}
          <img className="mx-auto h-40 w-auto" src="login.png" /> {/*logo do aplicativo escrito login e alinhado*/}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green">
            {/*caixa de texto, campo de login/ mais efeito mudando de cor quando clicar no campo*/}
            <input
              type="text"
              placeholder="Nome de Usuário"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={handleSetNome}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green">
            {/*caixa de texto, campo de senha/ mais efeito mudando de cor quando clica no campo*/}
            <input
              type="password"
              placeholder="Senha"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={handleSetSenha}
            />
          </div>
          <Link 
	  className="transform rounded-sm bg-green py-2 font-bold duration-300 hover:bg-green text-white text-center" 
	  type="submit"
	  to="/cadastro"
	  >
            Conecte-se
          </Link>{' '}
          {/*botão de login*/}
          <a
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-green"
            onSubmit={handleSubmit}
          >
            ESQUECEU A SENHA?
          </a>
          {/*link para cadastro não definido ainda*/}
        </form>
      </main>
    </div>
  );
}
