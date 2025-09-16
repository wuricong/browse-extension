
  const video_btn = document.querySelector('.video_btn')

  const close = document.querySelector('.close')
  video_btn.addEventListener('click',()=>{
  chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
    chrome.tabs.sendMessage(tabs[0].id,{action:'downVideo',data:'hello from action'},()=>{})
  })
})

  chrome.webRequest.onCompleted.addListener(
    (details) => {
      console.log('request finished:', details.url);
    },
    { urls: ["<all_urls>"] }
  );
