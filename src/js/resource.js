const Resource = {
  // Tiều đề
  TitleContent: {
    Material: "Nguyên vật liệu",
    MaterialCategory: "Nhóm nguyên vật liệu",
    Stock: "Kho",
    Unit: "Đơn vị tính",
  },
  // Tên form
  TitleForm: {
    AddUnit: "Thêm đơn vị tính",
    UpdateUnit: "Sửa đơn vị tính",
    DuplicateUnit: "Nhân bản đơn vị tính",
    AddStock: "Thêm kho",
    UpdateStock: "Sửa kho",
    DuplicateStock: "Nhân bản kho",
    AddMaterialCategory: "Thêm nhóm nguyên vật liệu",
    UpdateMaterialCategory: "Sửa nhóm nguyên vật liệu",
    DuplicateMaterialCategory: "Nhân bản nhóm nguyên vật liệu",
    AddMaterial: "Thêm nguyên vật liệu",
    UpdateMaterial: "Sửa nguyên vật liệu",
    DuplicateMaterial: "Nhân bản nguyên vật liệu",
  },

  Modal: {
    /* Tên chức năng */
    Cancel: "Huỷ",
    Close: "Đóng",
    Save: "Cất",
    SaveAndInsert: "Cất và Thêm",
    Update: "Sửa",
    Accept: "Đồng ý",
    Yes: "Có",
    No: "Không",
  },

  Dialog: {
    Save: "Cất",
    NotSave: "Không cất",
    No: "Không",
    Yes: "Có",
    Close: "Đóng",
    Cancel: "Huỷ chọn",
    Delete: "Xoá",
    Accept: "Đồng ý",
    Title: {
      Delete: "Xoá nhân viên",
      Change: "Dữ liệu đã bị thay đổi. ",
      Error: "Thông báo",
    },
    Text: {
      Save: "Bạn có muốn cất không?",
      Employee: "Bạn có thực sự muốn xoá Nhân viên",
      After: "không?",
      DeleteMultiple: "Bạn có thực sự muốn xoá những nhân viên đã chọn không?",
    },
  },

  // Toást
  ToastMessage: {
    Success: {
      Delete: "Xoá bản ghi thành công",
      Save: "Lưu bản ghi thành công",
    },
    Failed: {
      Delete: "Xoá bản ghi thất bại",
      Save: "Lưu bản ghi thất bại",
    },
    NotDelete: {
      TextCategory: "Nhóm nguyên vật liệu ",
      TextStock: "Kho ",
      TextUnit: "Đơn vị tính ",
      AfterText: " đã có phát sinh. Bạn không thể xóa."
    }
  },

  // Bàn phím
  KeyboardShortcuts: {
    Esc: "Esc",
    SaveAndInsert: "Ctrl + Shift + S",
    Save: "Ctrl + S",
    FirstPage: "Trang đầu",
    PrevPage: "Trang trước",
    NextPage: "Trang sau",
    LastPage: "Trang cuối",
  },

  // Loại form
  TYPE_FORM: {
    ADD: "add",
    UPDATE: "update",
    DUPLICATE: "duplicate",
  },

  // kiểu http request
  HTTP_METHOD: {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
  },

  ALERT_POPUP: {
    DataChange: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    AddSuccessMaterial: "Thêm mới thành công nguyên vật liệu",
    AddUnitSuccess: "Thêm mới thành công đơn vị tính",
    AddStockSuccess: "Thêm mới thành công kho ngầm định",
    UpdateSuccessMaterial: "Cập nhập thành công nguyên vật liệu",
    DeleteSuccess: "Xóa thành công",
    DeleteFail: "Xóa thất bại",
  },

  // Lỗi BE
  ERROR_BE: {
    Unknow: "Có lỗi xảy ra vui lòng liên hệ MISA để được hỗ trợ",
    DuplicateCodeMaterial: "Trùng mã nguyên vật liệu",
    DuplicateCodeMaterialCategory: "Trùng mã nhóm nguyên vật liệu",
    DuplicateCodeUnit: "Trùng tên đơn vị tính",
    DuplicateCodeStock: "Trùng mã kho chuyển đổi",
    // DuplicateCode: "Bản ghi đã bị xóa hoặc không tồn tại",
  },

  // Danh sách lỗi validate frontend
  ERROR_VALIDATE_FE: {
    NotEmpty: "Trường này không được bỏ trống",
    UnitNameNotEmpty: "Tên đơn vị tính không được bỏ trống",
    StockCodeNotEmpty: "Mã kho không được bỏ trống",
    StockNameNotEmpty: "Tên kho không được bỏ trống",
    CategoryCodeNotEmpty: "Mã nhóm nguyên vật liệu không được bỏ trống",
    CategoryNameNotEmpty: "Tên nhóm nguyên vật liệu không được bỏ trống",
    FeatureNotEmpty: "Tính chất không được bỏ trống",
    MaterialNameNotEmpty: "Tên nguyên vật liệu không được bỏ trống",
    MaterialCodeNotEmpty: "Mã nguyên vật liệu không được bỏ trống",
    UnitIDNotEmpty: "Đơn vị tính không được bỏ trống",
    DuplicateUnit: "Đơn vị chuyển đổi không được trùng với đơn vị chính",
    DuplicateConversionUnitMaterial:
      "Đơn vị tính không được trùng với đơn vị chuyển đổi",
    MaxLengthMaterialCode: "Độ dài của mã nguyên vật liệu không hợp lệ",
    MaxLengthMaterialName: "Độ dài của tên nguyên vật liệu không hợp lệ",
    MaxLengthMaterialCategoryCode: "Độ dài của mã nhóm nguyên vật liệu không hợp lệ",
    MaxLengthMaterialCategoryName: "Độ dài của tên nhóm nguyên vật liệu không hợp lệ",
    MaxLengthStockCode: "Độ dài của mã kho không hợp lệ",
    MaxLengthStockName: "Độ dài của tên kho không hợp lệ",
    MaxLengthUnitName: "Độ dài của tên đơn vị không hợp lệ",
    DuplicateConversionUnit: "Đơn vị chuyển đổi không được trùng nhau",
    ConversionUnitNotEmpty: "Thông tin đơn vị chuyển đổi không được bỏ trống",
    SelectMaterialDelete: "Vui lòng chọn nguyên vật liệu muốn xóa",
    QuestionDeleteMaterial: "Bạn có chắc chắn muốn xóa nguyên vật liệu",
    QuestionDeleteMaterialCategory:
      "Bạn có chắc chắn muốn xóa nhóm nguyên vật liệu",
    QuestionDeleteStock: "Bạn có chắc chắn muốn xóa kho",
    QuestionDeleteUnit: "Bạn có chắc chắn muốn xóa đơn vị tính",
    DeleteSuccess: "Xóa thành công",
    DeleteFail: "Xóa thất bại",
    RequireChoiceMaterial:
      "Vui lòng chọn nguyên vật liệu để thực hiện chức năng",
    RequireChoiceMaterialCategory:
      "Vui lòng chọn nhóm nguyên vật liệu để thực hiện chức năng",
    RequireChoiceStock:
      "Vui lòng chọn kho để thực hiện chức năng",
    RequireChoiceUnit:
      "Vui lòng chọn đơn vị tính để thực hiện chức năng",
  },

  // Các trường của material
  FIELD_MATERIAL: {
    tableName: "material",
    materialID: "materialID",
    materialCode: "materialCode",
    materialName: "materialName",
    feature: "feature",
    unitID: "unitID",
    unitName: "unitName",
    stockID: "stockID",
    stockName: "stockName",
    categoryName: "categoryName",
    valueExp: "valueExp",
    typeExp: "typeExp",
    inventoryNumber: "inventoryNumber",
    description: "description",
    status: "status",
    createdBy: "createdBy",
    createdDate: "createdDate",
    modifiedBy: "modifiedBy",
    modifiedDate: "modifiedDate",
    convertionUnitId: "convertionUnitId"
  },
  FIELD_MATERIALCATEGORY: {
    categoryCode: "categoryCode",
    categoryName: "categoryName",
  },

  FIELD_NAME_MATERIAL: {
    tableName: "Nguyên vật liệu",
    materialID: "Id nguyên vật liệu",
    materialCode: "Mã ",
    materialName: "Tên",
    feature: "Tính chất",
    unitID: "Id đơn vị tính",
    unitName: "ĐVT",
    stockID: "Id kho ngầm định",
    stockName: "Kho ngầm định",
    categoryName: "Nhóm NVL",
    valueExp: "Giá trị hạn sử dụng",
    expiryDate: "Hạn sử dụng",
    inventoryNumber: "SL tồn tối thiểu",
    description: "Ghi chú",
    status: "Ngừng theo dõi",
    createdBy: "Người tạo",
    createdDate: "Ngày tạo",
    modifiedBy: "Người sửa",
    modifiedDate: "Ngày sửa",
    stt: "STT",
    convertionUnit: "Đơn vị chuyển đổi",
    conversionRate: "Tỷ lệ chuyển đổi",
    calculation: "Phép tính",
    describe: "Mô tả"
  },

  // Các trường của đơn vị chuyển đổi
  FIELD_CONVERSION_UNIT: {
    tableName: "conversionunit",
    conversionUnitName: "conversionUnitName",
    stt: "stt",
    conversionUnitID: "conversionUnitID",
    materialID: "materialID",
    conversionRate: "conversionRate",
    calculation: "calculation",
    conversionUnitIDOld: "conversionUnitIDOld",
    createdBy: "createdBy",
    createdDate: "createdDate",
    modifiedBy: "modifiedBy",
    modifiedDate: "modifiedDate",
  },

  // Các trường của đơn vị tính
  FIELD_UNIT: {
    unitName: "Đơn vị tính",
    description: "Diễn giải"
  },
  // Các trường của nhóm nguyên vật liệu
  FEILD_CATEGORY: {
    categoryCode: "Mã nhóm",
    categoryName: "Tên nhóm",
    description: "Diễn giải"
  },
  // Các trường của kho ngầm định
  FIELD_STOCK: {
    stockCode: "Mã kho",
    stockName: "Tên kho",
    address: "Địa chỉ"
  },

  ICON_TOAST_MESSAGE: {
    success: "success",
    warning: "warning",
    error: "error",
  },

  Nodata: "Không có dữ liệu",

  VUE_APP_TOAST: {
    ADDSUCCESS: "addSuccess",
    DELETESUCCESS: "deleteSuccess",
    EDITSUCCESS: "editSuccess",
    COPYSUCCESS: "copySuccess",
    WARNING: "warning",
    ERROR: "error",
    DELETEERROR: "deleteError",
    ADDERROR: "addError",
    EDITERROR: "editError",
    COPYERROR: "copyError",
  },

  VUE_APP_POPUP: {
    WARNING_DEL: "warning-delete",
    WARNING: "warning",
    ERROR: "error",
    QUESTION: "question",
  },
  // Excel
  Excel: {
    header: "Nhập khẩu nguyên vật liệu",
    title1: "Bước 1 : Chọn tệp nguồn",
    title2: "Bước 2: Kiểm tra dữ liệu",
    title3: "Bước 3 : Kết quả",
    step1: "1. Chọn tệp nguồn",
    step2: "2. Kiểm tra dữ liệu",
    step3: "3. Kết quả nhập khẩu",
    recordSuccess: "Số bản ghi thành công :",
    recordNotSuccess: "Số bản ghi không thành công :",
    notFileExcel:"File bạn nhập vào không đúng định dạng excel"
  }

};
export default Resource;
