import { Funcionario } from "./funcionario.interface";

export interface Usuario {
    idnVarUsuario?: string;
    nvarNome: string;
    idnVarUsuarioCadastro: string;
    nvarSenha: string;
    funcionario?: Funcionario;
}