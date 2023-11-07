import LoadingComponent from '@/components/loadingComponent';
import { CircleBackslashIcon } from '@radix-ui/react-icons';
import { NextPage } from 'next'

interface Props {}

const Loading: NextPage<Props> = ({}) => {
  return (
    <LoadingComponent />
  );
}

export default Loading