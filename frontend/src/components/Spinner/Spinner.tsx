import './Spinner.css';
const Spinner = (props: any) => {
    const {text} = props;
    return (
        <div className='flex flex-col md:flex-row w-full h-full justify-center mt-24 gap-10 flex-wrap text-center items-center'>
        <div className="spinner">
        </div>
        <p className='text-4xl pt-2'>{text} ...</p>
        </div>
    );
    };

export default Spinner;