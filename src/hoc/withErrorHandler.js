import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     error: null
    //   };
    //   this.axiosReqInterceptor = axios.interceptors.request.use(request => {
    //     this.setState({ error: null });
    //     return request;
    //   }, error => {
    //     return Promise.reject(error);
    //   });
    //   this.axiosResInterceptor = axios.interceptors.response.use(response => response, error => {
    //     this.setState({ error: error })
    //     return Promise.reject(error);
    //   });
    // }

    state = {
      error: null
    }

    componentWillMount() {
      this.axiosReqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      }, error => {
        return Promise.reject(error);
      });
      this.axiosResInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error })
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.axiosReqInterceptor);
      axios.interceptors.response.eject(this.axiosReqInterceptor);
    }

    closeErrorHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            closeModal={this.closeErrorHandler}>
            {this.state.error !== null ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}


export default withErrorHandler;