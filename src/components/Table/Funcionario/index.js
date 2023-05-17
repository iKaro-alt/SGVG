import React, { useEffect } from 'react';
import axiosInstance from 'services/axios.js';
import { useAtom, atom } from 'jotai';
import { colapsedFuncionario } from 'store.js';
import { funcionarioId } from 'store.js';
import { funcionario } from 'store.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableFuncionario(props) {
  const getFuncionario = () => {
    axiosInstance
      .post('/funcionario/filter')
      .then((res) => setFuncionario(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFuncionario();
  }, []);

  const [funcionarios, setFuncionario] = useAtom(funcionario);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useAtom(funcionarioId);
  const [foldFuncioario, setFoldFuncioario] = useAtom(colapsedFuncionario);

  // Handler para abrir o modal
  const handleSetFoldFuncioario = (_id) => {
    setFoldFuncioario(!foldFuncioario);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Senha</TableCell>
              <TableCell align="right">Idade</TableCell>
              <TableCell align="right">Data Nasc</TableCell>
              <TableCell align="right">Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map((dados) => (
              <TableRow
                onClick={() => {
                  handleSetFoldFuncioario(dados.id);
          	  setSelectedFuncionarioId(dados.id);
                }}
                key={dados.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    color: 'gray',
                    backgroundColor: 'lightblue',
                  },
                }}
              >
                <TableCell align="right">{dados.id}</TableCell>
                <TableCell align="right">{dados.nome}</TableCell>
                <TableCell align="right">{dados.cpf}</TableCell>
                <TableCell align="right" sx={{ maxWidth: 50, overflow: 'hidden' }}>
                  {dados.senha}
                </TableCell>
                <TableCell align="right">{dados.idade}</TableCell>
                <TableCell align="right">{dados.data_nasc}</TableCell>
                <TableCell align="right">{dados.cargo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
