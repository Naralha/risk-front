import { useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import api from "../../shared/api/client";

export default function LoginPage({ onLogin }) {
  const [login,setLogin]=useState("admin"); const [senha,setSenha]=useState("password"); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e){e.preventDefault();setLoading(true);setError("");const token=btoa(`${login}:${senha}`);sessionStorage.setItem("risk.auth",token);try{await api.get("/dashboard");onLogin({nome:login,token});}catch{sessionStorage.removeItem("risk.auth");setError("Usuário ou senha inválidos.");}finally{setLoading(false)}}
  return <main className="login-shell"><section className="login-brand"><div className="brand-mark"><ShieldCheckIcon/></div><p className="eyebrow">Governance · Risk · Compliance</p><h1>Decisões melhores começam com uma organização visível.</h1><p>Conecte pessoas, processos, relacionamentos e obrigações em uma única plataforma.</p></section><section className="login-panel"><form className="auth-card" onSubmit={submit}><div className="mobile-logo"><ShieldCheckIcon/> Risk</div><p className="eyebrow">Acesso seguro</p><h2>Entre na plataforma</h2><p className="muted">Use suas credenciais corporativas.</p><label>Usuário<input value={login} onChange={e=>setLogin(e.target.value)} autoComplete="username" required /></label><label>Senha<input type="password" value={senha} onChange={e=>setSenha(e.target.value)} autoComplete="current-password" required /></label>{error&&<div className="form-error" role="alert">{error}</div>}<button className="primary wide" disabled={loading}>{loading?"Validando…":"Entrar"}</button><small>Ambiente local: admin / password</small></form></section></main>
}
