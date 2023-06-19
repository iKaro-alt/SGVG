import React, { useState, Component, useEffect } from 'react';
import axiosInstance from 'services/axios';
import { useAtom } from 'jotai';
import { ocupacaoDataFiltered, colapsedOcupacaoAlterar, ocupacaoId } from 'store.js';
import Input from 'components/Input';
import CustomDatePicker from 'components/DatePicker';
import Button from 'components/Button';

export default function ModalOcupacao(props) {
  const [foldOcupacaoAlterar, setFoldOcupacaoAlterar] = useAtom(colapsedOcupacaoAlterar);
  const handleSetFoldOcupacaoAlterar = () => setFoldOcupacaoAlterar(!foldOcupacaoAlterar);

  const [cpf, setCpf] = useState(null);
  const [vaga, setVaga] = useState(null);
  const [placa, setPlaca] = useState(null);
  const [dataLocacao, setDataLocacao] = useState(null);
  const [dataLocacaoFim, setDataLocacaoFim] = useState(null);

  const [selectedOcupacaoDataFiltered, setSelectedOcupacaoDataFiltered] = useAtom(ocupacaoDataFiltered);
  const [selectedOcupacaoId, setSelectedOcupacaoId] = useAtom(ocupacaoId);

  const [loading, setLoading] = useState(true);

  const [ocupacaos, setOcupacaos] = useState([]);

  const handleSetFoldOcupacao = () => {
    setFoldOcupacaoAlterar(!foldOcupacaoAlterar);
  };

  const handleSubmit = () => {
    axiosInstance
      .post('/ocupacao/update', {
        id: selectedOcupacaoId,
        cpf: cpf,
        vaga: vaga,
        placa: placa,
        dataLocacao: dataLocacao,
        dataLocacaoFim: dataLocacaoFim,
      })
      .catch((err) => console.log(err));
    setFoldOcupacaoAlterar(!foldOcupacaoAlterar);
    setSelectedOcupacaoDataFiltered('');
  };

  useEffect(() => {
    axiosInstance
      .post('/ocupacao/filter', {
        id: selectedOcupacaoId,
      })
      .then((res) => {
        setSelectedOcupacaoDataFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [foldOcupacaoAlterar]);
  return (
    <div className={' inset-0' + foldOcupacaoAlterar ? 'bg-opacity-40' : ''}>
      {!foldOcupacaoAlterar ? (
        <div></div>
      ) : (
        <div className=" absolute w-screen h-screen bg-black/[0.85] z-20 inset-0 flex items-center justify-center transition duration-100 ease-in">
          <button className="absolute w-screen h-screen z-0 bg-black/[0.85]" onClick={handleSetFoldOcupacao} />
          <div className="flex flex-col items-center justify-center w-1/2 bg-white dark:bg-dark_grey rounded-xl z-20 pt-5 pb-5">
            <h1 className="text-2xl font-bold ml-5 mt-1 self-start text-black dark:text-dark_white">
              Editar Agendamento
            </h1>
            {!loading && (
              <div className="flex flex-col space-y-5 h-90 mt-8 ">
                <div className="flex flex-row space-x-5">
                  <Input
                    placeholder="Cliente"
                    value={selectedOcupacaoDataFiltered[0].cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  <Input
                    placeholder="Vaga"
                    value={selectedOcupacaoDataFiltered[0].vaga}
                    onChange={(e) => setVaga(e.target.value)}
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <Input
                    placeholder="Veículo"
                    value={selectedOcupacaoDataFiltered[0].placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                </div>

                <div className="flex justify-between space-x-5">
                  <div className="w-64">
                    <CustomDatePicker
                      label={selectedOcupacaoDataFiltered[0].dataLocacao}
                      onChange={(e) => {
                        setDataLocacao(e);
                      }}
                    />
                  </div>
                  <div className="w-64">
                    <CustomDatePicker
                      label={selectedOcupacaoDataFiltered[0].dataLocacaoFim}
                      onChange={(e) => {
                        setDataLocacaoFim(e);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-5 self-end">
                  <Button value="Deletar" outlined />
                  <Button
                    value="Editar Agendamento"
                    onClick={() => {
                      handleSubmit();
                    }}
                    onChange={(e) => {
                      setDataLocacao(e);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
