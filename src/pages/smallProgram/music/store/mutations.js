export default {
  'toDtlParams/set': function (state, data) {
    state.toDtlParams = data
  },
  'listType/set': function (state, data) {
    state.listType = data
  },
  'isPlay/set': function (state, data) {
    state.isPlay = data
  },
  'isPlay/get': function (state, data) {
    return state.isPlay
  }
}