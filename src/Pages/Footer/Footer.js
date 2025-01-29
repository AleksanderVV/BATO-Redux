import './footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="container">
            <div className="row justify-content-start justify-content-sm-between gap-3 gap-sm-2 gap-lg-0">
                <div className="col-lg-6 col-md-12 d-inline-flex justify-content-lg-start justify-content-center">
                <div className="footer__copywrite">
                    BATO© Nordic a/s Fåborgvej 1, DK-4200 Slagelse
                </div>
                </div>
                <div className="col-lg-6 col-md-12 d-inline-flex justify-content-lg-end justify-content-sm-center">
                <div className="footer__info d-flex gap-1 gap-sm-3">
                    <div className="footer__phone">Phone: +45 5850 2210</div>
                    <div className="footer__email">E-mail: info@batonordic.dk</div>
                </div>
                </div>
            </div>
            </div>
        </footer>
    );
}

export default Footer;