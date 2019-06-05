import React from "react";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {RootRoute} from "../../constants/routePaths";
import {getProjectIdFromLocalStorage, getProjectIdFromUrl} from "../../utils/projectIdUtil";

interface IProjectEnsurerState {
  readonly ensured: boolean;
  readonly error: string;
  readonly ensureProjectId: string;
}

class ProjectEnsurer extends React.PureComponent<RouteComponentProps, IProjectEnsurerState> {

  readonly state = {
    ensured: false,
    error: '',
    ensureProjectId: '',
  };

  componentDidMount() {
    this.ensureProject();
  }

  componentDidUpdate() {
    this.ensureProject();
  }

  ensureProject = () => {
    const { ensured } = this.state;
    console.log('ensured:', ensured);
    if (!ensured) {
      const projectIdInUrl = getProjectIdFromUrl();
      if (projectIdInUrl) {
        console.log('project id is in url -> ensured');
        this.setState(() => ({
          ensured: true,
        }));
        return;
      }

      const projectIdInLocalStorage = getProjectIdFromLocalStorage();
      if (projectIdInLocalStorage && projectIdInLocalStorage !== '') {
        console.log('project id is in local storage and not in url -> ensure project ic');
        this.setState(() => ({
          ensureProjectId: projectIdInLocalStorage,
        }));
        return;
      }

      this.setError('There is no project id in url nor local storage');
    }
  }

  setError = (errorMessage: string): void => {
    this.setState(() => ({ error: errorMessage }));
  };

  render() {
    const { ensured, error, ensureProjectId } = this.state;
    console.log(ensured, error, ensureProjectId, window.location.pathname);

    if (ensured) {
      return this.props.children;
    }

    if (error !== '') {
      return (
        <>
          <p>Can't get Project Id</p>
          <p>Please provide Project Id in url: <i>https://kentico.github.io/cloud-preview-sample-app/your_project_id</i></p>
          <p>Inner error: {error}</p>
        </>
      );
    }

    if (ensureProjectId) {
      console.log('will ensure new project id: ' + ensureProjectId);
      return (
        <Redirect exact from={RootRoute} to={RootRoute + ensureProjectId} />
      )
    }

    return <div>wut</div>;
  }
}

const ProjectEnsurerWithRouter = withRouter(ProjectEnsurer);
export { ProjectEnsurerWithRouter as ProjectEnsurer };
