import FormComponent from "@/components/FormComponent";
import { useAlunoForm } from "./useFormAluno";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import TextFieldMask from "@/components/TextFieldMask";
import { Controller } from "react-hook-form";
import DatePickerField from "@/components/DatePickerField";
import useResponsavel from "@/pages/responsavel/useResponsavel";
import useColegio from "@/pages/colegio/useColegio";
import EnderecoForm from "@/layout/componets/EnderecoForm";
import ContatosForm from "@/layout/componets/ContatosForm";

export default function AlunoForm() {
  const {
    action: { buscar, salvar, watch, setValue },
    data: {
      register,
      errors,
      loading,
      control,
      isSubmitting,
      turno,
      listResponsavel,
      listColegio,
    },
  } = useAlunoForm();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        titulo="Formulário de Cadastro Aluno"
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
          <Box sx={{ width: "54%", m: 1, display: "flex" }}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  id="outlined-error"
                  label="Nome"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "20%", m: 1, display: "flex" }}>
            <Controller
              name="dataNascimento"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label="Nascimento"
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
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "24%", m: 1, display: "flex" }}>
            <Controller
              name="rg"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
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
          </Box>
          <Box sx={{ width: "35%", m: 1, display: "flex" }}>
            <Controller
              name="responsavelId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.responsavelId}
                  helperText={errors.responsavelId?.message}
                  id="outlined-error"
                  label="Responsável"
                  fullWidth
                  focused={true}
                  slotProps={{
                    inputLabel: { shrink: true },
                    select: {
                      native: true,
                    },
                  }}
                  select
                >
                  {listResponsavel &&
                    listResponsavel.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nome}
                      </option>
                    ))}
                </TextField>
              )}
            />
          </Box>
          <Box sx={{ width: "35%", m: 1, display: "flex" }}>
            <Controller
              name="colegioId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.colegioId}
                  helperText={errors.colegioId?.message}
                  id="outlined-error"
                  label="Colégio"
                  fullWidth
                  select
                  focused={true}
                  slotProps={{
                    inputLabel: { shrink: true },
                    select: {
                      native: true,
                    },
                  }}
                >
                  {listColegio &&
                    listColegio.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nome}
                      </option>
                    ))}
                </TextField>
              )}
            />
          </Box>
          <Box sx={{ width: "32%", m: 1, display: "flex" }}>
            <Controller
              name="turno"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.turno}
                  helperText={errors.turno?.message}
                  id="outlined-error"
                  label="Turno"
                  fullWidth
                  select
                  focused={true}
                  slotProps={{
                    inputLabel: { shrink: true },
                    select: {
                      native: true,
                    },
                  }}
                >
                  {turno.map((option) => (
                    <option key={option.id} value={option.nome}>
                      {option.nome}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box sx={{ width: "32%", m: 1, display: "flex" }}>
            <Controller
              name="serie"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.serie}
                  helperText={errors.serie?.message}
                  id="outlined-error"
                  label="Série"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "30%", m: 1, display: "flex" }}>
            <Controller
              name="turma"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.turma}
                  helperText={errors.turma?.message}
                  id="outlined-error"
                  label="Turma"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "35%", m: 1, display: "flex" }}>
            <Controller
              name="nomePai"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.nomePai}
                  helperText={errors.nomePai?.message}
                  id="outlined-error"
                  label="Nome do Pai"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "35%", m: 1, display: "flex" }}>
            <Controller
              name="nomeMae"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.nomeMae}
                  helperText={errors.nomeMae?.message}
                  id="outlined-error"
                  label="Nome da Mãe"
                  fullWidth
                  focused={true}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "24%", m: 1, display: "flex" }}>
            <Controller
              name="convenioMedico"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%", display: "flex" }}
                  error={!!errors.convenioMedico}
                  helperText={errors.convenioMedico?.message}
                  id="outlined-error"
                  label="Convênio Médico"
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
            errors={errors.contato}
            control={control}
            setValue={setValue}
          />
        </Box>
      </FormComponent>
    </>
  );
}
