import { useLocation } from "react-router-dom";

export default function ErrorPage() {

    const location = useLocation();
    

    return (
                <div id="error-page">
                     <h1>Oops!</h1>
                     <p>Sorry, an unexpected error has ocurred</p>
                     <p>
                     <i>{`Error: Page not found (${location.pathname})`}</i>
                     </p>   
                </div>
    );
}