function print(message) {
  postMessage({
    type: 'output',
    text: message,
  })
}

let inpResolve, inpReject;
function input() {
  postMessage({
    type: 'inputStart',
  })
  return new Promise(function(resolve, reject) {
    inpResolve = resolve;
    inpReject = reject;
  })
}

onmessage = function(e) {
  let data = e.data;
  if (data.type == 'start') {
    main()
    .then(function() {
      postMessage({
        type: 'finished'
      })
    })
    .catch(function(err) {
      postMessage({
        type: 'execError',
        err: {
          stack: err.stack,
          message: err.message,
        },
      })
    })
  }
  if (data.type == 'input') {
    inpResolve(data.text)
  }
}
