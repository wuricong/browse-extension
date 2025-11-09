console.log('chrome.bookmarks', chrome.bookmarks.onCreated)
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  console.log("id", bookmark, id)
})
