class Stock {
    /**
     * Lấy danh sách bản ghi
     * Created by : DangPD(20/3/2023)
     * @returns danh sách
     */
    getAll() {
        let UrlMain = `${process.env.VUE_APP_URL_API}Stocks`;
        return UrlMain;
    }

    /**
     * Lấy bản ghi theo id
     * Created by : DangPD(20/3/2023)
     * @param {giá trị id truyền vào} id 
     * @returns bản ghi
     */
    getById(id) {
        return `${this.getAll()}/${id}`;
    }

    /**
     * Filter danh sách theo giá trị truyền vào
     * Created by : DangPD(20/3/2023)
     * @param {*} key 
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @param {*} sort 
     * @returns danh sách 
     */
    filterAndPaging(pageSize, pageNumber, sort = '') {
        return `${this.getAll()}/Filter?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}`;
    }

    /**
     * Thêm mới bản ghi
     * Created by : DangPD(20/3/2023)
     * @returns bản ghi
     */
    insertRecord() {
        return `${this.getAll()}/`;
    }

    /**
     * Cập nhật bản ghi theo id
     * Created by : DangPD(20/3/2023)
     * @param {giá trị id truyền vào} id 
     * @returns bản ghi
     */
    updatedRecord(id) {
        return `${this.getAll()}/${id}`;
    }
    
    /**
     * Xóa bản ghi theo id
     * Created by : DangPD(20/3/2023)
     * @param {giá trị id truyền vào} id 
     * @returns bản ghi
     */
    deleteRecord(id) {
        return `${this.getAll()}/${id}`;
    }
}
const stockService = new Stock();
export default stockService;