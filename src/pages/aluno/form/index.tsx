import FormComponent from "@/components/FormComponent";
import { useAlunoForm } from "./useFormAluno";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import TextFieldMask from "@/components/TextFieldMask";
import { Controller } from "react-hook-form";
import DatePickerField from "@/components/DatePickerField";

export default function AlunoForm() {
  const {
    action: { buscar, salvar },
    data: { register, errors, loading, control, isSubmitting },
  } = useAlunoForm();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        titulo="Formulário de Cadastro Aluno"
        isSubmitting={isSubmitting}
        // children={undefined}
      >
        <Box
          sx={{
            width: "100%",
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              error={!!errors.nome}
              helperText={errors.nome?.message}
              id="outlined-error"
              label="Nome"
              placeholder="Nome completo"
              defaultValue=""
              fullWidth
              {...register("nome")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="nascimento"
                control={control}
                render={({ field }) => (
                  <DatePickerField
                    label="Nascimento"
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
            <Box sx={{ flex: 1 }}>
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
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                error={!!errors.rg}
                helperText={errors.rg?.message}
                id="outlined-error-helper-text"
                label="RG"
                placeholder="00.000.000-0"
                defaultValue=""
                fullWidth
                {...register("rg")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.turno}
                helperText={errors.turno?.message}
                id="outlined-error"
                label="Turno"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("turno")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.serie}
                helperText={errors.serie?.message}
                id="outlined-error"
                label="Série"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("serie")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.turma}
                helperText={errors.turma?.message}
                id="outlined-error"
                label="Turma"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("turma")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.nomePai}
                helperText={errors.nomePai?.message}
                id="outlined-error"
                label="Nome do Pai"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("nomePai")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.nomeMae}
                helperText={errors.nomeMae?.message}
                id="outlined-error"
                label="Nome da Mãe"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("nomeMae")}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors.convenioMedico}
                helperText={errors.convenioMedico?.message}
                id="outlined-error"
                label="Convênio Médico"
                placeholder="Nome completo"
                defaultValue=""
                fullWidth
                {...register("convenioMedico")}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/exemplo" passHref>
              <Button
                variant="contained"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Voltar
              </Button>
            </Link>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Box>
      </FormComponent>
    </>
  );
}
