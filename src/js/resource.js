const Resource = {
  TitleContent: {
    Material: "Nguyên vật liệu",
    MaterialCategory: "Nhóm nguyên vật liệu",
    Stock: "Kho",
    Unit: "Đơn vị tính",
  },
  TitleForm: {
    AddUnit: "Thêm đơn vị tính",
    UpdateUnit: "Thông tin đơn vị tính",
    DuplicateUnit: "Nhân bản đơn vị tính",
    AddStock: "Thêm kho",
    UpdateStock: "Thông tin kho",
    DuplicateStock: "Nhân bản kho",
    AddMaterialCategory: "Thêm nhóm nguyên vật liệu",
    UpdateMaterialCategory: "Thông tin nhóm nguyên vật liệu",
    DuplicateMaterialCategory: "Nhân bản nhóm nguyên vật liệu",
    AddMaterial: "Thêm nguyên vật liệu",
    UpdateMaterial: "Thông tin nguyên vật liệu",
    DuplicateMaterial: "Nhân bản nguyên vật liệu",
  },

  Table: {
    /* Tên chức năng */
    Update: "Sửa",
    Replicate: "Nhân bản",
    Delete: "Xoá",
    Stop: "Ngừng sử dụng",
    RecordPerPage: " bản ghi trên 1 trang",
    Next: "Trước",
    Previous: "Sau",
    Total: "Tổng số: ",
    Record: "bản ghi",

    ShowNotFoundDeleteSuccess: "Đã xóa hết bản ghi ở trang này !",
    ShowNotFoundNull: "Không tìm thấy bản ghi nào !",
  },

  Validate: {
    EmployeeCode: "employeeCode",
    RegexEmployeeCode: "regexEmployeeCode",
    MaxLengthEmployeeCode: "maxLengthEmployeeCode",
    MaxLengthEmployeeName: "maxLengthEmployeeName",
    FullName: "fullName",
    CbxDepartment: "cbxDepartment",
    DateOfBirth: "dateOfBirth",
    IdentityDate: "identityDate",
    Email: "email",
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

  ErrorMessage: {
    EmployeeCode: "Mã nhân viên",
    DuplicateCode: "Mã nhân viên đã tồn tại",
    EmptyCode: "Mã nhân viên không được trống",
    EmptyName: "Tên nhân viên không được trống",
    EmptyDepartmentName: "Phòng ban không được trống",
    InvalidCode: "Mã nhân viên không đúng định dạng",
    InvalidEmail: "Email không đúng định dạng",
    InternalServerError: "Có lỗi xảy ra, vui lòng liên hệ MISA để được hỗ trợ",
    ValidInput:
      "Có lỗi xảy ra khi load dữ liệu vui lòng liên hệ MISA để được hỗ trợ",
    InvalidDateOfBirth: "Ngày sinh nhập vào lớn hơn ngày hiện tại",
    InvalidIdentityDate: "Ngày cấp nhập vào lớn hơn ngày hiện tại",
    MaxLengthEmployeeCode: "Mã nhân viên có độ dài hơn 20",
    MaxLengthEmployeeName: "Tên nhân viên có độ dài hơn 100",
    GetEmployeeCodeFail: "Lấy mã mới thất bại",
  },

  ToastMessage: {
    Success: {
      Delete: "Xoá bản ghi thành công",
      Save: "Lưu bản ghi thành công",
    },
    Failed: {
      Delete: "Xoá bản ghi thất bại",
      Save: "Lưu bản ghi thất bại",
    },
  },

  Tooltip: {
    IdentityNumber: "Số Chứng Minh Nhân Dân",
    Phone: "Điện thoại di động",
    Fax: "Điện thoại cố định",
    BankBranch: "Chi nhánh tài khoản ngân hàng",
    Reload: "Tải lại dữ liệu",
    ExportExcel: "Xuất tệp Excel",
    SaveAndInsert: "Cất và thêm(Ctrl + Shift + S)",
    Save: "Cất(Ctrl + S)",
    Close: "Đóng(ESC)",
    Help: "Giúp(F1)",
  },

  KeyboardShortcuts: {
    SaveAndInsert: "Ctrl + Shift + S",
    Save: "Ctrl + S",
  },

  Gender: {
    Male: "Nam",
    Female: "Nữ",
    Other: "Khác",
  },

  // Loại form
  TYPE_FORM: {
    ADD: "add",
    UPDATE: "update",
    DUPLICATE: "duplicate",
  },

  // Kiểu form khi update
  TYPE_UPDATE: {
    ADD: 1,
    UPDATE: 2,
    DELETE: 3,
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

  ERROR_BE: {
    Unknow: "Lỗi không xác định. Vui lòng liên hệ MISA",
    DuplicateCodeMaterial: "Trùng mã nguyên vật liệu",
    DuplicateCodeMaterialCategory: "Trùng mã nhóm nguyên vật liệu ngầm định",
    DuplicateCodeUnit: "Trùng tên đơn vị tính",
    DuplicateCodeStock: "Trùng mã kho chuyển đổi",
    // DuplicateCode: "Bản ghi đã bị xóa hoặc không tồn tại",
  },

  // Danh sách lỗi validate frontend
  ERROR_VALIDATE_FE: {
    UnitNameNotEmpty: "Tên đơn vị tính không được bỏ trống",
    StockCodeNotEmpty: "Mã kho không được bỏ trống",
    StockNameNotEmpty: "Tên kho không được bỏ trống",
    CategoryCodeNotEmpty: "Mã nhóm nguyên vật liệu không được bỏ trống",
    CategoryNameNotEmpty: "Tên nhóm nguyên vật liệu không được bỏ trống",
    MaterialNameNotEmpty: "Tên nguyên vật liệu không được bỏ trống",
    MaterialCodeNotEmpty: "Mã nguyên vật liệu không được bỏ trống",
    UnitIDNotEmpty: "Đơn vị tính không được bỏ trống",
    DuplicateUnit: "Đơn vị chuyển đổi không được trùng với đơn vị chính",
    DuplicateConversionUnitMaterial:
      "Đơn vị tính không được trùng với đơn vị chuyển đổi",
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
  },

  FIELD_NAME_MATERIAL: {
    tableName: "Nguyên vật liệu",
    materialID: "Id nguyên vật liệu",
    materialCode: "Mã nguyên vật liệu",
    materialName: "Tên nguyên vật liệu",
    feature: "Tính chất",
    unitID: "Id đơn vị tính",
    unitName: "Tên đơn vị tính",
    stockID: "Id kho ngầm định",
    stockName: "Tên kho ngầm định",
    categoryName: "Nhóm nguyên vật liệu",
    valueExp: "Giá trị hạn sử dụng",
    typeExp: "Loại hạn sử dụng",
    inventoryNumber: "Số lượng tồn tối thiểu",
    description: "Ghi chú",
    status: "Ngừng theo dõi",
    createdBy: "Người tạo",
    createdDate: "Ngày tạo",
    modifiedBy: "Người sửa",
    modifiedDate: "Ngày sửa",
  },

  // Các trường của đơn vị chuyển đổi
  FIELD_CONVERSION_UNIT: {
    tableName: "conversionunit",
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
    tableName: "unit",
    conversionUnitID: "conversionUnitID",
    conversionUnitName: "conversionUnitName",
    createdBy: "createdBy",
    createdDate: "createdDate",
    modifiedBy: "modifiedBy",
    modifiedDate: "modifiedDate",
  },

  // Các trường của kho ngầm định
  FIELD_STOCK: {
    tableName: "stock",
    stockID: "stockID",
    stockCode: "stockCode",
    stockName: "stockName",
    createdBy: "createdBy",
    createdDate: "createdDate",
    modifiedBy: "modifiedBy",
    modifiedDate: "modifiedDate",
  },

  ICON_TOAST_MESSAGE: {
    success: "success",
    warning: "warning",
    error: "error",
  },

  Response: {
    Success: 1,
    Error: 0,
    BadRequest: 400,
    Exception: 500,
    ServerError: 500
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

  ERRORCODE_BE: {
    AnKnowError: "000",
    DuplicateCodeConversionUnit: "001",
    DuplicateCodeMaterial: "002",
    DuplicateCodeMaterialCategory: "003",
    DuplicateCodeStock: "004",
    DuplicateCodeUnit: "005",
    Nodifine: "008",
    NotexistOrDeleted: "009",
    UnitNameNotEmpty: "010",
    StockCodeNotEmpty: "011",
    CategoryCodeNotEmpty: "012",
    CategoryNameNotEmpty: "013",
    ConverunitNotEmpty: "014",
    MaterialCodeNotEmpty: "015",
    MaterialNameNotEmpty: "016",
    FeatureNotEmpty: "017",
    StockNameNotEmpty: "018",
  },

};
export default Resource;
