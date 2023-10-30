import Image from 'next/image'
import LoadingGiff from '../../../public/loading-gif.gif'

export function Loader() {
    return (
        <div className='flex justify-center'>
            <Image className='w-20 mt-20' src={LoadingGiff} alt="loader" />
        </div>
    )
}