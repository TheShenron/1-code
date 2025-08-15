// features/auth/pages/SignUp/index.tsx
import { useLoginForm } from '../hooks/useLoginForm';
import { LoginForm } from '../components/LoginForm';

const SignUpPage: React.FC = () => {
  const form = useLoginForm();

  return <LoginForm form={form} onSubmit={form.onSubmit} />;
};

export default SignUpPage;
