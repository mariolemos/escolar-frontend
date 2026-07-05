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
          <TextField
            sx={{ width: "54%", m: 1, display: "flex" }}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            id="outlined-error"
            label="Nome"
            defaultValue=""
            fullWidth
            {...register("nome")}
            focused={true}
          />
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
          <TextField
            sx={{ width: "24%", m: 1, display: "flex" }}
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
            sx={{ width: "35%", m: 1, display: "flex" }}
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
          <TextField
            sx={{ width: "35%", m: 1, display: "flex" }}
            error={!!errors.colegioId}
            helperText={errors.colegioId?.message}
            id="outlined-error"
            label="Colégio"
            defaultValue=""
            fullWidth
            select
            focused={true}
            slotProps={{
              inputLabel: { shrink: true },
              select: {
                native: true,
              },
            }}
            {...register("colegioId")}
          >
            {listColegio &&
              listColegio.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  selected={watch("colegioId") == option.id}
                >
                  {option.nome}
                </option>
              ))}
          </TextField>
          <TextField
            sx={{ width: "32%", m: 1, display: "flex" }}
            error={!!errors.turno}
            helperText={errors.turno?.message}
            id="outlined-error"
            label="Turno"
            defaultValue=""
            fullWidth
            select
            focused={true}
            slotProps={{
              inputLabel: { shrink: true },
              select: {
                native: true,
              },
            }}
            {...register("turno")}
          >
            {turno.map((option) => (
              <option key={option.id} value={option.nome}>
                {option.nome}
              </option>
            ))}
          </TextField>
          <TextField
            sx={{ width: "32%", m: 1, display: "flex" }}
            error={!!errors.serie}
            helperText={errors.serie?.message}
            id="outlined-error"
            label="Série"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("serie")}
          />
          <TextField
            sx={{ width: "30%", m: 1, display: "flex" }}
            error={!!errors.turma}
            helperText={errors.turma?.message}
            id="outlined-error"
            label="Turma"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("turma")}
          />
          <TextField
            sx={{ width: "35%", m: 1, display: "flex" }}
            error={!!errors.nomePai}
            helperText={errors.nomePai?.message}
            id="outlined-error"
            label="Nome do Pai"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("nomePai")}
          />
          <TextField
            sx={{ width: "35%", m: 1, display: "flex" }}
            error={!!errors.nomeMae}
            helperText={errors.nomeMae?.message}
            id="outlined-error"
            label="Nome da Mãe"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("nomeMae")}
          />
          <TextField
            sx={{ width: "24%", m: 1, display: "flex" }}
            error={!!errors.convenioMedico}
            helperText={errors.convenioMedico?.message}
            id="outlined-error"
            label="Convênio Médico"
            defaultValue=""
            fullWidth
            focused={true}
            {...register("convenioMedico")}
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
