import axios from "axios";

// Hàm chung để gọi API
async function callAPI(method, url, params, data) {
  try {
    const response = await axios.request({
      method,
      url,
      params,
      data,
    });

    // Xử lí dữ liệu response tại đây (nếu cần)
    console.log(response.data);

    return response.data; // Trả về dữ liệu response cho việc xử lí tiếp theo (nếu cần)
  } catch (error) {
    // Xử lí lỗi tại đây
    console.error(error);

    throw error; // Ném lỗi để xử lí ở phần gọi hàm
  }
}

export default callAPI;
