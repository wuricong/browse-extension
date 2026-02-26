const webSocket = new WebSocket('ws://localhost:9001')

chrome.bookmarks && chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  console.log("id", bookmark, id)
})

chrome.runtime && chrome.runtime.onMessage.addListener((message) => {
  console.log('message', message.greeting)
})

// 监听切换
chrome.tabs && chrome.tabs.onActivated.addListener((tab) => {
  webSocket.send('active-change', tab);
  chrome.tabs.query({}, (tabs) => {
    console.log('所有 tabs:', tabs);
  });
});

// 监听添加
chrome.tabs && chrome.tabs.onCreated.addListener((tab) => {
  console.log('tab', tab)
  webSocket.send('add', tab);
});

//监听移除
chrome.tabs && chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  webSocket.send('remove');
});

webSocket.onmessage = (event) => {
  console.log('message', event.data);
}

webSocket.onopen = () => {
  webSocket.send('open');
}

webSocket.onclose = () => {
  console.log('socket closed');
}

