import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LinkIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useOutletContext } from "react-router";
import api from "../../shared/api/client";

export default function ProcessesPage() {
  const { companyId, companies } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { setRows((await api.get("/processos", { params: { busca: search, size: 50 } })).data.content); }
    catch (e) { toast.error(e.userMessage); }
    finally { setLoading(false); }
  }, [search]);
  useEffect(() => { const timer = setTimeout(load, 200); return () => clearTimeout(timer); }, [load]);
  async function remove(row) {
    if (!confirm(`Excluir ${row.nome}?`)) return;
    try { await api.delete(`/processos/${row.id}`); load(); }
    catch (e) { toast.error(e.userMessage); }
  }
  return <div className="page">
    <div className="page-title"><div><p className="eyebrow">Gestão de processos</p><h1>Processos</h1><p>Conecte objetivos, limites, responsáveis e requisitos de compliance.</p></div><button className="primary" onClick={() => setModal({})}><PlusIcon />Novo processo</button></div>
    <section className="panel table-panel"><div className="table-toolbar"><div className="search-box"><MagnifyingGlassIcon /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar processos…" /></div><span>{rows.length} registros</span></div>
      <div className="table-wrap"><table><thead><tr><th>Código</th><th>Processo</th><th>Macroprocesso</th><th>Unidade</th><th>Status</th><th>Início</th><th className="actions">Ações</th></tr></thead><tbody>
        {loading ? <tr><td colSpan="7"><div className="loading-line" /></td></tr> : rows.length ? rows.map(row => <tr key={row.id}><td>{row.codigo}</td><td><b>{row.nome}</b><small className="cell-subtitle">{row.objetivo}</small></td><td>{row.macroProcessoNome}</td><td>{row.unidadeNome || "—"}</td><td><span className={`badge ${row.status === "ATIVO" ? "success" : ""}`}>{row.status}</span></td><td>{row.inicio}</td><td className="actions"><button className="icon" onClick={() => setDetail(row)} title="Vínculos"><LinkIcon /></button><button className="icon" onClick={() => setModal(row)} title="Editar"><PencilSquareIcon /></button><button className="icon danger" onClick={() => remove(row)} title="Excluir"><TrashIcon /></button></td></tr>) : <tr><td colSpan="7"><div className="empty-inline"><strong>Nenhum processo encontrado</strong><span>Cadastre um processo para iniciar o mapa operacional.</span></div></td></tr>}
      </tbody></table></div>
    </section>
    <ProcessDialog open={modal !== null} value={modal || {}} companyId={companyId} companies={companies} onClose={() => setModal(null)} saved={() => { setModal(null); load(); }} />
    <ProcessDetailsDialog process={detail} companyId={companyId} onClose={() => setDetail(null)} />
  </div>;
}

