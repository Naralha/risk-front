import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage",()=>{it("apresenta credenciais sem expor a senha",()=>{render(<LoginPage onLogin={vi.fn()}/>);expect(screen.getByRole("heading",{name:/entre na plataforma/i})).toBeInTheDocument();expect(screen.getByLabelText("Senha")).toHaveAttribute("type","password")})});
