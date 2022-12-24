import Skeleton from '../skeleton/Skeleton'
import ErrorMsg from '../errorMsg/ErrorMsg';
import Spinner from '../spinner/Spinner';


const setContent = (procces, Component, data) => {
    switch (procces) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'loaded':
            return <Component data={data} />
        case 'error':
            return <ErrorMsg />
        default: new Error('error in specified process')
    }
}

export const setContentList = (procces, Component, newItemLoading) => {
    switch (procces) {
        case 'waiting':
            return <Spinner width={'1100px'} />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'loaded':
            return <Component />
        case 'error':
            return <ErrorMsg />
        default: new Error('error in specified process')
    }
}
export default setContent;