import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "../modules/auth/LoginPage";
import AppLayout from "./AppLayout";
import DashboardPage from "../modules/dashboard/DashboardPage";
import OrganizationPage from "../modules/organization/OrganizationPage";
import CatalogPage from "../modules/catalog/CatalogPage";
import ProcessesPage from "../modules/processes/ProcessesPage";

const catalogs = {
  empresas:{title:"Empresas",subtitle:"Organizações atendidas pela plataforma",endpoint:"/empresas",kind:"company"},
  funcionarios:{title:"Funcionários",subtitle:"Pessoas e perfis funcionais",endpoint:"/funcionarios",kind:"employee"},
  macroprocessos:{title:"Macroprocessos",subtitle:"Cadeia de valor da organização",endpoint:"/macroprocessos",kind:"catalog"},
  clientes:{title:"Clientes",subtitle:"Clientes externos relacionados aos processos",endpoint:"/clientes",kind:"catalog"},
  fornecedores:{title:"Fornecedores",subtitle:"Fornecedores externos e dependências",endpoint:"/fornecedores",kind:"catalog"},
  compliance:{title:"Compliance",subtitle:"Requisitos internos e externos",endpoint:"/compliance/internos",secondaryEndpoint:"/compliance/externos",kind:"catalog"},
  usuarios:{title:"Administração de usuários",subtitle:"Acesso, empresa e perfil",endpoint:"/usuarios",kind:"user"},
};

export default function App(){
  const [user,setUser]=useState(()=>sessionStorage.getItem("risk.auth")?{nome:"admin"}:null);
  useEffect(()=>{const unauthorized=()=>{sessionStorage.removeItem("risk.auth");setUser(null)};window.addEventListener("risk:unauthorized",unauthorized);return()=>window.removeEventListener("risk:unauthorized",unauthorized)},[]);
  if(!user)return <LoginPage onLogin={setUser}/>;
  return <Routes><Route element={<AppLayout user={user} onLogout={()=>{sessionStorage.removeItem("risk.auth");setUser(null)}}/>}>
    <Route index element={<Navigate to="/dashboard" replace/>}/><Route path="dashboard" element={<DashboardPage/>}/><Route path="organograma" element={<OrganizationPage/>}/><Route path="processos" element={<ProcessesPage/>}/>
    {Object.entries(catalogs).map(([path,config])=><Route key={path} path={path} element={<CatalogPage {...config}/>}/>)}
    <Route path="riscos" element={<RoadmapPage/>}/><Route path="*" element={<Navigate to="/dashboard" replace/>}/>
  </Route></Routes>;
}

function RoadmapPage(){return <div className="page"><div className="page-title"><div><p className="eyebrow">Evolução GRC</p><h1>Riscos e controles</h1><p>O modelo atual já conecta organização, processos e compliance. O módulo de riscos será construído sobre essas relações.</p></div></div><div className="empty-state"><span>◎</span><h3>Preparado para a próxima fase</h3><p>Cadastros antecipados foram evitados até que as regras de avaliação de risco sejam definidas.</p></div></div>}
