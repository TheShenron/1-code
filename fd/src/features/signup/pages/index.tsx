// features/auth/pages/SignUp/index.tsx
import { useSignUpForm } from '../hooks/useSignUpForm';
import { SignUpForm } from '../components/SignUpForm';

export default function SignUpPage() {
    const form = useSignUpForm();

    return <SignUpForm form={form} onSubmit={form.onSubmit} />;
}
