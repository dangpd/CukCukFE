const Resource = {
    TextVi: {
        TitleContent: {
            Material: "Nguyên vật liệu",
            MaterialCategory: "Nhóm nguyên vật liệu",
            Stock: "Kho",
            Unit: "Đơn vị tính"
        },
        Content: {

        },

        Table: {
            Search: "Tìm kiếm theo mã, tên và số điện thoại",
            Batch: "Thực hiện hàng loạt",
            /* Tên cột */
            EmployeeCode: "Mã nhân viên ",
            EmployeeName: "Tên nhân viên ",
            Gender: "Giới tính",
            Birthday: "Ngày sinh",
            IdentityNumber: "Số CMND",
            IdentityDate: "Ngày cấp",
            IdentityPlace: "Nơi cấp",
            Department: "Phòng ban ",
            Position: "Chức vụ",
            Address: "Địa chỉ",
            PhoneNumber: "Điện thoại di động",
            LandiPhoneNumber: "Điện thoại cố định",
            Email: "Email",
            BankNumber: "Số tài khoản",
            BankName: "Tên ngân hàng",
            BankBranch: "Chi nhánh",
            Function: "Chức năng",

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
            EmployeeCode: 'employeeCode',
            RegexEmployeeCode: 'regexEmployeeCode',
            MaxLengthEmployeeCode: 'maxLengthEmployeeCode',
            MaxLengthEmployeeName: 'maxLengthEmployeeName',
            FullName: 'fullName',
            CbxDepartment: 'cbxDepartment',
            DateOfBirth: 'dateOfBirth',
            IdentityDate: 'identityDate',
            Email: 'email',
        },

        Modal: {
            InsertModal: "Thêm mới nhân viên",
            UpdateModal: "Thông tin nhân viên",

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
            }
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
            ValidInput: "Có lỗi xảy ra khi load dữ liệu vui lòng liên hệ MISA để được hỗ trợ",
            InvalidDateOfBirth: "Ngày sinh nhập vào lớn hơn ngày hiện tại",
            InvalidIdentityDate: "Ngày cấp nhập vào lớn hơn ngày hiện tại",
            MaxLengthEmployeeCode: "Mã nhân viên có độ dài hơn 20",
            MaxLengthEmployeeName: "Tên nhân viên có độ dài hơn 100",
            GetEmployeeCodeFail: "Lấy mã mới thất bại",
        },

        ToastMessage: {
            Success: {
                Delete: "Xoá nhân viên thành công",
                Save: "Lưu nhân viên thành công",
            },
            Failed: {
                Delete: "Xoá nhân viên thất bại",
                Save: "Lưu nhân viên thất bại",
            }
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
    },
    EN: {
        errorMsg: "Error! Please contact to MiSa for help!",
        errorValidate: "Data not validate!"
    },

    // Loại form
    TYPE_FORM: {
        ADD: 'add',
        UPDATE: 'update',
        DUPLICATE: 'duplicate',
    },

    ERROR_VALIDATE_FE: {
        UnitNameNotEmpty: "Tên đợn vị tính không được bỏ trống",
        StockCodeNotEmpty: 'Mã kho không được bỏ trống',
        StockNameNotEmpty: 'Tên kho không được bỏ trống',
        MaterialNameNotEmpty: 'Tên nguyên vật liệu không được bỏ trống',
        MaterialCodeNotEmpty: 'Mã nguyên vật liệu không được bỏ trống',
        UnitIDNotEmpty: 'Đơn vị tính không được bỏ trống',
        DuplicateUnit: 'Đơn vị chuyển đổi không được trùng với đơn vị chính',
        DuplicateConversionUnitMaterial: 'Đơn vị tính không được trùng với đơn vị chuyển đổi',
        DuplicateConversionUnit: 'Đơn vị chuyển đổi không được trùng nhau',
        ConversionUnitNotEmpty: 'Thông tin đơn vị chuyển đổi không được bỏ trống',
        SelectMaterialDelete: 'Vui lòng chọn nguyên vật liệu muốn xóa',
        QuestionDeleteMaterial: 'Bạn có chắc chắn muốn xóa nguyên vật liệu',
        DeleteSuccess: 'Xóa thành công',
        DeleteFail: 'Xóa thất bại',
        RequireChoiceMaterial: 'Vui lòng chọn nguyên vật liệu để thực hiện chức năng'
    }

}
export default Resource