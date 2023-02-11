import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundImage: `url(https://i.imgur.com/g3hgqe8.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "40vh",
              height: "40vh",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#2f8e89",
            }}
          >
            Loading Time Out{" "}
            <span role="img" aria-label="Page-Broken">
              😢
            </span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
