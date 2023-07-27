import { Funcionario } from "./funcionario.interface";
import { Role } from "./role.interface";

export interface Usuario {
    idnVarUsuario?: string;
    nvarNome: string;
    idnVarUsuarioCadastro: string;
    nvarSenha: string;
    funcionario?: Funcionario;
    role?: Role;
}