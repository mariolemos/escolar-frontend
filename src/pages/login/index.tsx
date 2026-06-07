import FormComponent from "@/components/FormComponent";
import { useLogin } from "./useLogin";
import { Box, Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import TextFieldMask from "@/components/TextFieldMask";

export default function LoginPage() {


  const {
    action: {
      login,
      register
    },
    data: {
      isSubmitting,
      errors,
      control
    }
  } = useLogin();

  return (
    <FormComponent onSubmit={login} titulo="Formulário de exemplo" isSubmitting={isSubmitting}>
      <Box
        sx={{
          width: '100%',
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
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
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <TextField
            error={!!errors.senha}
            helperText={errors.senha?.message}
            id="outlined-error"
            label={control._formValues.senha ? "" : "Senha"}
            placeholder="Senha"
            defaultValue=""
            fullWidth
            type="password"
            {...register("senha")}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </FormComponent>
  );
}
