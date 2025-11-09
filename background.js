console.log('chrome.bookmarks', chrome.bookmarks)
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  console.log("id", bookmark, id)
})
