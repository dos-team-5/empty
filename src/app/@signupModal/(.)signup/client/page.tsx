import SignupForm from '@/app/(auth)/signup/components/SignupForm';
import InterceptedModal from '@/components/InterceptedModal';

const InterceptedClientPage = () => {
  return (
    <InterceptedModal modalPath="/signup/client">
      <SignupForm type="client" />
    </InterceptedModal>
  );
};

export default InterceptedClientPage;
