import './Spinner.css';
const Spinner = () => {
    return (
        <div className='flex flex-row w-full h-[calc(100vh_-_10rem)] justify-center mt-24 gap-10'>
        <div className="spinner">
        </div>
        <p className='text-4xl pt-2'>Connecting ...</p>
        </div>
    );
    };

export default Spinner;