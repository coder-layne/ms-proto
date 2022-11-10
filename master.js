const { spawn } = require("child_process");
const chokidar = require("chokidar");

let child;
function startChild() {
  console.log("Child process started");
  console.log("");
  // 在子进程中执行脚本
  child = spawn("node", ["./child.js"]);
  // 输出的处理
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  // 输出的处理
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    console.log("");
  });
}

const watcher = chokidar.watch("./config.json");

console.log("Master process started and watch changes in config.json");
watcher.on("change", (filePath) => {
  console.log(`File ${filePath} has been changed`);
  console.log("");

  child.kill();

  console.log("Child process has been stopped and restart after 5 seconds");
  console.log("");

  // 为了演示需要，5秒后重新开启子进程
  setTimeout(() => {
    startChild();
  }, 5e3);
});

startChild();
