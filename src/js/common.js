/**
 * So sánh object
 * @param {Object} object1
 * @param {Object} object2
 * @returns
 */
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
/**
 * So sanh 2 mảng
 * Created by : DangPD(20/5/2023)
 * @param {*} array1 
 * @param {*} array2 
 * @returns 
 */
function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    const item1 = array1[i];
    const item2 = array2[i];
    if (typeof item1 !== typeof item2) {
      return false;
    }

    if (typeof item1 !== 'object' || item1 === null) {
      if (item1 !== item2) {
        return false;
      }
    } else {
      if (!shallowEqual(item1, item2)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Ẩn khi click outside
 * CreateBy: DangPD
 */
const clickoutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Nếu element hiện tại không phải là element đang click vào
      // Hoặc element đang click vào không phải là button trong combobox hiện tại thì ẩn đi.
      if (
        !(
          (
            el === event.target || // click phạm vi của combobox__data
            el.contains(event.target) || //click vào element con của combobox__data
            el.previousElementSibling.contains(event.target)
          ) //click vào element button trước combobox data (nhấn vào button thì hiển thị)
        )
      ) {
        // Thực hiện sự kiện tùy chỉnh:
        binding.value(event, el);
        // vnode.context[binding.expression](event); // vue 2
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};

/**
 * hàm format giới tính
 * CreateBy: DangPD
 * @param {*} data
 * @returns
 */
function formatMaterialExcel(status, code, text) {
  try {
    if (status == "0") {
      return "Bản ghi hợp lệ";
    } else if (status == "1") {
      return `Mã nguyên vật liệu ${code} đã tồn tại`;
    } else if (status == "2") {
      return `Đơn vị tính ${text} trùng đơn vị chuyển đổi `;
    }
    return "";
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetch Api
 * CreateBy: DangPD
 * @param {*} url
 * @param {*} method
 * @param {*} fnCallBack
 * @param {*} data
 * @param {*} typeRes
 * @returns
 */
function fetchAPI(url, method, fnCallBack, data, typeRes) {
  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      switch (typeRes) {
        case "blob":
          return res.blob();
        default:
          break;
      }
      return res.json();
    })
    .then((res) => {
      return fnCallBack(res);
    })
    .catch((err) => console.log(err));
}

/**
 * Kiểm ta khoảng trắng hoặc null
 * @param {*} text : chuỗi cần kiểm tra
 * @returns true nếu có khoảng trắng hoặc null
 */
function isNull(text) {
  if (text) {
    if (text.trim().length) {
      return true;
    }
  }
  return false;
}

function formatNumber(number) {
  if (typeof number !== "number") {
    return ""; // Trả về chuỗi rỗng nếu tham số không hợp lệ
  }
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

/**
 * Tạo guid
 * @returns
 * CreatedBy: PDDang (24/5/2023) 
 */
function generateUUID() {
  var d = new Date().getTime();
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
export {
  isNull,
  formatNumber,
  shallowEqual,
  compareArrays,
  generateUUID,
  clickoutside,
  formatMaterialExcel,
  fetchAPI,
};
