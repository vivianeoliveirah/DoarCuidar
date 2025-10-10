import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CampoSenha from "./CampoSenha";

test("alterna entre mostrar e ocultar senha", async () => {
  const user = userEvent.setup();
  render(
    <CampoSenha
      id="senha"
      value="segredo123"
      onChange={() => {}}
      placeholder="Senha"
    />
  );

  const input = screen.getByLabelText("Senha");
  const toggleButton = screen.getByRole("button", { name: /mostrar senha/i });

  // Inicialmente deve estar tipo password
  expect(input).toHaveAttribute("type", "password");

  // Clica para mostrar
  await user.click(toggleButton);
  expect(input).toHaveAttribute("type", "text");

  // Clica novamente para ocultar
  await user.click(toggleButton);
  expect(input).toHaveAttribute("type", "password");
});
