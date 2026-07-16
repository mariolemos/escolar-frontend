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
import EnderecoForm from "@/layout/componets/EnderecoForm";
import ContatosForm from "@/layout/componets/ContatosForm";

export default function FormColegio() {
  const {
    action: { salvar, setOpen, setValue },
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
            width: "100%",
            padding: "30px",
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        >
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
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
            )}
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
                focused={true}
                mask="99:99"
                {...register("horario")}
              />
            )}
          />
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
