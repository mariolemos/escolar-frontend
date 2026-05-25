import { Box, Button, TextField } from "@mui/material";
import DatePickerField from "@/components/DatePickerField";
import TextFieldMask from "@/components/TextFieldMask";
import useForm from "./useFormExempo";
import { Controller } from "react-hook-form";
import Link from "next/link";

export default function Form() {
    const {
        action: {
            salvar,
        },
        data: {
            register,
            errors,
            control,
            loading
        }
    } = useForm();
    return (
        <form onSubmit={salvar}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}>
                <h3>Formulário de exemplo</h3>
                <Box
                    sx={{
                        width: '100%',
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <TextField
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            id="outlined-error"
                            label={control._formValues.nome ? "" : "Nome completo"}
                            placeholder="Nome completo"
                            fullWidth
                            {...register("nome")}
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="nascimento"
                                control={control}
                                render={({ field }) => (
                                    <DatePickerField
                                        label="Nascimento"
                                        error={!!errors.nascimento}
                                        helperText={errors.nascimento?.message}
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={field.onChange}
                                        fullWidth
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
                                        variant="standard"
                                        mask="999.999.999-99"
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                variant="standard"
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
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link href="/exemplo" passHref>
                            <Button variant="contained" color="inherit" sx={{ marginRight: 2 }}>
                                Voltar
                            </Button>
                        </Link>
                        <Button variant="contained" color="primary" type="submit">
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box >
        </form>
    );
}