function ProcessDialog({ open, value, companyId, companies, onClose, saved }) {
  const [form, setForm] = useState({}); const [macros, setMacros] = useState([]); const [units, setUnits] = useState([]); const [saving, setSaving] = useState(false);
  const selectedCompany = form.empresaId || companyId;
  useEffect(() => setForm({ ...value, empresaId: value.empresaId || companyId, status: value.status || "ATIVO", inicio: value.inicio || new Date().toISOString().slice(0, 10) }), [value, companyId, open]);
  useEffect(() => { if (!open) return; api.get("/macroprocessos?size=100").then(r => setMacros(r.data.content)); if (selectedCompany) api.get("/unidades/tree", { params: { empresaId: selectedCompany } }).then(r => setUnits(flatten(r.data))); }, [open, selectedCompany]);
  async function save(e) { e.preventDefault(); setSaving(true); try { value.id ? await api.put(`/processos/${value.id}`, form) : await api.post("/processos", form); toast.success("Processo salvo"); saved(); } catch (err) { toast.error(err.userMessage); } finally { setSaving(false); } }
  const input = (name, label, required = true) => <label>{label}<input value={form[name] || ""} onChange={e => setForm({ ...form, [name]: e.target.value })} required={required} /></label>;
  return <Dialog open={open} onClose={onClose} className="dialog"><div className="dialog-backdrop" /><div className="dialog-shell"><DialogPanel className="dialog-panel large"><div className="dialog-title"><div><p className="eyebrow">Processo</p><DialogTitle>{value.id ? "Editar processo" : "Novo processo"}</DialogTitle></div><button className="icon" onClick={onClose}><XMarkIcon /></button></div><form onSubmit={save}><div className="form-grid">{input("codigo", "Código")}{input("nome", "Nome")}<label className="full">Objetivo<textarea value={form.objetivo || ""} onChange={e => setForm({ ...form, objetivo: e.target.value })} required /></label><label>Empresa<select value={form.empresaId || ""} onChange={e => setForm({ ...form, empresaId: e.target.value, unidadeId: "" })} required>{companies.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></label><label>Macroprocesso<select value={form.macroProcessoId || ""} onChange={e => setForm({ ...form, macroProcessoId: e.target.value })} required><option value="">Selecione</option>{macros.filter(m => m.empresaId === selectedCompany).map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}</select></label><label>Unidade responsável<select value={form.unidadeId || ""} onChange={e => setForm({ ...form, unidadeId: e.target.value || null })}><option value="">Não definida</option>{units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}</select></label><label>Status<select value={form.status || "ATIVO"} onChange={e => setForm({ ...form, status: e.target.value })}><option>ATIVO</option><option>EM_REVISAO</option><option>INATIVO</option></select></label><label>Data inicial<input type="date" value={form.inicio || ""} onChange={e => setForm({ ...form, inicio: e.target.value })} required /></label><label>Data final<input type="date" value={form.fim || ""} onChange={e => setForm({ ...form, fim: e.target.value || null })} /></label>{input("entradas", "Entradas", false)}{input("saidas", "Saídas", false)}</div><div className="dialog-actions"><button type="button" onClick={onClose}>Cancelar</button><button className="primary" disabled={saving}>{saving ? "Salvando…" : "Salvar processo"}</button></div></form></DialogPanel></div></Dialog>;
}

const linkTypes = {
  cliente: ["Cliente externo", "/clientes"], fornecedor: ["Fornecedor externo", "/fornecedores"],
  "compliance-interno": ["Compliance interno", "/compliance/internos"], "compliance-externo": ["Compliance externo", "/compliance/externos"],
  "cliente-interno": ["Cliente interno", "/unidades/tree"], "fornecedor-interno": ["Fornecedor interno", "/unidades/tree"],
};

function ProcessDetailsDialog({ process, companyId, onClose }) {
  const [data, setData] = useState(null); const [type, setType] = useState("cliente"); const [options, setOptions] = useState([]); const [origin, setOrigin] = useState("");
  const load = useCallback(() => { if (process) api.get(`/processos/${process.id}/detalhes`).then(r => setData(r.data)).catch(e => toast.error(e.userMessage)); }, [process]);
  useEffect(load, [load]);
  useEffect(() => { if (!process) return; const endpoint = linkTypes[type][1]; if (endpoint === "/unidades/tree") api.get(endpoint, { params: { empresaId: companyId } }).then(r => setOptions(flatten(r.data).map(u => ({ id: u.id, nome: u.label })))); else api.get(`${endpoint}?size=100`).then(r => setOptions(r.data.content.filter(item => item.empresaId === companyId))); setOrigin(""); }, [type, process, companyId]);
  async function link(e) { e.preventDefault(); try { await api.post(`/processos/vinculos/${type}`, { origemId: origin, processoId: process.id }); toast.success("Vínculo criado"); load(); setOrigin(""); } catch (err) { toast.error(err.userMessage); } }
  async function unlink(row) { const paths = { CLIENTE_EXTERNO: "cliente", FORNECEDOR_EXTERNO: "fornecedor", COMPLIANCE_INTERNO: "compliance-interno", COMPLIANCE_EXTERNO: "compliance-externo", CLIENTE_INTERNO: "cliente-interno", FORNECEDOR_INTERNO: "fornecedor-interno" }; try { await api.delete(`/processos/vinculos/${paths[row.tipo]}/${row.id}`); toast.success("Vínculo removido"); load(); } catch (err) { toast.error(err.userMessage); } }
  return <Dialog open={!!process} onClose={onClose} className="dialog"><div className="dialog-backdrop" /><div className="dialog-shell"><DialogPanel className="dialog-panel large"><div className="dialog-title"><div><p className="eyebrow">Contexto do processo</p><DialogTitle>{process?.nome}</DialogTitle></div><button className="icon" onClick={onClose}><XMarkIcon /></button></div><div className="process-details">{data ? <><div className="process-summary"><span className="badge success">{data.processo.status}</span><p>{data.processo.objetivo}</p><small>{data.processo.macroProcessoNome} · {data.processo.unidadeNome || "Sem unidade responsável"}</small></div><div className="relation-grid"><Relation title="Clientes" rows={data.clientes} remove={unlink} /><Relation title="Fornecedores" rows={data.fornecedores} remove={unlink} /><Relation title="Compliance" rows={data.compliance} remove={unlink} /><Relation title="Unidades internas" rows={data.unidades} remove={unlink} /></div><form className="link-form" onSubmit={link}><label>Tipo de vínculo<select value={type} onChange={e => setType(e.target.value)}>{Object.entries(linkTypes).map(([key, [label]]) => <option value={key} key={key}>{label}</option>)}</select></label><label>Registro<select value={origin} onChange={e => setOrigin(e.target.value)} required><option value="">Selecione</option>{options.map(item => <option value={item.id} key={item.id}>{item.nome}</option>)}</select></label><button className="primary"><LinkIcon />Relacionar</button></form></> : <div className="loading-line" />}</div></DialogPanel></div></Dialog>;
}

function Relation({ title, rows, remove }) { return <section><h3>{title}<span>{rows.length}</span></h3>{rows.length ? <ul>{rows.map(row => <li key={row.id}><span>{row.nome}<small>{row.tipo.replaceAll("_", " ")}</small></span><button className="icon danger" onClick={() => remove(row)} title="Remover"><XMarkIcon /></button></li>)}</ul> : <p>Nenhum vínculo</p>}</section>; }
function flatten(nodes, depth = 0) { return nodes.flatMap(n => [{ id: n.id, label: `${"— ".repeat(depth)}${n.nome}` }, ...flatten(n.children || [], depth + 1)]); }
