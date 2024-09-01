import React from 'react';
import '../css/footer.css';
import '../css/footerStyle.css';
import '../css/footerIcon.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer-59391">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div className="site-logo">
                                <a href="#">책 팔아요</a>
                            </div>
                        </div>
                        <div className="col-md-8 text-md-right">
                            <ul className="list-unstyled social-icons">
                                <li><a href="#" className="fb"><span className="icon-facebook"></span></a></li>
                                <li><a href="#" className="tw"><span className="icon-twitter"></span></a></li>
                                <li><a href="#" className="in"><span className="icon-instagram"></span></a></li>
                                <li><a href="#" className="be"><span className="icon-behance"></span></a></li>
                                <li><a href="#" className="dr"><span className="icon-dribbble"></span></a></li>
                                <li><a href="#" className="yt"><span className="icon-play"></span></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6 ">
                            <ul className="nav-links list-unstyled nav-left">
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 text-md-right">
                            <ul className="nav-links list-unstyled nav-right">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Our works</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <div className="copyright">
                                <p><small>Copyright 2019. All Rights Reserved.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
