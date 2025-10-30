import { render, screen } from "@testing-library/react";
import InputTexto from "./InputTexto";

test("renderiza input com label e valor", () => {
  render(
    <InputTexto
      label="Nome completo"
      name="nome"
      value="Viviany"
      onChange={() => {}}
      placeholder="Digite seu nome"
    />
  );

  const input = screen.getByLabelText("Nome completo");
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("Viviany");
});
