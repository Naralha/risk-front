import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { Bars3Icon, BuildingOffice2Icon, ChartBarSquareIcon, ChevronDownIcon, ClipboardDocumentCheckIcon, Cog6ToothIcon, MagnifyingGlassIcon, ShieldCheckIcon, Squares2X2Icon, UserGroupIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import api from "../shared/api/client";

const navigation=[
  ["Dashboard","/dashboard",ChartBarSquareIcon],["Organograma","/organograma",Squares2X2Icon],["Empresas","/empresas",BuildingOffice2Icon],["Funcionários","/funcionarios",UsersIcon],["Macroprocessos","/macroprocessos",ClipboardDocumentCheckIcon],["Processos","/processos",ClipboardDocumentCheckIcon],["Compliance","/compliance",ShieldCheckIcon],["Clientes","/clientes",UserGroupIcon],["Fornecedores","/fornecedores",BuildingOffice2Icon],["Riscos","/riscos",ShieldCheckIcon],["Administração","/usuarios",Cog6ToothIcon],
];

export default function AppLayout({user,onLogout}){
  const [open,setOpen]=useState(false);const [companies,setCompanies]=useState([]);const [companyId,setCompanyId]=useState(localStorage.getItem("risk.company")||"");const location=useLocation();
  useEffect(()=>{api.get("/empresas?size=100").then(r=>{setCompanies(r.data.content);if(!companyId&&r.data.content[0])setCompanyId(r.data.content[0].id)}).catch(()=>{})},[companyId]);
  useEffect(()=>{setOpen(false)},[location.pathname]); useEffect(()=>{if(companyId)localStorage.setItem("risk.company",companyId)},[companyId]);
  return <div className="app-shell"><aside className={`sidebar ${open?"open":""}`}><div className="logo"><span><ShieldCheckIcon/></span><div><b>Risk</b><small>GRC Platform</small></div><button className="icon mobile" onClick={()=>setOpen(false)}><XMarkIcon/></button></div><nav>{navigation.map(([label,path,Icon])=><NavLink key={path} to={path} className={({isActive})=>isActive?"active":""}><Icon/><span>{label}</span>{label==="Riscos"&&<em>Em breve</em>}</NavLink>)}</nav><div className="sidebar-user"><div className="avatar">{user.nome.slice(0,2).toUpperCase()}</div><div><b>{user.nome}</b><small>Administrador</small></div><button onClick={onLogout}>Sair</button></div></aside><div className="workspace"><header className="topbar"><button className="icon mobile" onClick={()=>setOpen(true)}><Bars3Icon/></button><div className="global-search"><MagnifyingGlassIcon/><input placeholder="Buscar na plataforma…" aria-label="Busca global"/></div><label className="company-picker"><BuildingOffice2Icon/><select value={companyId} onChange={e=>setCompanyId(e.target.value)}>{companies.map(c=><option value={c.id} key={c.id}>{c.nome}</option>)}</select><ChevronDownIcon/></label><div className="top-avatar">{user.nome[0].toUpperCase()}</div></header><Outlet context={{companyId,companies}}/></div>{open&&<button className="backdrop" onClick={()=>setOpen(false)} aria-label="Fechar menu"/>}</div>
}
