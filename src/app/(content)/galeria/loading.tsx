import {CircleBackslashIcon} from '@radix-ui/react-icons'

export default function Loading() {
    return (
        <div className="w-full h-screen grid place-items-center">
            <CircleBackslashIcon className={'animate-spin text-2xl'} />
        </div>
    )
}