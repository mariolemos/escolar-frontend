import FormComponent from "@/components/FormComponent";
import useFormColegio from "./useFormColegio";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import DatePickerField from "@/components/DatePickerField";
import TextFieldMask from "@/components/TextFieldMask";
// import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Link from "next/dist/client/link";

export default function FormColegio() {
  const {
    action: { salvar, setOpen },
    data: { register, errors, control, loading, isSubmitting, open },
  } = useFormColegio();

  return (
    <>
      <FormComponent
        onSubmit={salvar}
        titulo="Formulário de Cadastro Colégio"
        isSubmitting={isSubmitting || loading}
      >
        <Box
          sx={{
            width: "50%",
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        >
          <TextField
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

          <Controller
            name="horario"
            control={control}
            render={({ field }) => (
              <TextFieldMask
                {...field}
                error={!!errors.horario}
                helperText={errors.horario?.message}
                id="outlined-error-helper-text"
                label="Horário"
                placeholder="06:45"
                fullWidth
                mask="99:99"
                {...register("horario")}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/colegio" passHref>
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
