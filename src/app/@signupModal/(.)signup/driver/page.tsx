import SignupForm from '@/app/(auth)/signup/components/SignupForm';
import InterceptedModal from '@/components/InterceptedModal';

const InterceptedDriverPage = () => {
  return (
    <InterceptedModal modalPath="/signup/driver">
      <SignupForm type="driver" />
    </InterceptedModal>
  );
};

export default InterceptedDriverPage;
