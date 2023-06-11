const enumMISA = {
    /**
     * Giới tính
     * CreateBy: DangPD
     */
    statusMAterial: {
        succuess: 0,
        duplicateCode: 1,
        duplicateConvertionUnit: 2,
    },
    /**
     * Loại form
     * CreateBy: DangPD
     */
    formMode: {
        add: "add",
        edit: "edit",
        copy: "copy",
    },
    /**
     * Keycode
     * CreateBy: DangPD
     */
    KEY_CODE: {
        ENTER: 13, // Phím enter
        ROW_UP: 38, // Phím lên
        ROW_DOWN: 40, // Phím xuống
        TAB: 9, // mã phím tab
        ESC: 27, // Mã phím Esc
        SPACE: 32, // Mã phím Space
        DELETE: 46, // Mã phím Delete
        BACKSPACE: 8, // Mã phím Backspace
        ARROW_LEFT: 37, // Mã phím Arrow Left
        ARROW_RIGHT: 39, // Mã phím Arrow Right

        F1: 112, // Mã phím F1
        S: 83, // Mã phím S
        N: 78, // Mã phím N
        E: 69, // Mã phím E
        R: 82, // Mã phím R
        L: 76, // Mã phím L
        A: 65, // Mã phím A
        C: 67, // Mã phím C
        D: 68, // Mã phím D

        ZERO: 48, // Mã phím 0
        ONE: 49, // Mã phím 1
        TWO: 50, // Mã phím 2
        THREE: 51, // Mã phím 3
    },
    /**
     * Trạng thái respone trả về
     * CreateBy: DangPD
     */
    status: {
        success: 1,
        badRequest: 400,
        exception: 0,
        serverError: 500,
        getSuccess: 200,
    },

    //enum
    response: {
        Success: 1,
        Error: 0,
        BadRequest: 400,
        Exception: 500,
        ServerError: 500,
        CreatedSucsess: 201,
    },

    // Trạng thái status
    statusPage: {
        Yes: 2,
        No: 1
    },
    // Bước file excel
    step: {
        One: 1,
        Two: 2,
        Three: 3
    },
    // hạn sử dụng
    expridate: {
        valueExp: 0,
        typeExp: 1,
        number: 0,
    },
    // Đơn vị đánh giá
    conversionRate: 1,
    // Đơn vị chuyern đổi
    calculation: 1,
    // null
    nullValue: 0,
    // Phép tính
    calculations: {
        multiple: 1,
        divison: 2
    }
}
export default enumMISA
