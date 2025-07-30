// features/auth/pages/SignUp/index.tsx
import { useLoginForm } from '../hooks/useLoginForm';
import { LoginForm } from '../components/LoginForm';

export default function SignUpPage() {
    const form = useLoginForm();

    return <LoginForm form={form} onSubmit={form.onSubmit} />;
}
