import { render, screen, fireEvent } from "@testing-library/react";
import FormCadastroUsuario from "./FormCadastroUsuario";

describe("FormCadastroUsuario", () => {
  test("renderiza o formulário corretamente", () => {
    render(<FormCadastroUsuario />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
  });

  test("exibe erro se senhas não coincidirem", () => {
    render(<FormCadastroUsuario />);
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/Confirmar senha/i), { target: { value: "654321" } });
    fireEvent.click(screen.getByRole("button", { name: /Criar conta/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("As senhas não coincidem.");
  });
});
