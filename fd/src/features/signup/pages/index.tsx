// features/auth/pages/SignUp/index.tsx
import { useSignUpForm } from '../hooks/useSignUpForm';
import { SignUpForm } from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  const form = useSignUpForm();

  return <SignUpForm form={form} onSubmit={form.onSubmit} />;
};

export default SignUpPage;