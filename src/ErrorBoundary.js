import React from "react"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Nav from './components/nav/Nav/Nav'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {

    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ marginLeft: "40%" }}>
                    <Nav></Nav>
                    <p>Something went wrong.</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                    <Image style={{ marginTop: "10%" }} src="./error.jpg" alt="No image" />
                </div>
            );
        }
        return this.props.children;
    }
}  