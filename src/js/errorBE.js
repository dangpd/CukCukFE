const errorBE = {
    // Lỗi không xác định
    AnKnowError: "000",
    // Trùng đơn vị chuyển đổi
    DuplicateCodeConversionUnit: "001",
    // Trùng mã nguyên vật liệu
    DuplicateCodeMaterial: "002",
    // Trùng mã nhóm nguyên vật liệu
    DuplicateCodeMaterialCategory: "003",
    // Trùng mã kho ngầm định
    DuplicateCodeStock: "004",
    // Trùng tên đơn vị tính
    DuplicateCodeUnit: "005",
    // Lỗi không xác định
    Nodifine: "008",
    // Bản ghi đã bị xóa hoặc không tồn tại
    NotexistOrDeleted: "009",
    // Tên đơn vị không được bỏ trông
    UnitNameNotEmpty: "010",
    // Mã kho không được bỏ trống
    StockCodeNotEmpty: "011",
    // Mã nhóm nguyên vật liệu không được bỏ trống
    CategoryCodeNotEmpty: "012",
    // Tên nhóm nguyên vật liệu không được bỏ trống
    CategoryNameNotEmpty: "013",
    // Đơn vị tính không được bỏ trống
    ConverunitNotEmpty: "014",
    // Đơn vị chuyển đổi không được bỏ trống
    ConverunitNotEmptys: "006",
    // Mã nguyên liệu không được bỏ trống
    MaterialCodeNotEmpty: "015",
    // Tên nguyên vật liệu không được bỏ trống
    MaterialNameNotEmpty: "016",
    // Tính chất không được bỏ trống
    FeatureNotEmpty: "017",
    // Tên kho không được bỏ trống
    StockNameNotEmpty: "018",
    // Lấy mã mới thất bại
    GetMaxCodeFail: "019",
    // Độ dài của mã code
    MaxCodeMaterialCode: "020",
    // Độ dài của tên nguyên vật liệu
    MaxCodeMaterialName: "023",
    // Độ dài của mã nhóm nguyên vật liệu
    MaxCodeCategoryCode: "021",
    // Độ dài của kho
    MaxCodeStockCode: "022",
    // Độ dài của tên nhóm nguyên vật liệu
    MaxCodeMaterialCategoryName: "024",
    // Độ dài của tên nhóm nguyên vật liệu
    MaxCodeStockName: "025",
    // Độ dài của tên nhóm nguyên vật liệu
    MaxCodeUnitName: "026",
    // Ngoại lệ
    Exception: "500",
}

export default errorBE;