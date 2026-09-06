// cau 1
const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

// promise1.then((data) => console.log(data))

// cau 2
function getNumber() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

// getNumber().then((res) => console.log(res))

// cau 3
function getError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

// getError().catch((err) => console.log(err.message))

// cau 4
const randomPromise = new Promise((resolve, reject) => {
  const num = Math.random();
  num > 0.5 ? resolve(num) : reject("Number too small");
});

function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    const num = Math.random();
    num > 0.5 ? resolve(num) : reject("Number too small");
  });
}

randomPromise
  .then((val) => console.log("Success:", val))
  .catch((err) => console.error("Error:", err));


// cau 5
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}


// simulateTask(800).then((res) => console.log(res))

// cau 6
Promise.all([
  simulateTask(1000),
  simulateTask(1500),
  simulateTask(2000)
]).then((results) => console.log(results))

// cau 7

Promise.race([
  simulateTask(3000),
  simulateTask(1000),
  simulateTask(2000)
]).then((winner) => console.log("Fastest:", winner));


// cau 8
Promise.resolve(2)
  .then((n) => n * n)
  .then((n) => n * 2)
  .then((n) => n + 5)
  .then((res) => console.log("Final:", res));

// cau 9
function filterEvens(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arr.filter((n: number) => n % 2 === 0));
    }, 1000);
  });
}

// filterEvens([1, 2, 3, 4, 5, 6]).then((res) => console.log(res))

// cau 10

simulateTask(1000)
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => console.log("Done"));

// cau 11
async function runEx11() {
  const res = await promise1;
  console.log(res);
}

// runEx11()

// cau 12
async function runTask() {
  const result = await simulateTask(2000);
  console.log(result);
}

// runTask()

// cau 13
async function handleTaskWithError() {
  try {
    const result = await getError();
    console.log(result);
  } catch (error) {
    console.error("Caught:", error instanceof Error ? error.message : error);
  }
}

// handleTaskWithError()



// cau 14
async function multiplyByThree(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

multiplyByThree(5).then((val) => console.log(val))

// cau 15
async function runSequential() {
  const a = await simulateTask(1000);
  const b = await simulateTask(1000);
  console.log(a, b);
}

// runSequential()

// cau 16
async function runParallel() {
  const results = await Promise.all([
    simulateTask(1000),
    simulateTask(1000)
  ]);
  console.log(results);
}

runParallel()

// cau 17
async function iteratePromises() {
  const tasks = [simulateTask(500), simulateTask(1000)];
  for await (const res of tasks) {
    console.log(res);
  }
}

iteratePromises()

// cau 18
async function fetchUser(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id, name: `User_${id}` };
}

fetchUser(101).then((user) => console.log("Câu 18:", user));

// cau 19
async function fetchUsers(ids: number) {
  return Promise.all(ids.map((id) => fetchUser(id)));
}

fetchUsers([1, 2, 3]).then((users) => console.log("Câu 19:", users));

// // cau 20
async function fetchWithTimeout(promise, ms = 2000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("API mất quá nhiều thời gian")), ms)
  );
  return Promise.race([promise, timeout]);
}

fetchWithTimeout(simulateTask(3000), 1500)
  .then((res) => console.log("Câu 20:", res))
  .catch((err) => console.log("Câu 20 (lỗi):", err.message));

// // cau 21
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// // cau 22
async function fetchMultipleTodos() {
  const ids = [1, 2, 3];
  const promises = ids.map((id) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((r) => r.json())
  );
  const results = await Promise.all(promises);
  console.log(results);
}
fetchMultipleTodos()

// cau 23
async function getIncompleteTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const todos = await res.json();
  return todos.filter((todo) => !todo.completed);
}

getIncompleteTodos().then((todos) => console.log("Câu 23 (Todos chưa xong):", todos));



// // cau 24
async function postData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 })
  });
  return res.json();
}

postData().then((res) => console.log("CAU 24",res))






// cau 26
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runWait5s() {
  console.log("Câu 26: Bắt đầu đợi 5 giây...");
  await wait(5000);
  console.log("Câu 26: Đã qua 5 giây!");
}

runWait5s();

// // cau 25
function downloadFile(fileName) {
  console.log(`Đang tải file ${fileName}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Done download: ${fileName}`);
      resolve(fileName);
    }, 3000);
  });
}

// downloadFile("document.pdf");


// cau 27
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries) {
        throw new Error(`Failed after ${retries} retries: ${err.message}`);
      }
      console.log(`Lần ${i + 1} lỗi, đang thử lại...`);
    }
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/invalid-url", 2)
  .then((data) => console.log("Câu 27:", data))
  .catch((err) => console.log("Câu 27 kết quả:", err.message));

// cau 28

async function batchProcess(tasks) {
  const results = await Promise.all(tasks.map((task) => task()));
  return results;
}

const mockTasks5 = Array.from({ length: 5 }, (_, i) => () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(`Task ${i + 1} done`), 500)
  )
);

batchProcess(mockTasks5).then((res) => console.log("Câu 28:", res));

// cau 29
async function queueProcess(tasks) {
  const results = [];
  for (const task of tasks) {
    const res = await task();
    results.push(res);
  }
  return results;
}

const queueList = [
  () => new Promise((resolve) => setTimeout(() => resolve("Queue 1 done"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Queue 2 done"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Queue 3 done"), 300))
];

queueProcess(queueList).then((res) => console.log("Câu 29:", res));

// cau 30
async function handleMultipleApis(urls) {
  const promises = urls.map((url) =>
    fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return res.json();
    })
  );

  const results = await Promise.allSettled(promises);

  results.forEach((item, index) => {
    if (item.status === "fulfilled") {
      console.log(`API ${index + 1} Thành công:`, item.value);
    } else {
      console.log(`API ${index + 1} Thất bại:`, item.reason.message || item.reason);
    }
  });

  return results;
}

const testUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/999999"
];

handleMultipleApis(testUrls);