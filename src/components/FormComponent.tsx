import { Box } from "@mui/material";
import Loading from "./Loading";

interface FormComponentProps {
    onSubmit: () => void;
    titulo: string;
    isSubmitting: boolean;
    children: React.ReactNode;
}

export default function FormComponent({ onSubmit, titulo, isSubmitting, children }: FormComponentProps) {
    return (
        <form onSubmit={onSubmit}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}>
                <h3>{titulo}</h3>
                {children}
            </Box >
            <Loading isLoading={isSubmitting} />
        </form>
    )
}