// 接收popup 页面的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downVideo') {
    downVideo()
  }
  sendResponse({success: true})
})

let audioContext, audioSource

function downVideo() {
  console.log('downVideo')
  setTimeout(() => {
    const video = document.querySelector('video')
    setTimeout(() => {
      video.pause()
      video.currentTime = 0

      // 创建一个音频上下文
      audioContext = new AudioContext();

      // 从 video 元素创建一个音频源
      audioSource = audioContext.createMediaElementSource(video);
      console.log('audioSource', audioSource)

      // 创建一个 MediaStreamDestination
      const destination = audioContext.createMediaStreamDestination();

      // 将音频源连接到目标音频输出设备（默认扬声器）
      audioSource.connect(destination);

      // 将音频源连接到扬声器
      audioSource.connect(audioContext.destination); // 保证音频正常播放

      // 确保音频上下文被启用
      audioContext.resume().then(() => {
        video.play();  // 确保视频播放
      });

      // 创建 MediaRecorder 实例，录制音频流
      const mediaRecorder = new MediaRecorder(destination.stream);
      let audioChunks = [];

      // 监听数据可用事件并收集音频数据
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };


      //停止录制时间
      setTimeout(() => {
        mediaRecorder.stop();
      }, video.duration * 1000)

      // 录制停止时，处理音频文件
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
        const audioUrl = URL.createObjectURL(audioBlob);

        // 创建一个下载链接
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'recorded-audio.wav';  // 设置文件名
        link.click();  // 自动触发下载
      };

      // 开始录制
      mediaRecorder.start();
      console.log("Recording started...");  // 确保开始录制

    }, 1000)

  }, 500)
}

chrome.runtime.sendMessage({greeting: 'hello'})

const inputList = document.querySelectorAll('input');
inputList.forEach(input => {
  if (input.placeholder === '请输入手机号') {
    input.value = '17835698682'
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }
  if (input.placeholder === '请输入密码') {
    input.value = '698682'
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }
})
setTimeout(() => {
  const button = document.querySelector('.el-button');
  button.click()
})




