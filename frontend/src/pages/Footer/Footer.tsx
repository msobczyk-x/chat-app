
const Footer = () => {
    return (
        <footer className="footer w-full h-[10vh] ">
        <div className="container">
            <div className="row">
            <div className="col-12">
                <p className="text-center">
                &copy; {new Date().getFullYear()} - My Company
                </p>
            </div>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;