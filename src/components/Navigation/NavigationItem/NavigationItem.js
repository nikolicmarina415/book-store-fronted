import './NavigationItem.css';
import { Link } from "react-router-dom";

function NavigationItem(props) {

    return (
        <span className="NavigationItem">
            <Link className={ props.currentActiveLinkProp == props.link ? "custom-link bold-text" : "custom-link" }
                to={props.link}>
                {props.text}
            </Link>
        </span>
    );
}

export default NavigationItem;
