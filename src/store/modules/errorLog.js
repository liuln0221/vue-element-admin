const errorLog = {
  state: {
    // logs: []
    logs: [{ // TODO
      err: { message: 'danger', stack: 'stack' },
      vm: {
        $vnode: {
          tag: 'warning'
        }
      },
      info: 'info',
      url: 'success'
    }, {
      err: { message: 'danger', stack: 'stack' },
      vm: {
        $vnode: {
          tag: 'warning'
        }
      },
      info: 'info',
      url: 'success'
    }]
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log);
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log);
    }
  }
};

export default errorLog;
