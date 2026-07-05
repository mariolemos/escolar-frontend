import FormComponent from "@/components/FormComponent";
import useFormResponsavel from "./useFormResponsavel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Controller } from "react-hook-form";
import DatePickerField from "@/components/DatePickerField";
import TextFieldMask from "@/components/TextFieldMask";
import EnderecoForm from "@/layout/componets/EnderecoForm";
import ContatosForm from "@/layout/componets/ContatosForm";

export default function FormResponsavel() {
  const {
    action: { salvar, setValue },
    data: { isSubmitting, errors, control, loading, register },
  } = useFormResponsavel();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        titulo="Formulário de Cadastro Responsável"
        isSubmitting={isSubmitting || loading}
      >
        <Box
          sx={{
            width: "100%",
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            padding: "30px",
          }}
        >
          <TextField
            sx={{ width: "50%", display: "flex", m: 1 }}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            id="outlined-error"
            label="Nome"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("nome")}
          />
          <Box sx={{ flex: 1, width: "40%", m: 1 }}>
            <Controller
              name="nascimento"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label="Nascimento"
                  focused={true}
                  error={!!errors.nascimento}
                  helperText={errors.nascimento?.message}
                  value={field.value ?? null}
                  onChange={(date: Date | null) =>
                    field.onChange(date ?? undefined)
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1, m: 1 }}>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextFieldMask
                  {...field}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  id="outlined-error-helper-text"
                  label="CPF"
                  placeholder="000.000.000-00"
                  fullWidth
                  mask="999.999.999-99"
                  focused={true}
                />
              )}
            />
          </Box>
          <TextField
            sx={{ width: "100%", m: 1 }}
            error={!!errors.rg}
            helperText={errors.rg?.message}
            id="outlined-error-helper-text"
            label="RG"
            placeholder="00.000.000-0"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("rg")}
          />
          <TextField
            sx={{ width: "100%", m: 1 }}
            error={!!errors.parentesco}
            helperText={errors.parentesco?.message}
            id="outlined-error"
            label="Parentesco"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("parentesco")}
          />
          <EnderecoForm
            register={register}
            errors={errors.endereco}
            control={control}
            setValue={setValue}
          />
          <ContatosForm
            register={register}
            errors={errors.contato}
            control={control}
            setValue={setValue}
          />
        </Box>
      </FormComponent>
    </>
  );
}
