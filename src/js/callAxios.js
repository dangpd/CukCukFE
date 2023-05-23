import axios from "axios";
// Hàm chung để gọi API
async function callAPI(method, url, data) {
  return new Promise((resolve, reject) => {
    axios.request({
      method,
      url,
      data,
    })
      .then(response => {
        // Xử lí dữ liệu response tại đây (nếu cần)
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        // Xử lí lỗi tại đây
        console.error(error);
        reject(error);
      });
  });
}

export default callAPI;
