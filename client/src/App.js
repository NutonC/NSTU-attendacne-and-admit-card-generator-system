import { useState, useEffect } from "react";
import API_URL from "./requests/api-url";
import "./App.css";

import Spinner from "./components/spinner/Spinner.component";
import Routes from "./routes/Routes";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUsercheckSessionPending,
} from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { setPackagesStart } from "./redux/package/package.actions";

import { setAccessToken } from "./requests/accessToken";

function App({
  currentUser,
  userSessionLoading,
  onMountCheckUserSession,
  onMountSetPacakges,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      fetch(`${API_URL}/refresh_token`, {
        method: "POST",
        credentials: "include",
      }).then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        accessToken && onMountCheckUserSession(accessToken);
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }, [onMountCheckUserSession]);

  useEffect(() => {
    onMountSetPacakges();
  }, [onMountSetPacakges]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="App">
      <Routes
        currentUser={currentUser}
        userSessionLoading={userSessionLoading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userSessionLoading: selectUsercheckSessionPending,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onMountCheckUserSession: (token) => dispatch(checkUserSession(token)),
    onMountSetPacakges: () => dispatch(setPackagesStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
