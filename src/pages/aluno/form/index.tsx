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
      >
        <Box
          sx={{
            width: "50%",
            m: 1,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <TextField
            sx={{ width: "40%", m: 1, display: "flex" }}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            id="outlined-error"
            label="Nome"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("nome")}
          />
          <Box sx={{ width: "20%",  m: 1, display: "flex" }}>
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
          <Box sx={{ width: "20%", m: 1, display: "flex" }}>
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
          <TextField
            sx={{ width: "12%", m: 1, display: "flex" }}
            error={!!errors.rg}
            helperText={errors.rg?.message}
            id="outlined-error-helper-text"
            label="RG"
            placeholder="00.000.000-0"
            defaultValue=""
            fullWidth
            {...register("rg")}
          />
          <TextField
          sx={{ width: "32%", m: 1, display: "flex"}}
            error={!!errors.turno}
            helperText={errors.turno?.message}
            id="outlined-error"
            label="Turno"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("turno")}
          />
          <TextField
          sx={{ width: "32%", m: 1, display: "flex"}}
            error={!!errors.serie}
            helperText={errors.serie?.message}
            id="outlined-error"
            label="Série"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("serie")}
          />
          <TextField
          sx={{ width: "30%", m: 1, display: "flex"}}
            error={!!errors.turma}
            helperText={errors.turma?.message}
            id="outlined-error"
            label="Turma"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("turma")}
          />
          <TextField
          sx={{ width: "32%", m: 1, display: "flex"}}
            error={!!errors.nomePai}
            helperText={errors.nomePai?.message}
            id="outlined-error"
            label="Nome do Pai"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("nomePai")}
          />
          <TextField
          sx={{ width: "32%", m: 1, display: "flex"}}
            error={!!errors.nomeMae}
            helperText={errors.nomeMae?.message}
            id="outlined-error"
            label="Nome da Mãe"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("nomeMae")}
          />
          <TextField
          sx={{ width: "30%", m: 1, display: "flex"}}
            error={!!errors.convenioMedico}
            helperText={errors.convenioMedico?.message}
            id="outlined-error"
            label="Convênio Médico"
            placeholder="Nome completo"
            defaultValue=""
            fullWidth
            {...register("convenioMedico")}
          />
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
