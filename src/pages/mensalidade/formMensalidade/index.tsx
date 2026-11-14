import FormComponent from "@/components/FormComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextFieldMask from "@/components/TextFieldMask";
import { Controller } from "react-hook-form";
import DatePickerField from "@/components/DatePickerField";
import EnderecoForm from "@/layout/componets/EnderecoForm";
import ContatosForm from "@/layout/componets/ContatosForm";
import { useMensalidadeForm } from "./useFormMensalidade";


export default function MensalidadeForm() {
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
  } = useMensalidadeForm();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        titulo="Formulário de Cadastro Mensalidade"
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
          {/* <Box sx={{ width: "54%", m: 1, display: "flex" }}>
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
          </Box>                  */}
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
                  <option key="" value="">
                    Selecione um responsável
                  </option>
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
                  <option key="" value="">
                    Selecione um colégio
                  </option>
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
        </Box>
      </FormComponent>
    </>
  );
}
