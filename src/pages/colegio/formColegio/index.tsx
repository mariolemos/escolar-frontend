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

export default function  FormColegio() {
    const {
        action: {

        },
        data: {
            isSubmitting,
        }
    }= useFormColegio();

    function salvar(): void {
        throw new Error("Function not implemented.");
    }

    return (

        <>
        <FormComponent onSubmit={salvar} titulo="Formulário de Cadastro Colégio" isSubmitting={isSubmitting}>
        
                    <Box
                        sx={{
                            width: '100%',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            <TextField
                                // error={!!errors.nome}
                                // helperText={errors.nome?.message}
                                id="outlined-error"
                                label="Nome"
                                placeholder="Nome completo"
                                defaultValue=""
                                fullWidth
                                // {...register("nome")}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            {/* <Box sx={{ flex: 1 }}>
                                <Controller
                                    name="nascimento"
                                    // control={control}
                                    render={({ field }) => (
                                        <DatePickerField
                                            label="Nascimento"
                                            // error={!!errors.nascimento}
                                            // helperText={errors.nascimento?.message}
                                            value={field.value ?? null}
                                            onChange={(date: Date | null) => field.onChange(date ?? undefined)}
                                        />
                                    )}
                                />
                            </Box> */}
                            {/* <Box sx={{ flex: 1 }}>
                                <Controller
                                    name="cpf"
                                    // control={control}
                                    render={({ field }) => (
                                        <TextFieldMask
                                            {...field}
                                            // error={!!errors.cpf}
                                            // helperText={errors.cpf?.message}
                                            id="outlined-error-helper-text"
                                            label="CPF"
                                            placeholder="000.000.000-00"
                                            fullWidth
                                            mask="999.999.999-99"
                                        />
                                    )}
                                />
                            </Box> */}
                            <Box sx={{ flex: 1 }}>
                                <TextField
                                    // error={!!errors.rg}
                                    // helperText={errors.rg?.message}
                                    id="outlined-error-helper-text"
                                    label="RG"
                                    placeholder="00.000.000-0"
                                    defaultValue=""
                                    fullWidth
                                    // {...register("rg")}
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
                </FormComponent>
        </>

    )
}