import FormComponent from "@/components/FormComponent";
import TextFieldMask from "@/components/TextFieldMask";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";
import useFormContrato from "./useFormContrato";
import DatePickerField from "@/components/DatePickerField";
import { green } from "@mui/material/colors";
import { formatToCurrency } from "@/utils/formatMoeda";

export default function formContrato() {
  const {
    action: { setOpen, watch, buscar, salvar },
    data: {
      control,
      open,
      errors,
      register,
      isSubmitting,
      loading,
      listResponsavel,
    },
  } = useFormContrato();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        subTitulo={["Contrato /", "Novo"]}
        titulo="Formulário de Cadastro Contrato"
        isSubmitting={isSubmitting || loading}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",            
            flexWrap: "wrap",            
          }}
        >
          <TextField
            sx={{ width: "50%", m: 1, display: "flex" }}
            error={!!errors.responsavelId}
            helperText={errors.responsavelId?.message}
            id="outlined-error"
            label="Responsável"
            defaultValue=""
            fullWidth
            focused={true}
            slotProps={{
              inputLabel: { shrink: true },
              select: {
                native: true,
              },
            }}
            select
            {...register("responsavelId")}
          >
            {listResponsavel &&
              listResponsavel.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  selected={watch("responsavelId") == option.id}
                >
                  {option.nome}
                </option>
              ))}
          </TextField>
          <Box sx={{ width: "20%", m: 1, display: "flex" }}>
            {/* <TextField                  
                  error={!!errors.valorContratual}
                  helperText={errors.valorContratual?.message}
                  id="outlined-error-helper-text"
                  label="Valor Contratado"
                  placeholder="000.000.000,00"
                  fullWidth                 
                  focused={true}
                  {...register("valorContratual")}
                /> */}

            <Controller
              name="valorContratual"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.valorContratual}
                  helperText={errors.valorContratual?.message}
                  id="outlined-error-helper-text"
                  label="Valor Contratado"
                  placeholder="000.000.000,00"
                  fullWidth                 
                  focused={true}
                  onChange={v => field.onChange(v)}
                  value={formatToCurrency(field.value)}
                />
              )}
            />
          </Box>

          <Box sx={{ width: "12%", m: 1, display: "flex" }}>
            <Controller
              name="dataInicial"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label="Data Inicial"
                  error={!!errors.dataInicial}
                  helperText={errors.dataInicial?.message}
                  value={field.value ?? null}
                  onChange={(date: Date | null) =>
                    field.onChange(date ?? undefined)
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ width: "12%", m: 1, display: "flex" }}>
            <Controller
              name="dataFinal"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label="Data Final"
                  error={!!errors.dataFinal}
                  helperText={errors.dataFinal?.message}
                  value={field.value ?? null}
                  onChange={(date: Date | null) =>
                    field.onChange(date ?? undefined)
                  }
                />
              )}
            />
          </Box>
        </Box>
      </FormComponent>
    </>
  );
}
