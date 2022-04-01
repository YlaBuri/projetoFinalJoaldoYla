import { CasoTeste } from './../casoTeste';
export class TarefaDTO{
  id: number
  titulo: string;
  descricao: string;
  status: number;
  dataEntrega= new Date();
  testes:  Array<CasoTeste>;

  constructor() {
    this.id = 0,
    this.titulo = '',
    this.descricao = '',
    this.status = 0,
    this.dataEntrega = new Date(),
    this.testes = new Array<CasoTeste>()

  }
}
