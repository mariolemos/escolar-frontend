import { paymentSchema } from "@/schemas/moedaSchema";
import { formatToCurrency } from "@/utils/formatMoeda";
import React, { useState } from "react";

export default function CurrencyInput() {
  const [displayValue, setDisplayValue] = useState("R$ 0,00");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Aplica a máscara de forma reativa enquanto o usuário digita
    const masked = formatToCurrency(e.target.value);
    setDisplayValue(masked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Passa a string mascarada para o Zod fazer o parse e a validação
    const result = paymentSchema.safeParse({ valor: displayValue });

    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError(null);
      console.log("Dados prontos para a API (Número Puro):", result.data);
      // Saída no console: { valor: 12.50 }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block" }}>Valor do Pagamento:</label>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        {/* <TextField
          error={!!errors.rg}
          helperText={errors.rg?.message}
          id="outlined-error-helper-text"
          label="RG"
          placeholder="00.000.000-0"
          defaultValue=""
          fullWidth
          {...register("rg")}
        /> */}
      </div>

      {error && <p style={{ color: "red", margin: "5px 0" }}>{error}</p>}

      <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
        Enviar
      </button>
    </form>
  );
}
