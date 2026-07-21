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
          }}
        >
          <Box sx={{ m: 1, width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "20%", display: "flex" }}
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  id="outlined-error"
                  label="Nome"
                  fullWidth
                  focused={true}
                />
              )}
            />
            <Box sx={{ width: "10%", display: "flex", m: 1 }}>
              <Controller
                name="dataNascimento"
                control={control}
                render={({ field }) => (
                  <DatePickerField                    
                    label="Nascimento"
                    focused={true}
                    error={!!errors.dataNascimento}
                    helperText={errors.dataNascimento?.message}
                    value={field.value ?? null}
                    onChange={(date: Date | null) =>
                      field.onChange(date ?? undefined)
                    }
                  />
                )}
              />
            </Box>

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
                  sx={{ width: "15%" }}
                />
              )}
            />
            <Controller
              name="rg"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "15%", display: "flex" }}
                  error={!!errors.rg}
                  helperText={errors.rg?.message}
                  id="outlined-error-helper-text"
                  label="RG"
                  placeholder="00.000.000-0"
                  fullWidth
                  focused={true}
                />
              )}
            />
            <Controller
              name="parentesco"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "15%", display: "flex" }}
                  error={!!errors.parentesco}
                  helperText={errors.parentesco?.message}
                  id="outlined-error-helper-text"
                  label="Parentesco"
                  placeholder="parentesco"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <EnderecoForm
            register={register}
            errors={errors.endereco}
            control={control}
            setValue={setValue}
          />
          <ContatosForm
            register={register}
            errors={errors.contatos}
            control={control}
            setValue={setValue}
          />
        </Box>
      </FormComponent>
    </>
  );
}
