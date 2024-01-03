import * as React from "react"
import MailIcon from "./icons/MailIcon";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

const Footer = () => {
    return (
        <div className="footer container-fluid secondary-comp p-5">

            <div className="row d-flex justify-content-center pt-3 mb-1">
                <div className="col-4 col-lg-2">
                    <a href="mailto:bugel.niels@gmail.com" target="_blank" rel="noopener noreferrer"
                       className="clickable-link">
                        <MailIcon className="footer-icon"/> <span>bugel.niels@gmail.com</span>
                    </a>
                </div>
                <div className="col-4 col-lg-2">
                    <a href="https://github.com/BugelNiels" target="_blank" rel="noopener noreferrer"
                       className="clickable-link">
                        <GitHubIcon className="footer-icon"/> <span>BugelNiels</span>
                    </a>
                </div>
                <div className="col-4 col-lg-2">
                    <a href="https://www.linkedin.com/in/nielsbugel" target="_blank" rel="noopener noreferrer"
                       className="clickable-link">
                        <LinkedInIcon className="footer-icon"/> <span>Niels Bugel</span>
                    </a>
                </div>
            </div>
            <div className="row justify-content-center pt-4 mb-0">
                <p>
                    &copy; 2023 Niels Bugel. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export { Footer };